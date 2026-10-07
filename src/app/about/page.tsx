import type { Metadata } from "next";
import { AboutGallery } from "@/components/AboutGallery";
import { ContactLinks } from "@/components/Contact";
import { MediaFrame } from "@/components/MediaFrame";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { about, scrapbook } from "@/data/about";

export const metadata: Metadata = {
  title: "About",
  description: about.preview,
};

export default function AboutPage() {
  return (
    <div className="shell pb-24 md:pb-32">
      <PageHeader kicker="(05) — Person" title="About" intro={about.intro} />

      <section aria-label="Biography" className="grid grid-cols-12 gap-x-8 gap-y-10">
        <div className="col-span-12 sm:col-span-6 md:col-span-4 md:col-start-1">
          <MediaFrame aspect="aspect-[4/5]" placeholder="Portrait" sizes="(min-width: 768px) 33vw, 100vw" />
        </div>
        <div className="col-span-12 flex flex-col gap-8 md:col-span-7 md:col-start-6">
          {about.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "text-heading font-normal text-pretty" : "text-lede text-pretty text-ink-soft"}>
              {p}
            </p>
          ))}
          <div className="border-t border-ink pt-4">
            <h2 className="label mb-3 text-ink-muted">Things I care about</h2>
            <ul className="flex flex-wrap gap-x-2 gap-y-1 font-serif text-[1.35rem] italic">
              {about.interests.map((interest, i) => (
                <li key={interest} className="flex items-baseline gap-2">
                  {i > 0 && (
                    <span aria-hidden className="font-sans text-sm text-accent not-italic">
                      /
                    </span>
                  )}
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="makes-title" className="mt-28 md:mt-40">
        <SectionHeading
          id="makes-title"
          kicker="Outside software"
          title="A few things I make"
          description="Not a creative portfolio — just evidence there’s a person behind the commits."
        />
        <Reveal className="mt-14 md:mt-20">
          <AboutGallery items={scrapbook} />
        </Reveal>
      </section>

      <section aria-labelledby="elsewhere-title" className="mt-28 border-t border-ink pt-6 md:mt-40">
        <h2 id="elsewhere-title" className="label mb-6 text-ink-soft">
          Elsewhere
        </h2>
        <ContactLinks />
      </section>
    </div>
  );
}
