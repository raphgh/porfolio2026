import { process } from "@/data/process";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const noteColors = ["bg-powder", "bg-card", "bg-powder-soft", "bg-card"];
const noteTilts = [-1, 0.8, -0.6, 1];

export function ProcessSection({ index }: { index?: string }) {
  return (
    <section aria-labelledby="process-title" className="relative overflow-hidden border-y-[1.5px] border-ink bg-berry text-card">
      <div className="shell relative py-20 md:py-28">
        <SectionHeading
          id="process-title"
          index={index}
          kicker="understand → design → build → ship"
          title="How I build"
          tone="dark"
          description="Not a design process or an engineering process — just the loop I run, whichever layer the problem lives in."
        />

        <Reveal>
          <p className="display mt-14 flex flex-wrap items-center gap-x-3 gap-y-3 text-[clamp(1.6rem,1.1rem+2.2vw,3.25rem)] leading-none uppercase md:mt-20">
            <span className="sr-only">{process.flow.join(", then ")}.</span>
            {process.flow.map((step, i) => (
              <span key={step} aria-hidden className="flex items-center gap-3">
                {i > 0 && <span className="font-pixel text-[0.7em] font-normal text-powder">→</span>}
                <span
                  className={
                    i === process.flow.length - 1
                      ? "border-[1.5px] border-ink bg-powder px-2 py-1 text-ink shadow-hard"
                      : "text-card"
                  }
                >
                  {step}
                </span>
              </span>
            ))}
          </p>
        </Reveal>

        <ol className="mt-16 grid gap-x-6 gap-y-10 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {process.steps.map((step, i) => (
            <Reveal as="li" key={step.name} delay={i * 0.06}>
              <div
                style={{ rotate: `${noteTilts[i % noteTilts.length]}deg` }}
                className={`relative flex h-full flex-col gap-4 border-[1.5px] border-ink p-5 pt-7 text-ink shadow-hard-lg transition-transform duration-300 ease-(--ease-bounce) hover:rotate-0! hover:-translate-y-1 ${
                  noteColors[i % noteColors.length]
                }`}
              >
                <span className="font-pixel text-sm text-ink/60">
                  STEP {String(i + 1).padStart(2, "0")} / 0{process.steps.length}
                </span>
                <h3 className="display text-heading uppercase">{step.name}</h3>
                <p className="text-ink-soft">{step.body}</p>
                <ul aria-label={`${step.name} outputs`} className="mt-auto flex flex-col gap-1 border-t-[1.5px] border-dashed border-ink/30 pt-3 font-mono text-[0.8rem]">
                  {step.outputs.map((o) => (
                    <li key={o}>
                      <span aria-hidden className="text-ink/45">
                        [x]
                      </span>{" "}
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
