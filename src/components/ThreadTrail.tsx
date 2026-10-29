"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Light embroidery cursor trail — airy, smooth, fades as it ages (no linger).
 * Warm palette only (no blue). Off for reduced motion.
 */
const MAX_POINTS = 28;
const FADE_MS = 480;
const MIN_DIST = 10;
/** Warm embroidery tones — mustard, coral, rose, terracotta, peach */
const THREAD_A = ["#e6b422", "#f07a45", "#e85a8a", "#d94f5c", "#f0a06a"];
const THREAD_B = ["#f5c84a", "#ff8f5a", "#e070a8", "#e6b422", "#d94f5c"];

type Point = { x: number; y: number; t: number };

/** Catmull-Rom → cubic bezier for a smoother ribbon */
function smoothPath(points: Point[]) {
  if (points.length < 2) return "";
  if (points.length === 2) {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
  }
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2.x} ${p2.y}`;
  }
  return d;
}

function offsetPoints(points: Point[], amount: number): Point[] {
  if (points.length < 2) return points;
  return points.map((p, i) => {
    const prev = points[Math.max(0, i - 1)];
    const next = points[Math.min(points.length - 1, i + 1)];
    const dx = next.x - prev.x;
    const dy = next.y - prev.y;
    const len = Math.hypot(dx, dy) || 1;
    return {
      x: p.x + (-dy / len) * amount,
      y: p.y + (dx / len) * amount,
      t: p.t,
    };
  });
}

function runningStitchPath(points: Point[], dash = 5, gap = 9) {
  if (points.length < 2) return "";
  const samples: { x: number; y: number }[] = [{ x: points[0].x, y: points[0].y }];
  const step = 3;
  for (let i = 1; i < points.length; i++) {
    let x0 = points[i - 1].x;
    let y0 = points[i - 1].y;
    const x1 = points[i].x;
    const y1 = points[i].y;
    let rem = Math.hypot(x1 - x0, y1 - y0);
    if (rem < 0.01) continue;
    const ux = (x1 - x0) / rem;
    const uy = (y1 - y0) / rem;
    while (rem >= step) {
      x0 += ux * step;
      y0 += uy * step;
      rem -= step;
      samples.push({ x: x0, y: y0 });
    }
  }
  let d = "";
  const period = dash + gap;
  let dist = 0;
  for (let i = 1; i < samples.length; i++) {
    const a = samples[i - 1];
    const b = samples[i];
    if (dist % period < dash) d += `M ${a.x} ${a.y} L ${b.x} ${b.y} `;
    dist += Math.hypot(b.x - a.x, b.y - a.y);
  }
  return d;
}

function crossStitches(points: Point[], every = 9, size = 4) {
  const parts: string[] = [];
  for (let i = every; i < points.length - 1; i += every) {
    const p = points[i];
    const prev = points[i - 1];
    const next = points[i + 1];
    const dx = next.x - prev.x;
    const dy = next.y - prev.y;
    const len = Math.hypot(dx, dy) || 1;
    const nx = (-dy / len) * size;
    const ny = (dx / len) * size;
    const tx = (dx / len) * size * 0.5;
    const ty = (dy / len) * size * 0.5;
    parts.push(
      `M ${p.x - tx + nx * 0.12} ${p.y - ty + ny * 0.12} L ${p.x + tx - nx * 0.12} ${p.y + ty - ny * 0.12}`,
      `M ${p.x - tx - nx * 0.12} ${p.y - ty - ny * 0.12} L ${p.x + tx + nx * 0.12} ${p.y + ty + ny * 0.12}`,
    );
  }
  return parts.join(" ");
}

/** Trail opacity fades from the oldest point's age — no full-opacity linger. */
function trailOpacity(pts: Point[], now: number) {
  if (pts.length < 2) return 0;
  const oldest = now - pts[0].t;
  const newest = now - pts[pts.length - 1].t;
  const midAge = (oldest + newest) / 2;
  return Math.max(0, (1 - midAge / FADE_MS) * 0.72);
}

export function ThreadTrail() {
  const [mounted, setMounted] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const shadowRef = useRef<SVGPathElement>(null);
  const strandARef = useRef<SVGPathElement>(null);
  const strandBRef = useRef<SVGPathElement>(null);
  const stitchRef = useRef<SVGPathElement>(null);
  const crossRef = useRef<SVGPathElement>(null);
  const knotsRef = useRef<SVGGElement>(null);
  const points = useRef<Point[]>([]);
  const frame = useRef(0);
  const enabled = useRef(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const clearPaths = () => {
      shadowRef.current?.setAttribute("d", "");
      strandARef.current?.setAttribute("d", "");
      strandBRef.current?.setAttribute("d", "");
      stitchRef.current?.setAttribute("d", "");
      crossRef.current?.setAttribute("d", "");
      knotsRef.current?.replaceChildren();
      if (svgRef.current) svgRef.current.style.opacity = "0";
    };

    const sync = () => {
      enabled.current = !reduce.matches;
      if (!enabled.current) {
        points.current = [];
        clearPaths();
      }
    };
    sync();
    reduce.addEventListener("change", sync);

    const onMove = (e: MouseEvent) => {
      if (!enabled.current) return;
      const now = performance.now();
      const last = points.current[points.current.length - 1];
      if (last && Math.hypot(e.clientX - last.x, e.clientY - last.y) < MIN_DIST) return;
      points.current.push({ x: e.clientX, y: e.clientY, t: now });
      if (points.current.length > MAX_POINTS) points.current.shift();
    };

    const onLeave = () => {
      points.current = [];
    };

    const tick = () => {
      const now = performance.now();
      points.current = points.current.filter((p) => now - p.t < FADE_MS);
      const pts = points.current;

      if (pts.length >= 2) {
        shadowRef.current?.setAttribute("d", smoothPath(offsetPoints(pts, 1.8)));
        strandARef.current?.setAttribute("d", smoothPath(offsetPoints(pts, 0.9)));
        strandBRef.current?.setAttribute("d", smoothPath(offsetPoints(pts, -0.9)));
        stitchRef.current?.setAttribute("d", runningStitchPath(pts, 4.5, 10));
        crossRef.current?.setAttribute("d", crossStitches(pts, 10, 3.8));

        if (knotsRef.current) {
          knotsRef.current.replaceChildren();
          for (let i = 5; i < pts.length; i += 10) {
            const p = pts[i];
            const age = (now - p.t) / FADE_MS;
            const knot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            knot.setAttribute("cx", String(p.x));
            knot.setAttribute("cy", String(p.y));
            knot.setAttribute("r", String(2.1 * (1 - age * 0.4)));
            knot.setAttribute("fill", THREAD_A[i % THREAD_A.length]);
            knot.setAttribute("opacity", String(0.85 * (1 - age)));
            knotsRef.current.append(knot);
          }
        }

        if (svgRef.current) {
          svgRef.current.style.opacity = String(trailOpacity(pts, now));
        }
      } else {
        clearPaths();
      }

      frame.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    frame.current = requestAnimationFrame(tick);

    return () => {
      reduce.removeEventListener("change", sync);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(frame.current);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <svg
      ref={svgRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60]"
      style={{ width: "100vw", height: "100dvh", opacity: 0 }}
    >
      <defs>
        <linearGradient id="thread-a" x1="0%" y1="0%" x2="100%" y2="0%">
          {THREAD_A.map((c, i) => (
            <stop key={`a-${c}`} offset={`${(i / (THREAD_A.length - 1)) * 100}%`} stopColor={c} />
          ))}
        </linearGradient>
        <linearGradient id="thread-b" x1="0%" y1="0%" x2="100%" y2="0%">
          {THREAD_B.map((c, i) => (
            <stop key={`b-${c}`} offset={`${(i / (THREAD_B.length - 1)) * 100}%`} stopColor={c} />
          ))}
        </linearGradient>
      </defs>
      <path ref={shadowRef} fill="none" stroke="rgb(217 79 92 / 0.12)" strokeWidth="3.2" strokeLinecap="round" />
      <path ref={strandARef} fill="none" stroke="url(#thread-a)" strokeWidth="1.85" strokeLinecap="round" opacity="0.92" />
      <path
        ref={strandBRef}
        fill="none"
        stroke="url(#thread-b)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="8 7"
        opacity="0.8"
      />
      <path ref={stitchRef} fill="none" stroke="#c9920e" strokeWidth="1.15" strokeLinecap="butt" opacity="0.55" />
      <path ref={crossRef} fill="none" stroke="#f07a45" strokeWidth="1.25" strokeLinecap="round" opacity="0.8" />
      <g ref={knotsRef} />
    </svg>
  );
}
