type Props = {
  kicker: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
};

export function PageHeader({ kicker, title, intro, children }: Props) {
  return (
    <header className="grid grid-cols-12 gap-x-8 gap-y-6 pt-12 pb-14 md:pt-20 md:pb-20">
      <p className="label col-span-12 text-ink-soft md:col-span-3 md:pt-4">{kicker}</p>
      <div className="col-span-12 flex flex-col gap-6 md:col-span-9">
        {/* Sized to the viewport so the longest title ("Extracurriculars") never overflows. */}
        <h1 className="text-[min(8.2vw,6.75rem)] leading-[0.95] font-medium tracking-[-0.035em] uppercase md:text-[min(6vw,6.75rem)]">
          {title}
        </h1>
        {intro && <p className="max-w-[40rem] text-lede text-pretty text-ink-soft">{intro}</p>}
        {children}
      </div>
    </header>
  );
}
