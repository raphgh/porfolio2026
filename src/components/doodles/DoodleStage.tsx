"use client";

import { animate, useReducedMotion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { Doodle, type DoodleHandle } from "./Doodle";
import { doodles } from "./doodles";

export function DoodleStage({ className = "" }: { className?: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const handles = useRef(new Map<string, DoodleHandle>());
  const [order, setOrder] = useState(() => doodles.map((d) => d.id));
  const [touched, setTouched] = useState(false);
  const [moved, setMoved] = useState(false);
  const reduceMotion = useReducedMotion();

  const register = useCallback((id: string, handle: DoodleHandle | null) => {
    if (handle) handles.current.set(id, handle);
    else handles.current.delete(id);
  }, []);

  const lift = useCallback((id: string) => {
    setTouched(true);
    setMoved(true);
    setOrder((o) => [...o.filter((d) => d !== id), id]);
  }, []);

  const move = (target: (h: DoodleHandle, stage: DOMRect) => { x: number; y: number }) => {
    const stage = stageRef.current?.getBoundingClientRect();
    if (!stage) return;
    handles.current.forEach((h) => {
      if (!h.el.offsetParent) return;
      const { x, y } = target(h, stage);
      const transition = reduceMotion
        ? { duration: 0 }
        : { type: "spring" as const, stiffness: 140, damping: 18 };
      animate(h.x, x, transition);
      animate(h.y, y, transition);
    });
  };

  const shuffle = () => {
    setMoved(true);
    move((h, stage) => {
      const rand = (min: number, max: number) => min + Math.random() * Math.max(0, max - min);
      const { offsetLeft: l, offsetTop: t, offsetWidth: w, offsetHeight: hgt } = h.el;
      return { x: rand(-l, stage.width - l - w), y: rand(-t, stage.height - t - hgt) };
    });
  };

  const reset = () => {
    setMoved(false);
    move(() => ({ x: 0, y: 0 }));
  };

  return (
    <div className={`pointer-events-none ${className}`}>
      <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
        <defs>
          <filter id="sketch" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.4" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <div ref={stageRef} aria-hidden className="absolute inset-0">
        {doodles.map((d, i) => (
          <Doodle
            key={d.id}
            doodle={d}
            index={i}
            zIndex={order.indexOf(d.id) + 1}
            onLift={lift}
            register={register}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 max-lg:hidden">
        <p
          aria-hidden
          className={`-rotate-2 font-hand text-[1.45rem] leading-none text-berry transition-opacity duration-500 ${
            touched ? "opacity-0" : "opacity-100"
          }`}
        >
          go on, drag them anywhere ↗
        </p>
        <div className="pointer-events-auto flex gap-1">
          <StageButton onClick={shuffle}>Shuffle</StageButton>
          {moved && <StageButton onClick={reset}>Reset</StageButton>}
        </div>
      </div>
    </div>
  );
}

function StageButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${children} sketchbook objects`}
      className="rounded-full border border-rule-strong bg-card px-3 py-1 text-sm transition-colors hover:border-ink"
    >
      {children}
    </button>
  );
}
