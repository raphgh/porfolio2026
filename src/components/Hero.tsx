import Link from "next/link";
import { hero } from "@/data/site";
import { DoodleStage } from "./doodles/DoodleStage";

export function Hero() {
  const [beforeAmp, afterAmp] = hero.headline.emphasis.split("&");
  return (
    <section aria-labelledby="hero-title" className="shell pt-8 pb-16 md:pt-12 lg:pb-24">
      <div className="label flex items-center justify-between border-b border-rule pb-3 text-ink-soft">
        <span>Engineer · Builder · Creative</span>
        <span className="max-sm:hidden">Portfolio — {new Date().getFullYear()}</span>
      </div>

      <div className="grid grid-cols-12 gap-x-8 pt-10 md:pt-16 lg:min-h-[min(44rem,calc(100svh-13rem))]">
        <div className="col-span-12 flex flex-col lg:col-span-8">
          <h1 id="hero-title" className="text-display font-medium text-balance">
            {hero.headline.lead}{" "}
            <span className="font-serif text-[1.06em] font-normal tracking-[-0.02em] italic">
              {beforeAmp}
              <span className="text-accent not-italic">&amp;</span>
              {afterAmp}
            </span>
          </h1>

          <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-[minmax(0,34rem)_auto] md:items-end md:gap-12 lg:mt-auto lg:pt-14">
            <p className="text-lede text-pretty text-ink-soft">{hero.body}</p>
            <ul aria-label="What I work on" className="label flex flex-wrap gap-x-3 gap-y-1.5 text-ink md:max-w-[14rem] md:flex-col">
              {hero.capabilities.map((c) => (
                <li key={c} className="flex items-center gap-2">
                  <span aria-hidden className="text-ink-muted">
                    /
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link
              href="#work"
              className="label group inline-flex h-11 items-center gap-3 bg-ink px-5 text-paper transition-colors hover:bg-accent"
            >
              Selected work
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5">
                ↓
              </span>
            </Link>
            <Link
              href="/experience"
              className="label group inline-flex h-11 items-center gap-3 border border-ink px-5 transition-colors hover:bg-ink hover:text-paper"
            >
              Experience
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
        </div>

        <DoodleStage className="col-span-12 mt-12 h-[19rem] sm:h-[22rem] lg:col-span-4 lg:mt-0 lg:h-auto" />
      </div>
    </section>
  );
}
