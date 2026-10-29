import Link from "next/link";
import { hero, site } from "@/data/site";
import { DoodleStage } from "./doodles/DoodleStage";
import { Scribble } from "./scrapbook/Scribble";

export function Hero() {
  const [tech, rest] = hero.headline.emphasis.split(", ");
  const [design, culture] = rest.split(" & ");
  const firstName = site.name.split(" ")[0];

  return (
    <section
      aria-labelledby="hero-title"
      className="shell relative flex flex-col items-center pt-[8.5rem] pb-[9.5rem] text-center lg:min-h-[min(46rem,calc(100svh-4rem))] lg:justify-center lg:py-24"
    >
      <DoodleStage className="absolute inset-0" />

      <div className="flex max-w-[40rem] flex-col items-center">
        <p className="label text-ink-muted">Engineer · Builder · Creative</p>
        <p aria-hidden className="mt-6 mb-3 -rotate-2 font-hand text-[1.9rem] leading-none text-berry md:text-[2.3rem]">
          hi, I’m {firstName}!
        </p>

        <h1
          id="hero-title"
          className="display text-[clamp(2.4rem,1.3rem+3.9vw,4.9rem)] leading-[0.95] tracking-[-0.045em] text-balance"
        >
          {hero.headline.lead} {tech},{" "}
          <span className="relative inline-block text-berry">
            {design}
            <Scribble variant="squiggle" className="absolute -bottom-[0.12em] left-0 h-[0.18em] w-full text-berry" />
          </span>{" "}
          &amp; {culture}
        </h1>

        <p className="mt-8 max-w-[34rem] text-lede text-pretty text-ink-soft">{hero.body}</p>
        <ul aria-label="What I work on" className="mt-7 flex flex-wrap justify-center gap-2">
          {hero.capabilities.map((c) => (
            <li key={c} className="rounded-full border border-rule-strong bg-paper/80 px-3 py-1 text-sm text-ink-soft">
              {c}
            </li>
          ))}
        </ul>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="#work"
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-[0.95rem] text-paper transition-colors hover:bg-berry"
          >
            Selected work
            <span aria-hidden className="transition-transform group-hover:translate-y-0.5">
              ↓
            </span>
          </Link>
          <Link
            href="/experience"
            className="group inline-flex h-11 items-center gap-2 rounded-full border border-rule-strong bg-paper/80 px-5 text-[0.95rem] transition-colors hover:border-ink"
          >
            Experience
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
