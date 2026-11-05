"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { stackNav } from "@/data/site";

function sectionIndex(pathname: string) {
  // Match deepest section first (e.g. /work/slug → Projects)
  const i = stackNav.findIndex(
    (item) => item.href !== "/" && (pathname === item.href || pathname.startsWith(`${item.href}/`)),
  );
  if (i >= 0) return i;
  if (pathname === "/") return 0;
  return -1;
}

/**
 * Bottom-of-page previous / next links between main sections
 * (Home → Projects → Experience → Lab → About).
 */
export function SectionPager() {
  const pathname = usePathname();
  const index = sectionIndex(pathname);

  if (index < 0 || pathname === "/") return null;

  const prev = index > 0 ? stackNav[index - 1] : null;
  const next = index < stackNav.length - 1 ? stackNav[index + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Section"
      className="shell mt-16 border-t border-silver-soft pt-8 pb-4 md:mt-24 md:pt-10"
    >
      <div className="flex flex-wrap items-stretch justify-between gap-4">
        {prev ? (
          <Link
            href={prev.href}
            className="group flex min-w-[12rem] flex-1 flex-col gap-1 rounded-[1.25rem] border border-navy/25 bg-white px-5 py-4 transition-colors hover:border-navy hover:bg-navy-tint/50 sm:max-w-xs"
          >
            <span className="label text-charcoal-muted">Previous</span>
            <span className="display text-heading text-navy lowercase">
              <span aria-hidden className="mr-2 text-mustard-deep transition-transform group-hover:-translate-x-0.5">
                ←
              </span>
              {prev.label}
            </span>
          </Link>
        ) : (
          <span />
        )}

        {next ? (
          <Link
            href={next.href}
            className="group flex min-w-[12rem] flex-1 flex-col gap-1 rounded-[1.25rem] border border-navy/25 bg-white px-5 py-4 text-right transition-colors hover:border-navy hover:bg-navy-tint/50 sm:ml-auto sm:max-w-xs"
          >
            <span className="label text-charcoal-muted">Next</span>
            <span className="display text-heading text-navy lowercase">
              {next.label}
              <span aria-hidden className="ml-2 text-mustard-deep transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
