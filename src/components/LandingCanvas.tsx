import { site } from "@/data/site";

/** Scattered square image frames — square corners, spread across the full viewport. */
const frames = [
  { label: "image", className: "left-[3%] top-[14%] w-[18%] aspect-square md:left-[5%] md:top-[16%] md:w-[14%]", rotate: "-3deg" },
  { label: "image", className: "right-[4%] top-[10%] w-[16%] aspect-square md:right-[6%] md:top-[12%] md:w-[13%]", rotate: "2.5deg" },
  { label: "image", className: "left-[18%] top-[58%] w-[15%] aspect-square md:left-[12%] md:top-[55%] md:w-[12%]", rotate: "1.5deg" },
  { label: "image", className: "right-[14%] top-[48%] w-[17%] aspect-square md:right-[10%] md:top-[42%] md:w-[13%]", rotate: "-2deg" },
  { label: "image", className: "left-[42%] top-[8%] w-[12%] aspect-square md:left-[38%] md:top-[10%] md:w-[10%]", rotate: "3deg" },
  { label: "image", className: "right-[28%] bottom-[12%] w-[14%] aspect-square md:right-[22%] md:bottom-[14%] md:w-[11%]", rotate: "-1deg" },
] as const;

export function LandingCanvas() {
  const name = site.name.toLowerCase();

  return (
    <section
      aria-labelledby="landing-name"
      className="relative flex h-[calc(100dvh-3.5rem)] w-full flex-col md:h-[calc(100dvh-4rem)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tech-dots opacity-50" />

      <div className="relative min-h-0 flex-1">
        {frames.map((frame, i) => (
          <figure
            key={i}
            style={{ rotate: frame.rotate }}
            className={`absolute overflow-hidden border border-navy/55 bg-navy-tint ${frame.className}`}
          >
            <div className="hatch absolute inset-0" />
            <figcaption className="absolute inset-0 grid place-items-center font-mono text-[0.65rem] tracking-[0.18em] text-navy/55 uppercase">
              {frame.label}
            </figcaption>
          </figure>
        ))}

        <div className="absolute inset-0 z-10 grid place-items-center px-6 text-center">
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
        </div>
      </div>
    </section>
  );
}
