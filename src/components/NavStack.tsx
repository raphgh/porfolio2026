"use client";

import Link from "next/link";
import { useState } from "react";
import { stackNav } from "@/data/site";

/** Thin lip so the stack reads as one pile. */
const STACK_OFFSET = 12;

/** Front → back indices. Hovered card is pulled to the front; others keep relative order. */
function orderFromFront(active: number | null) {
  const ids = stackNav.map((_, i) => i);
  if (active === null) return ids;
  return [active, ...ids.filter((i) => i !== active)];
}

/**
 * Centered section links + physical card stack.
 * Hovering a menu item pulls that card to the front of the pile
 * (like placing it on top by hand) — not a Y-axis flip.
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
                  <span className="mr-1.5 font-mono text-[0.65rem] text-mustard-deep">
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
          aria-hidden
        >
          <ul className="relative h-full">
            {stackNav.map((item, i) => {
              const isHome = item.href === "/";
              const slot = frontToBack.indexOf(i); // 0 = front of pile
              const isFront = slot === 0;
              const pulled = active === i;

              return (
                <li
                  key={item.href}
                  className="pointer-events-none absolute inset-x-0 transition-[top,transform,box-shadow] duration-500 ease-(--ease-card)"
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
                  <div
                    className={`flex h-56 items-start justify-between rounded-[1.5rem] border bg-white px-8 pt-6 pb-7 transition-[border-color,background-color,box-shadow] duration-500 lg:px-10 ${
                      isFront || isHome
                        ? "border-[1.5px] border-navy bg-navy-tint shadow-[0_12px_28px_-18px_rgb(30_58_110/0.45)]"
                        : "border-silver shadow-[0_6px_16px_-14px_rgb(26_26_26/0.25)]"
                    }`}
                  >
                    <span className="display text-[clamp(2rem,1.4rem+1.8vw,3.25rem)] leading-none text-navy lowercase">
                      {item.label}
                    </span>
                    <span className={`label ${isFront || isHome ? "text-mustard-deep" : "text-charcoal-muted"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <ul className="flex flex-col gap-3 md:hidden">
        {stackNav.map((item, i) => {
          const isHome = item.href === "/";
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isHome ? "page" : undefined}
                className={`flex min-h-16 items-center justify-between rounded-2xl border px-5 py-4 transition-colors ${
                  isHome ? "border-navy bg-navy-tint" : "border-silver bg-white hover:border-navy"
                }`}
              >
                <span className="display text-2xl leading-none text-navy lowercase">{item.label}</span>
                <span className="label text-charcoal-muted">{String(i + 1).padStart(2, "0")}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
