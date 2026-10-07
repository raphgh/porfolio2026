import { AboutGallery } from "@/components/AboutGallery";
import { ArrowLink } from "@/components/ArrowLink";
import { Contact } from "@/components/Contact";
import { ExperienceIndex } from "@/components/ExperienceTimeline";
import { ExtracurricularCard } from "@/components/ExtracurricularCard";
import { Hero } from "@/components/Hero";
import { LabHeader, LabItem } from "@/components/LabItem";
import { ProcessSection } from "@/components/ProcessSection";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { about, scrapbook } from "@/data/about";
import { experienceEntries } from "@/data/experience";
import { extracurriculars } from "@/data/extracurriculars";
import { lab } from "@/data/lab";
import { featuredProjects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <Hero />

      <section id="work" aria-labelledby="work-title" className="shell py-20 md:py-28">
        <SectionHeading
          id="work-title"
          index="01"
          kicker="Projects"
          title="Selected work"
          description="Things I’ve built — across backend, full-stack, systems and interface work."
          action={{ label: "All work", href: "/work" }}
        />
        <div className="mt-14 md:mt-20">
          <ProjectGrid projects={featuredProjects} />
        </div>
      </section>

      <section aria-labelledby="experience-title" className="shell py-20 md:py-28">
        <SectionHeading
          id="experience-title"
          index="02"
          kicker="Professional"
          title="Experience"
          description="Real teams, production systems, shipped work."
          action={{ label: "Full experience", href: "/experience" }}
        />
        <Reveal className="mt-12 md:mt-16">
          <ExperienceIndex entries={experienceEntries()} />
        </Reveal>
      </section>

      <section aria-labelledby="extra-title" className="shell py-20 md:py-28">
        <SectionHeading
          id="extra-title"
          index="03"
          kicker="Beyond the job"
          title="Extracurriculars"
          description="Hackathons, community and leadership."
          action={{ label: "All extracurriculars", href: "/extracurriculars" }}
        />
        <ul className="mt-14 grid gap-14 md:mt-20 md:grid-cols-3 md:gap-10">
          {extracurriculars.slice(0, 3).map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 0.06}>
              <ExtracurricularCard item={item} index={i} />
            </Reveal>
          ))}
        </ul>
      </section>

      <div className="mt-8 md:mt-12">
        <ProcessSection />
      </div>

      <section aria-labelledby="lab-title" className="shell py-20 md:py-28">
        <SectionHeading
          id="lab-title"
          index="04"
          kicker="Experiments"
          title="Lab"
          description="Smaller experiments and prototypes. Lower stakes, more curiosity."
          action={{ label: "Open the lab", href: "/lab" }}
        />
        <Reveal className="mt-12 md:mt-16">
          <LabHeader />
          {lab.slice(0, 4).map((item) => (
            <LabItem key={item.id} item={item} />
          ))}
        </Reveal>
      </section>

      <section aria-labelledby="about-title" className="shell py-20 md:py-28">
        <SectionHeading id="about-title" index="05" kicker="Person" title="About" />
        <div className="mt-12 grid grid-cols-12 gap-x-8 gap-y-12 md:mt-16">
          <Reveal className="col-span-12 flex flex-col items-start gap-8 md:col-span-8 md:col-start-4 lg:col-span-6 lg:col-start-4">
            <p className="text-heading font-normal text-pretty">{about.preview}</p>
            <ArrowLink href="/about">More about me</ArrowLink>
          </Reveal>
          <Reveal delay={0.1} className="col-span-12 md:col-span-9 md:col-start-4 lg:col-span-7 lg:col-start-4">
            <AboutGallery items={scrapbook.slice(0, 3)} compact />
          </Reveal>
        </div>
      </section>

      <Contact index="06" />
    </>
  );
}
