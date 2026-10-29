import { site } from "@/data/site";
import { CopyEmail } from "./CopyEmail";
import { ResumeLink } from "./ResumeLink";

const contactRows = [
  { label: "Email", value: site.contact.email, href: site.contact.email && `mailto:${site.contact.email}` },
  { label: "GitHub", value: site.contact.github, href: site.contact.github },
  { label: "LinkedIn", value: site.contact.linkedin, href: site.contact.linkedin },
];

const display = (url: string) => url.replace(/^(https?:\/\/)?(www\.)?/, "").replace(/\/$/, "");

export function ContactLinks() {
  return (
    <ul className="flex flex-col gap-3">
      {contactRows.map((row) => (
        <li
          key={row.label}
          className="flex flex-col gap-1 rounded-2xl border border-navy/30 bg-white px-4 py-3"
        >
          <span className="label text-mustard-deep">{row.label}</span>
          {row.href ? (
            <a
              href={row.href}
              {...(row.label !== "Email" && { target: "_blank", rel: "noopener noreferrer" })}
              className="display group flex items-baseline justify-between gap-4 text-heading break-all text-navy hover:text-mustard-deep"
            >
              {row.label === "Email" ? row.value : display(row.value)}
              <span aria-hidden className="text-[0.55em] transition-transform duration-300 group-hover:translate-x-1">
                {row.label === "Email" ? "→" : "↗"}
              </span>
            </a>
          ) : (
            <span className="label text-charcoal-muted">[{row.label.toLowerCase()} goes here]</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function Contact({ index }: { index?: string }) {
  return (
    <section id="contact" aria-labelledby="contact-title" className="shell py-16 md:py-24">
      <div className="rounded-[1.75rem] border border-navy/35 bg-navy-tint p-6 md:p-10">
        <div className="grid grid-cols-12 gap-x-4 gap-y-8 md:gap-x-8">
          <div className="col-span-12 md:col-span-3">
            {index && (
              <span className="label inline-flex rounded-full border border-navy/30 bg-white px-2.5 py-1 text-navy">
                {index}
              </span>
            )}
            <p className="label mt-3 text-charcoal-muted">Contact</p>
          </div>
          <div className="col-span-12 flex flex-col gap-8 md:col-span-9">
            <div className="flex flex-col gap-5">
              <h2 id="contact-title" className="display text-title text-balance text-navy">
                Building something, or just want to talk shop?
              </h2>
              <p className="max-w-[36rem] text-lede text-pretty text-charcoal-soft">
                I’m always up for a conversation about systems, products, music, or whatever you’re working on.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {site.contact.email && <CopyEmail email={site.contact.email} />}
                <ResumeLink />
              </div>
            </div>
            <ContactLinks />
          </div>
        </div>
      </div>
    </section>
  );
}
