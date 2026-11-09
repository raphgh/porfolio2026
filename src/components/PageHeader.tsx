type Props = {
  title: string;
  intro?: string;
  children?: React.ReactNode;
};

export function PageHeader({ title, intro, children }: Props) {
  return (
    <header className="flex flex-col gap-4 pt-10 pb-10 md:pt-14 md:pb-14">
      <h1 className="display text-left text-[clamp(2rem,1.35rem+2.2vw,3.25rem)] leading-[1.02] tracking-[-0.03em] text-navy lowercase">
        {title.toLowerCase()}
        <span aria-hidden className="text-mustard">
          .
        </span>
      </h1>
      {intro && <p className="max-w-[40rem] text-left text-lede text-pretty text-charcoal-soft">{intro}</p>}
      {children}
    </header>
  );
}
