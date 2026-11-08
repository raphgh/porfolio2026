import { AboutGallery } from "@/components/AboutGallery";
import { BookShelf } from "@/components/BookShelf";
import { InspirationList } from "@/components/InspirationList";
import { MediaFrame } from "@/components/MediaFrame";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { TechStack } from "@/components/TechStack";
import { about, books, inspirations, scrapbook } from "@/data/about";

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
        </div>
      </section>

      <section aria-labelledby="makes-title" className="mt-28 md:mt-36">
        <Reveal className="mt-12 md:mt-16">
          <AboutGallery items={scrapbook} />
        </Reveal>
      </section>

      <section aria-labelledby="reads-title" className="mt-28 md:mt-36">
        <Reveal>
          <div className="grid grid-cols-12 items-start gap-x-4 gap-y-6 md:gap-x-8">
            <div className="col-span-12 md:col-span-3 md:pt-1">
              <h2
                id="reads-title"
                className="text-[0.72rem] font-medium tracking-[0.08em] text-charcoal-muted uppercase"
              >
                cool reads :)
              </h2>
            </div>
            <div className="col-span-12 md:col-span-9">
              <BookShelf books={books} />
            </div>
          </div>
        </Reveal>
      </section>

      <section aria-labelledby="inspo-title" className="mt-28 md:mt-36">
        <Reveal>
          <div className="grid grid-cols-12 items-start gap-x-4 gap-y-6 md:gap-x-8">
            <div className="col-span-12 md:col-span-3 md:pt-1">
              <h2
                id="inspo-title"
                className="text-[0.72rem] font-medium tracking-[0.08em] text-charcoal-muted uppercase"
              >
                creators/things I appreciate
              </h2>
            </div>
            <div className="col-span-12 md:col-span-9">
              <InspirationList items={inspirations} />
            </div>
          </div>
        </Reveal>
      </section>

      <section aria-labelledby="tech-title" className="mt-28 font-sans md:mt-36">
        <Reveal>
          <div className="grid grid-cols-12 items-start gap-x-4 gap-y-6 md:gap-x-8">
            <div className="col-span-12 md:col-span-3 md:pt-1">
              <h2
                id="tech-title"
                className="text-[0.72rem] font-medium tracking-[0.08em] text-charcoal-muted uppercase"
              >
                Technologies I&apos;ve used
              </h2>
            </div>
            <div className="col-span-12 md:col-span-9">
              <TechStack />
            </div>
          </div>
        </Reveal>
      </section>

    </div>
  );
}
