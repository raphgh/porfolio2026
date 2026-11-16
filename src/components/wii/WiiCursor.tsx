"use client";

import { useEffect, useState } from "react";
import { m, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * Wii Mode cursor — pixel pointing hand by default, fist while pressing.
 * Uses the provided pixel assets (not Nintendo branded).
 */
export function WiiCursor({
  interactive: _interactive = false,
  grabbing = false,
}: {
  interactive?: boolean;
  grabbing?: boolean;
}) {
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressing, setPressing] = useState(false);
  const [idleJitter, setIdleJitter] = useState({ x: 0, y: 0 });
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { stiffness: 900, damping: 40, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 900, damping: 40, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!fine) return;
    let lastMove = Date.now();
    let jitterId = 0;

    const onMove = (e: PointerEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);
      lastMove = Date.now();
      setIdleJitter({ x: 0, y: 0 });
    };
    const onDown = (e: PointerEvent) => {
      if (e.button === 0) setPressing(true);
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);
      lastMove = Date.now();
    };
    const onUp = () => setPressing(false);
    const onLeave = () => {
      setVisible(false);
      setPressing(false);
    };

    if (!reduce) {
      jitterId = window.setInterval(() => {
        if (Date.now() - lastMove < 2000) return;
        setIdleJitter({
          x: (Math.random() - 0.5) * 1,
          y: (Math.random() - 0.5) * 1,
        });
      }, 180);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.clearInterval(jitterId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [fine, rawX, rawY, reduce]);

  if (!fine) return null;

  const fist = pressing || grabbing;
  const src = fist ? "/wii/cursor-fist.png" : "/wii/cursor-pointer.png";

  return (
    <m.div
      aria-hidden
      className={`wii-cursor${fist ? " wii-cursor--fist" : ""}`}
      style={{
        x,
        y,
        opacity: visible ? 1 : 0,
      }}
    >
      <m.div
        style={{ x: idleJitter.x, y: idleJitter.y }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={src} src={src} alt="" draggable={false} />
      </m.div>
    </m.div>
  );
}
