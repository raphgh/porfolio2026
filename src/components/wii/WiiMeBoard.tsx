"use client";

import { useRef } from "react";
import { m, useInView, useReducedMotion } from "motion/react";
import { AboutGallery } from "@/components/AboutGallery";
import { BookShelf } from "@/components/BookShelf";
import { InspirationList } from "@/components/InspirationList";
import { MediaFrame } from "@/components/MediaFrame";
import { Reveal } from "@/components/Reveal";
import { TechStack } from "@/components/TechStack";
import { useInterfaceMode } from "@/components/InterfaceModeProvider";
import { WiiPanel } from "@/components/wii/WiiPanel";
import { about, books, inspirations, scrapbook } from "@/data/about";
import { site } from "@/data/site";

const POLAROID_CAPTION = "music fundraiser @ the Ottawa Bike Café, raising $1,200+";

const MII_FIELDS = [
  { label: "Name", value: site.name },
  {
    label: "Studying",
    value: "Software Engineering @ uOttawa, microprogram in AI",
  },
  { label: "Loves", value: "art, music, culture" },
  { label: "Currently", value: "finishing my bachelor's" },
] as const;

/** First three bio beats — exact copy; third bubble carries the next lines too. */
const BIO_BUBBLES: { lead?: boolean; lines: string[] }[] = [
  { lead: true, lines: [about.paragraphs[0]!] },
  { lines: [about.paragraphs[1]!] },
  { lines: [about.paragraphs[2]!, about.paragraphs[3]!] },
];

/**
 * Wii Mii-style Me profile. Modern mode keeps the full existing Me page.
 */
export function WiiMeBoard() {
  const { mode } = useInterfaceMode();
  const reduce = useReducedMotion();

  if (mode !== "wii") {
    return <ModernMe />;
  }

  return (
    <div className="wii-me">
      <WiiPanel className="wii-me-card-panel">
        <div className="wii-me-card">
          <div className="wii-me-card__checker" aria-hidden />
          <div className="wii-me-card__row">
            <m.div
              className="wii-me-avatar"
              animate={reduce ? undefined : { y: [0, -5, 0] }}
              transition={
                reduce
                  ? undefined
                  : { duration: 3.6, ease: "easeInOut", repeat: Infinity }
              }
            >
              <span className="wii-me-avatar__ring">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/me.jpg" alt="" className="wii-me-avatar__img" />
              </span>
            </m.div>

            <dl className="wii-me-fields">
              {MII_FIELDS.map((field) => (
                <div key={field.label} className="wii-me-field">
                  <dt>{field.label}</dt>
                  <dd>{field.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </WiiPanel>

      <div className="wii-me-story">
        <Polaroid />
        <div className="wii-me-bubbles">
          {BIO_BUBBLES.map((bubble, i) => (
            <BioBubble key={i} index={i} lead={bubble.lead} lines={bubble.lines} side={i % 2 === 0 ? "left" : "right"} />
          ))}
          {about.paragraphs[4] ? (
            <p className="wii-me-scroll-note">{about.paragraphs[4]}</p>
          ) : null}
        </div>
      </div>

      <WiiPanel className="wii-me-section-panel">
        <section id="inspo" aria-labelledby="inspo-title" className="wii-me-section">
          <h2 id="inspo-title" className="wii-me-section__title">
            likings/things I appreciate
          </h2>
          <InspirationList items={inspirations} />
        </section>
      </WiiPanel>

      <WiiPanel className="wii-me-section-panel">
        <section id="reads" aria-labelledby="reads-title" className="wii-me-section">
          <h2 id="reads-title" className="wii-me-section__title">
            cool reads :)
          </h2>
          <BookShelf books={books} />
        </section>
      </WiiPanel>

      <WiiPanel className="wii-me-section-panel">
        <section id="tech" aria-labelledby="tech-title" className="wii-me-section">
          <h2 id="tech-title" className="wii-me-section__title">
            Technologies I&apos;ve used
          </h2>
          <TechStack />
        </section>
      </WiiPanel>
    </div>
  );
}

function Polaroid() {
  return (
    <figure className="wii-me-polaroid-wrap">
      <div className="wii-me-cork" aria-hidden>
        <span className="wii-me-tape wii-me-tape--left" />
        <span className="wii-me-tape wii-me-tape--right" />
      </div>
      <div className="wii-me-polaroid">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/scrapbook/fundraiser.jpg"
          alt="Hosting a music fundraiser for the Lebanese Red Cross"
          className="wii-me-polaroid__photo"
        />
        <figcaption className="wii-me-polaroid__caption">{POLAROID_CAPTION}</figcaption>
      </div>
    </figure>
  );
}

function BioBubble({
  lines,
  lead,
  side,
  index,
}: {
  lines: string[];
  lead?: boolean;
  side: "left" | "right";
  index: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <m.div
      ref={ref}
      className={`wii-me-bubble wii-me-bubble--${side}${lead ? " is-lead" : ""}`}
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.86, y: 18 }}
      animate={
        inView
          ? { opacity: 1, scale: 1, y: 0 }
          : reduce
            ? { opacity: 0 }
            : { opacity: 0, scale: 0.86, y: 18 }
      }
      transition={
        reduce
          ? { duration: 0.25, delay: index * 0.05 }
          : { type: "spring", stiffness: 320, damping: 22, delay: index * 0.08 }
      }
    >
      {lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </m.div>
  );
}

function ModernMe() {
  return (
    <>
      <section aria-label="Biography" className="grid grid-cols-12 gap-x-4 gap-y-12 md:gap-x-8">
        <div className="col-span-12 sm:col-span-7 md:col-span-4">
          <figure className="overflow-hidden rounded-[1.5rem] border border-navy/35 bg-white">
            <MediaFrame
              media={{
                type: "image",
                src: "/scrapbook/fundraiser.jpg",
                alt: "Hosting a music fundraiser for the Lebanese Red Cross",
              }}
              aspect="aspect-[4/5]"
              sizes="(min-width: 768px) 33vw, 100vw"
              className="rounded-none border-0"
              priority
            />
            <figcaption className="px-4 py-3 text-sm text-charcoal-muted dark:text-snow">
              📍 {POLAROID_CAPTION}
            </figcaption>
          </figure>
        </div>
        <div className="col-span-12 flex flex-col gap-8 md:col-span-7 md:col-start-6">
          {about.paragraphs.map((p, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "display text-heading text-pretty text-navy"
                  : "text-lede text-pretty text-charcoal-muted"
              }
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      <section id="scrapbook" aria-label="Scrapbook" className="mt-28 scroll-mt-24 md:mt-36">
        <Reveal className="mt-12 md:mt-16">
          <AboutGallery items={scrapbook} />
        </Reveal>
      </section>

      <section id="inspo" aria-labelledby="inspo-title" className="mt-28 scroll-mt-24 md:mt-36">
        <Reveal>
          <div className="grid grid-cols-12 items-start gap-x-4 gap-y-6 md:gap-x-8">
            <div className="col-span-12 md:col-span-3 md:pt-1">
              <h2
                id="inspo-title"
                className="text-[0.72rem] font-medium tracking-[0.08em] text-charcoal-soft uppercase"
              >
                likings/things I appreciate
              </h2>
            </div>
            <div className="col-span-12 md:col-span-9">
              <InspirationList items={inspirations} />
            </div>
          </div>
        </Reveal>
      </section>

      <section id="reads" aria-labelledby="reads-title" className="mt-28 scroll-mt-24 md:mt-36">
        <Reveal>
          <div className="grid grid-cols-12 items-start gap-x-4 gap-y-6 md:gap-x-8">
            <div className="col-span-12 md:col-span-3 md:pt-1">
              <h2
                id="reads-title"
                className="text-[0.72rem] font-medium tracking-[0.08em] text-charcoal-soft uppercase"
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

      <section id="tech" aria-labelledby="tech-title" className="mt-28 scroll-mt-24 font-sans md:mt-36">
        <Reveal>
          <div className="grid grid-cols-12 items-start gap-x-4 gap-y-6 md:gap-x-8">
            <div className="col-span-12 md:col-span-3 md:pt-1">
              <h2
                id="tech-title"
                className="text-[0.72rem] font-medium tracking-[0.08em] text-charcoal-soft uppercase"
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
    </>
  );
}
