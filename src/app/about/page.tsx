import type { Metadata } from "next";
import { AboutGallery } from "@/components/AboutGallery";
import { ContactLinks } from "@/components/Contact";
import { MediaFrame } from "@/components/MediaFrame";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TechStack } from "@/components/TechStack";
import { about, scrapbook } from "@/data/about";

export const metadata: Metadata = {
  title: "About",
  description: about.preview,
};

export default function AboutPage() {
  return (
    <div className="shell pb-24 md:pb-32">
      <PageHeader kicker="(04) — Person" title="About" intro={about.intro} />

      <section aria-label="Biography" className="grid grid-cols-12 gap-x-4 gap-y-12 md:gap-x-8">
        <div className="col-span-12 sm:col-span-7 md:col-span-4">
          <figure className="overflow-hidden rounded-[1.5rem] border border-navy/35 bg-white">
            <MediaFrame
              aspect="aspect-[4/5]"
              placeholder="Portrait"
              sizes="(min-width: 768px) 33vw, 100vw"
              className="rounded-none border-0"
            />
            <figcaption className="px-4 py-3 text-sm text-charcoal-soft">that’s me</figcaption>
          </figure>
        </div>
        <div className="col-span-12 flex flex-col gap-8 md:col-span-7 md:col-start-6">
          {about.paragraphs.map((p, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "display text-heading text-pretty text-navy"
                  : "text-lede text-pretty text-charcoal-soft"
              }
            >
              {p}
            </p>
          ))}
          <div className="rounded-[1.25rem] border border-navy/30 bg-navy p-5 text-white">
            <h2 className="label mb-4 text-mustard-soft">Things I care about</h2>
            <ul className="flex flex-wrap gap-2">
              {about.interests.map((interest) => (
                <li
                  key={interest}
                  className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm"
                >
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="tech-title" className="mt-28 font-sans md:mt-36">
        <header className="grid grid-cols-12 gap-x-4 gap-y-4 md:gap-x-8">
          <div className="col-span-12 md:col-span-3 md:pt-2">
            <p className="text-[0.72rem] font-medium tracking-[0.08em] text-charcoal-muted uppercase">
              Stack
            </p>
          </div>
          <div className="col-span-12 flex min-w-0 flex-col gap-4 md:col-span-9">
            <h2
              id="tech-title"
              className="text-[clamp(1.75rem,1.2rem+1.8vw,2.5rem)] font-semibold tracking-[-0.03em] text-navy"
            >
              Technologies I’ve used
            </h2>
            <p className="max-w-md text-lg leading-snug text-charcoal-soft">
              Languages, frameworks, editors, and the platforms I build with day to day.
            </p>
          </div>
        </header>
        <Reveal className="mt-10 md:mt-14">
          <TechStack />
        </Reveal>
      </section>

      <section aria-labelledby="makes-title" className="mt-28 md:mt-36">
        <SectionHeading
          id="makes-title"
          kicker="Outside software"
          title="A few things I make"
          description="Not a creative portfolio — just evidence there’s a person behind the commits."
        />
        <Reveal className="mt-12 md:mt-16">
          <AboutGallery items={scrapbook} />
        </Reveal>
      </section>

      <section aria-labelledby="elsewhere-title" className="mt-28 md:mt-36">
        <h2 id="elsewhere-title" className="display mb-6 text-heading text-navy">
          Elsewhere
        </h2>
        <ContactLinks />
      </section>
    </div>
  );
}
