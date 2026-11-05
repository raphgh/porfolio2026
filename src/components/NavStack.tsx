"use client";

import Link from "next/link";
import { useState } from "react";
import { stackNav } from "@/data/site";

/** Thin lip so the stack reads as one pile. */
const STACK_OFFSET = 12;

/**
 * Soft washes from the embroidery trail palette
 * (mustard, coral, peach, rose, terracotta).
 */
const CARD_COLORS = [
  { bg: "#f5e6b8", border: "#e6b422", number: "#a87b0a" }, // Home — mustard
  { bg: "#fde0d2", border: "#f07a45", number: "#c45a28" }, // Projects — coral
  { bg: "#fce8d8", border: "#f0a06a", number: "#c47a3a" }, // Experience — peach
  { bg: "#f9d6e4", border: "#e85a8a", number: "#b03860" }, // Lab — rose
  { bg: "#f5d0d4", border: "#d94f5c", number: "#a83842" }, // About — terracotta
] as const;

/** Front → back indices. Hovered card is pulled to the front; others keep relative order. */
function orderFromFront(active: number | null) {
  const ids = stackNav.map((_, i) => i);
  if (active === null) return ids;
  return [active, ...ids.filter((i) => i !== active)];
}

/**
 * Centered section links + physical card stack.
 * Hovering a menu item pulls that card to the front of the pile.
 * Cards are also links to their pages.
 */
export function NavStack() {
  const [active, setActive] = useState<number | null>(null);
  const depth = stackNav.length;
  const frontToBack = orderFromFront(active);

  return (
    <section aria-labelledby="stack-nav-title" className="shell pb-20 md:pb-28">
      <h2 id="stack-nav-title" className="sr-only">
        Navigate
      </h2>

      <div className="mx-auto max-w-3xl" onMouseLeave={() => setActive(null)}>
        <ul className="mb-8 flex flex-wrap items-baseline justify-center gap-x-7 gap-y-2 md:mb-10 md:gap-x-9">
          {stackNav.map((item, i) => {
            const on = active === i;
            const color = CARD_COLORS[i];
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={item.href === "/" ? "page" : undefined}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive((cur) => (cur === i ? null : cur))}
                  className={`label transition-colors duration-200 ${
                    on ? "text-navy" : "text-charcoal-muted"
                  }`}
                >
                  <span className="mr-1.5 font-mono text-[0.65rem]" style={{ color: color.number }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div
          className="relative mx-auto hidden md:block"
          style={{ height: `calc(14rem + ${(depth - 1) * STACK_OFFSET}px)` }}
        >
          <ul className="relative h-full">
            {stackNav.map((item, i) => {
              const slot = frontToBack.indexOf(i);
              const isFront = slot === 0;
              const pulled = active === i;
              const color = CARD_COLORS[i];

              return (
                <li
                  key={item.href}
                  className="absolute inset-x-0 transition-[top,transform,box-shadow] duration-500 ease-(--ease-card)"
                  style={{
                    top: slot * STACK_OFFSET,
                    zIndex: depth - slot,
                    transform: pulled
                      ? "translateY(-14px) rotate(-1.25deg)"
                      : isFront
                        ? "translateY(-2px) rotate(0deg)"
                        : "translateY(0) rotate(0deg)",
                  }}
                >
                  <Link
                    href={item.href}
                    aria-current={item.href === "/" ? "page" : undefined}
                    aria-label={`Go to ${item.label}`}
                    className="flex h-56 items-start justify-between rounded-[1.5rem] border-[1.5px] px-8 pt-6 pb-7 transition-shadow duration-500 lg:px-10"
                    style={{
                      backgroundColor: color.bg,
                      borderColor: color.border,
                      boxShadow: isFront
                        ? "0 12px 28px -18px rgb(26 26 26 / 0.35)"
                        : "0 6px 16px -14px rgb(26 26 26 / 0.2)",
                    }}
                  >
                    <span className="display text-[clamp(2rem,1.4rem+1.8vw,3.25rem)] leading-none text-navy lowercase">
                      {item.label}
                    </span>
                    <span className="label" style={{ color: color.number }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <ul className="flex flex-col gap-3 md:hidden">
        {stackNav.map((item, i) => {
          const color = CARD_COLORS[i];
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={item.href === "/" ? "page" : undefined}
                className="flex min-h-16 items-center justify-between rounded-2xl border-[1.5px] px-5 py-4 transition-opacity hover:opacity-90"
                style={{ backgroundColor: color.bg, borderColor: color.border }}
              >
                <span className="display text-2xl leading-none text-navy lowercase">{item.label}</span>
                <span className="label" style={{ color: color.number }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
