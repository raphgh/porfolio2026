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
      className="shell mt-16 pt-8 pb-4 md:mt-24 md:pt-10"
    >
      <div className="flex items-start justify-between gap-8">
        {prev ? (
          <Link
            href={prev.href}
            className="group flex max-w-[14rem] flex-col gap-1 text-left transition-colors"
          >
            <span className="text-[0.7rem] font-medium tracking-[0.06em] text-charcoal-muted uppercase">
              Previous
            </span>
            <span className="text-[1.05rem] tracking-[-0.02em] text-navy lowercase group-hover:text-mustard-deep">
              <span aria-hidden className="mr-1.5 text-charcoal-muted transition-transform group-hover:-translate-x-0.5">
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
            className="group ml-auto flex max-w-[14rem] flex-col gap-1 text-right transition-colors"
          >
            <span className="text-[0.7rem] font-medium tracking-[0.06em] text-charcoal-muted uppercase">
              Next
            </span>
            <span className="text-[1.05rem] tracking-[-0.02em] text-navy lowercase group-hover:text-mustard-deep">
              {next.label}
              <span aria-hidden className="ml-1.5 text-charcoal-muted transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
