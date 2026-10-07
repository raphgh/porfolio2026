import { process } from "@/data/process";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function ProcessSection({ index }: { index?: string }) {
  return (
    <section aria-labelledby="process-title" className="bg-night text-paper">
      <div className="shell py-20 md:py-32">
        <SectionHeading
          id="process-title"
          index={index}
          kicker="Process — Understand · Design · Build · Ship"
          title="How I build"
          tone="dark"
          description="Not a design process or an engineering process — just the loop I run, whichever layer the problem lives in."
        />

        <Reveal>
          <p className="mt-14 flex flex-wrap items-baseline gap-x-4 gap-y-2 font-serif text-[clamp(1.75rem,1.2rem+2.4vw,3.5rem)] leading-tight italic md:mt-20">
            <span className="sr-only">{process.flow.join(", then ")}.</span>
            {process.flow.map((step, i) => (
              <span key={step} aria-hidden className="flex items-baseline gap-4">
                {i > 0 && <span className="font-sans text-[0.6em] text-accent not-italic">→</span>}
                <span className={i === process.flow.length - 1 ? "text-paper" : "text-paper/70"}>{step}</span>
              </span>
            ))}
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {process.steps.map((step, i) => (
            <Reveal as="li" key={step.name} delay={i * 0.06} className="group flex flex-col gap-4 border-t border-paper/25 pt-5 transition-colors hover:border-accent">
              <span className="label text-night-soft">
                {String(i + 1).padStart(2, "0")} <span aria-hidden>/ 0{process.steps.length}</span>
              </span>
              <h3 className="text-heading font-medium uppercase">{step.name}</h3>
              <p className="text-night-soft">{step.body}</p>
              <ul aria-label={`${step.name} outputs`} className="label mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-2 text-paper/85">
                {step.outputs.map((o) => (
                  <li key={o} className="flex items-center gap-2">
                    <span aria-hidden className="size-1 bg-accent" />
                    {o}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
