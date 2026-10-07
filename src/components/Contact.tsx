import { site } from "@/data/site";
import { CopyEmail } from "./CopyEmail";
import { ResumeLink } from "./ResumeLink";

const contactRows = [
  { label: "Email", value: site.contact.email, href: site.contact.email && `mailto:${site.contact.email}` },
  { label: "GitHub", value: site.contact.github, href: site.contact.github },
  { label: "LinkedIn", value: site.contact.linkedin, href: site.contact.linkedin },
];

const display = (url: string) => url.replace(/^(https?:\/\/)?(www\.)?/, "").replace(/\/$/, "");

/** Rows render as plain placeholders until the value is set in data/site.ts. */
export function ContactLinks({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <ul className={`border-b ${dark ? "border-paper/20" : "border-rule"}`}>
      {contactRows.map((row) => (
        <li
          key={row.label}
          className={`grid grid-cols-[6rem_1fr] items-baseline gap-4 border-t py-4 md:grid-cols-[10rem_1fr] ${
            dark ? "border-paper/20" : "border-rule"
          }`}
        >
          <span className={`label ${dark ? "text-night-soft" : "text-ink-muted"}`}>{row.label}</span>
          {row.href ? (
            <a
              href={row.href}
              {...(row.label !== "Email" && { target: "_blank", rel: "noopener noreferrer" })}
              className="group flex items-baseline justify-between gap-4 text-heading font-medium break-all hover:text-accent"
            >
              {row.label === "Email" ? row.value : display(row.value)}
              <span aria-hidden className="text-[0.6em] transition-transform duration-300 group-hover:translate-x-1">
                {row.label === "Email" ? "→" : "↗"}
              </span>
            </a>
          ) : (
            <span
              className={`text-heading font-medium underline decoration-dashed decoration-1 underline-offset-[6px] ${
                dark ? "text-night-soft decoration-night-soft/50" : "text-ink-muted decoration-ink-muted/50"
              }`}
            >
              [{row.label.toLowerCase()}]
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function Contact({ index }: { index: string }) {
  return (
    <section id="contact" aria-labelledby="contact-title" className="shell py-20 md:py-32">
      <div className="grid grid-cols-12 gap-x-8 gap-y-10 border-t border-ink pt-5">
        <p className="label col-span-12 text-ink-soft md:col-span-3">
          <span className="text-ink">({index})</span> — Contact
        </p>
        <div className="col-span-12 flex flex-col gap-12 md:col-span-9">
          <div className="flex flex-col gap-6">
            <h2 id="contact-title" className="text-title font-medium text-balance">
              Building something, or just want to{" "}
              <span className="font-serif font-normal italic">talk shop?</span>
            </h2>
            <p className="max-w-[36rem] text-lede text-pretty text-ink-soft">
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
    </section>
  );
}
