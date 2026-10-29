"use client";

import { m, useMotionValue, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { DoodleConfig } from "./doodles";

export type DoodleHandle = { x: MotionValue<number>; y: MotionValue<number>; el: HTMLElement };

type Props = {
  doodle: DoodleConfig;
  index: number;
  zIndex: number;
  onLift: (id: string) => void;
  register: (id: string, handle: DoodleHandle | null) => void;
};

export function Doodle({ doodle, index, zIndex, onLift, register }: Props) {
  const { id, label, Art, tilt, float, desktop, mobile } = doodle;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (ref.current) register(id, { x, y, el: ref.current });
    return () => register(id, null);
  }, [id, register, x, y]);

  const placement = {
    "--dt": desktop.top,
    "--dl": desktop.left,
    "--ds": desktop.size,
    "--mt": mobile?.top ?? desktop.top,
    "--ml": mobile?.left ?? desktop.left,
    "--ms": mobile?.size ?? desktop.size,
    "--doodle-fill": index % 2 ? "var(--color-berry-soft)" : "var(--color-powder)",
  } as React.CSSProperties;

  return (
    <m.div
      ref={ref}
      drag
      dragTransition={{ power: 0.15, timeConstant: 220 }}
      onDragStart={() => {
        setDragging(true);
        onLift(id);
      }}
      onDragEnd={() => setDragging(false)}
      initial={false}
      animate={{ rotate: tilt, scale: 1 }}
      whileHover={{ scale: 1.05, rotate: tilt + 4 }}
      whileTap={{ scale: 0.97 }}
      whileDrag={{ scale: 1.1, rotate: tilt - 6 }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
      style={{ x, y, zIndex: dragging ? 60 : zIndex, ...placement }}
      className={`group pointer-events-auto absolute top-(--mt) left-(--ml) w-(--ms) cursor-grab touch-none select-none active:cursor-grabbing lg:top-(--dt) lg:left-(--dl) lg:w-(--ds) ${
        mobile ? "" : "max-lg:hidden"
      }`}
    >
      <div
        className="animate-float will-change-transform"
        style={
          {
            animationDuration: `${float}s`,
            animationDelay: `${-index * 1.7}s`,
            animationPlayState: dragging ? "paused" : "running",
            "--float-tilt": `${index % 2 ? -1.5 : 1.5}deg`,
          } as React.CSSProperties
        }
      >
        <Art className="block h-auto w-full" />
      </div>
      <span className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 font-hand text-xl leading-none text-berry opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {label}
      </span>
    </m.div>
  );
}
