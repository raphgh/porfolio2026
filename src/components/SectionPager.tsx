"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { stackNav, stackNavColors } from "@/data/site";

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
 * Each button uses the same wash as that section’s home stack card.
 */
export function SectionPager() {
  const pathname = usePathname();
  const index = sectionIndex(pathname);

  if (index < 0 || pathname === "/") return null;

  const prevIndex = index > 0 ? index - 1 : null;
  const nextIndex = index < stackNav.length - 1 ? index + 1 : null;
  const prev = prevIndex !== null ? stackNav[prevIndex] : null;
  const next = nextIndex !== null ? stackNav[nextIndex] : null;

  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Section"
      className="shell mt-16 border-t border-silver-soft pt-8 pb-4 md:mt-24 md:pt-10"
    >
      <div className="flex flex-wrap items-stretch justify-between gap-4">
        {prev && prevIndex !== null ? (
          <Link
            href={prev.href}
            className="group flex min-w-[12rem] flex-1 flex-col gap-1 rounded-[1.25rem] border-[1.5px] px-5 py-4 transition-opacity hover:opacity-90 sm:max-w-xs"
            style={{
              backgroundColor: stackNavColors[prevIndex].bg,
              borderColor: stackNavColors[prevIndex].border,
            }}
          >
            <span className="label" style={{ color: stackNavColors[prevIndex].number }}>
              Previous
            </span>
            <span className="display text-heading text-navy lowercase">
              <span
                aria-hidden
                className="mr-2 transition-transform group-hover:-translate-x-0.5"
                style={{ color: stackNavColors[prevIndex].number }}
              >
                ←
              </span>
              {prev.label}
            </span>
          </Link>
        ) : (
          <span />
        )}

        {next && nextIndex !== null ? (
          <Link
            href={next.href}
            className="group flex min-w-[12rem] flex-1 flex-col gap-1 rounded-[1.25rem] border-[1.5px] px-5 py-4 text-right transition-opacity hover:opacity-90 sm:ml-auto sm:max-w-xs"
            style={{
              backgroundColor: stackNavColors[nextIndex].bg,
              borderColor: stackNavColors[nextIndex].border,
            }}
          >
            <span className="label" style={{ color: stackNavColors[nextIndex].number }}>
              Next
            </span>
            <span className="display text-heading text-navy lowercase">
              {next.label}
              <span
                aria-hidden
                className="ml-2 transition-transform group-hover:translate-x-0.5"
                style={{ color: stackNavColors[nextIndex].number }}
              >
                →
              </span>
            </span>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
