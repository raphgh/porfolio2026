import Link from "next/link";
import { site } from "@/data/site";
import { ResumeLink } from "./ResumeLink";
import { SiteMenu } from "./SiteMenu";

/**
 * Minimal header: mark + resume (server-rendered) + optional overflow menu.
 * Keeping the mark on the server avoids stale client-bundle hydration mismatches
 * after large redesign HMR sessions.
 */
export function Navbar() {
  return (
    <header className="sticky top-0 z-40">
      <div className="border-b border-transparent bg-white/85 transition-[border-color,box-shadow] duration-300 hover:border-silver-soft hover:shadow-[0_8px_24px_-20px_rgb(30_58_110/0.35)] supports-[backdrop-filter]:bg-white/75 supports-[backdrop-filter]:backdrop-blur-md">
        <nav aria-label="Primary" className="shell flex h-14 items-center justify-between gap-4 md:h-16">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label={`${site.name} — home`}
          >
            <span
              aria-hidden
              className="grid size-8 place-items-center rounded-full border border-navy bg-navy-tint font-mono text-[0.75rem] lowercase text-navy transition-transform duration-300 ease-(--ease-out-soft) group-hover:-rotate-6 group-hover:bg-mustard-soft"
            >
              {site.shortName}
            </span>
            <span className="display text-[1.15rem] leading-none text-navy max-[380px]:sr-only">
              {site.name.toLowerCase()}
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <ResumeLink plain />
            <SiteMenu />
          </div>
        </nav>
      </div>
    </header>
  );
}
