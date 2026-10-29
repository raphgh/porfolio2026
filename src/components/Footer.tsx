import Link from "next/link";
import { nav, site } from "@/data/site";

const commit = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7);

export function Footer() {
  const year = new Date().getFullYear();
  const social = [
    { label: "Email", href: site.contact.email && `mailto:${site.contact.email}` },
    { label: "GitHub", href: site.contact.github },
    { label: "LinkedIn", href: site.contact.linkedin },
  ].filter((s) => s.href);

  return (
    <footer className="relative z-10 border-t border-silver-soft bg-white">
      <div className="shell flex flex-col gap-12 pt-12 pb-8 md:gap-14 md:pt-16">
        <div className="grid grid-cols-12 gap-x-4 gap-y-10 md:gap-x-8">
          <div className="col-span-12 flex flex-col gap-3 md:col-span-6">
            <p className="display text-2xl text-navy lowercase">{site.name.toLowerCase()}</p>
            <p className="max-w-sm text-charcoal-soft">
              Software engineer building things at the intersection of technology, design &amp; culture.
            </p>
          </div>

          <nav aria-label="Footer" className="col-span-6 md:col-span-3">
            <h2 className="label mb-4 text-charcoal-muted">Index</h2>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/" className="text-navy hover:text-mustard-deep">
                  Home
                </Link>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-navy hover:text-mustard-deep">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={site.resume} target="_blank" rel="noopener" className="text-navy hover:text-mustard-deep">
                  Resume <span className="sr-only">(PDF, opens in a new tab)</span>
                  <span aria-hidden> ↗</span>
                </a>
              </li>
            </ul>
          </nav>

          <div className="col-span-6 md:col-span-3">
            <h2 className="label mb-4 text-charcoal-muted">Contact</h2>
            {social.length ? (
              <ul className="flex flex-col gap-2">
                {social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      {...(s.label !== "Email" && { target: "_blank", rel: "noopener noreferrer" })}
                      className="text-navy hover:text-mustard-deep"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-charcoal-muted">Links coming soon</p>
            )}
          </div>
        </div>

        <div className="label flex flex-col gap-3 border-t border-silver-soft pt-5 text-charcoal-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <p>
            Next.js · TypeScript · Tailwind · Motion — on Vercel
            {commit && (
              <span className="ml-2 rounded-full border border-silver px-2 py-0.5 font-mono text-[0.65rem] text-navy">
                {commit}
              </span>
            )}
          </p>
          <a href="#main" className="hover:text-navy">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
