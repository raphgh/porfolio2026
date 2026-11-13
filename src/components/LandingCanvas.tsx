import { site } from "@/data/site";

// TODO: restore landing image frames once real photos are ready

export function LandingCanvas() {
  const name = site.name.toLowerCase();

  return (
    <section
      aria-labelledby="landing-name"
      className="relative flex h-[calc(100dvh-3.5rem)] w-full flex-col md:h-[calc(100dvh-4rem)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tech-dots opacity-50" />

      <div className="relative min-h-0 flex-1">
        <div className="absolute inset-0 z-10 grid place-items-center px-6 text-center">
          <div className="flex flex-col items-center gap-3 md:gap-4">
            <h1
              id="landing-name"
              className="display max-w-[16ch] text-[clamp(2.4rem,1.2rem+5vw,5.75rem)] leading-[0.95] text-navy"
            >
              <span aria-hidden className="text-navy/35">
                [{" "}
              </span>
              {name}
              <span aria-hidden className="text-navy/35">
                {" "}
                ]
              </span>
            </h1>
            <p className="text-[0.95rem] tracking-[-0.01em] text-charcoal-muted md:text-[1.05rem]">
              ottawa-based software engineer & creative
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
