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
    <footer className="bg-night text-paper">
      <div className="shell flex flex-col gap-16 pt-16 pb-8 md:pt-20">
        <div className="grid grid-cols-12 gap-x-8 gap-y-10">
          <div className="col-span-12 flex flex-col gap-3 md:col-span-6">
            <p className="text-heading font-medium">{site.name}</p>
            <p className="max-w-sm text-night-soft">
              Software engineer building things at the intersection of technology, design &amp; culture.
            </p>
          </div>

          <nav aria-label="Footer" className="col-span-6 md:col-span-3">
            <h2 className="label mb-4 text-night-soft">Index</h2>
            <ul className="flex flex-col gap-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={site.resume} target="_blank" rel="noopener" className="hover:text-accent">
                  Resume <span className="sr-only">(PDF, opens in a new tab)</span>
                  <span aria-hidden>↗</span>
                </a>
              </li>
            </ul>
          </nav>

          <div className="col-span-6 md:col-span-3">
            <h2 className="label mb-4 text-night-soft">Contact</h2>
            {social.length ? (
              <ul className="flex flex-col gap-2">
                {social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      {...(s.label !== "Email" && { target: "_blank", rel: "noopener noreferrer" })}
                      className="hover:text-accent"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <Link href="/#contact" className="hover:text-accent">
                Get in touch
              </Link>
            )}
          </div>
        </div>

        <div className="label flex flex-col gap-3 border-t border-paper/20 pt-5 text-night-soft md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <p>
            Next.js · TypeScript · Tailwind · Motion — on Vercel
            {commit && <span className="text-paper/70"> · build {commit}</span>}
          </p>
          <a href="#main" className="hover:text-paper">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
