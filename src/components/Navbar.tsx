"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/data/site";
import { ResumeLink } from "./ResumeLink";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Close the menu when the route changes.
  if (open && openedAt !== pathname) setOpen(false);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const toggle = toggleRef.current;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/95 supports-[backdrop-filter]:bg-paper/85 supports-[backdrop-filter]:backdrop-blur-md">
      <nav aria-label="Primary" className="shell flex h-16 items-center justify-between gap-6">
        <Link href="/" className="group flex items-baseline gap-3" aria-label={`${site.name} — home`}>
          <span className="text-[1.05rem] font-semibold tracking-tight">{site.name}</span>
          <span className="label hidden text-ink-soft sm:inline">
            <span aria-hidden className="mr-2 inline-block size-1.5 translate-y-[-1px] rounded-full bg-accent" />
            {site.title}
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-1">
            {nav.map((item, i) => (
              <li key={item.href} className="flex items-center">
                {i > 0 && (
                  <span aria-hidden className="label px-1.5 text-ink-muted">
                    ·
                  </span>
                )}
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="label relative px-1.5 py-2 text-ink-soft transition-colors hover:text-ink aria-[current=page]:text-ink"
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-1.5 -bottom-px h-px origin-left bg-accent transition-transform duration-300 ${
                      isActive(item.href) ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>
          <ResumeLink />
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <ResumeLink compact />
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => {
              setOpenedAt(pathname);
              setOpen((v) => !v);
            }}
            className="label flex h-10 items-center gap-2 px-2 text-ink"
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span aria-hidden className="relative block h-2.5 w-4">
              <span
                className={`absolute left-0 h-px w-full bg-current transition-transform duration-300 ${
                  open ? "top-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-current transition-transform duration-300 ${
                  open ? "top-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-paper lg:hidden"
      >
        <ul className="shell flex flex-col pt-6 pb-10">
          {nav.map((item, i) => (
            <li key={item.href} className="border-b border-rule">
              <Link
                ref={i === 0 ? firstLinkRef : undefined}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between py-5 text-[2rem] leading-none font-medium tracking-tight aria-[current=page]:text-accent-ink"
              >
                {item.label}
                <span className="label text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
