type Props = {
  kicker: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
};

export function PageHeader({ kicker, title, intro, children }: Props) {
  return (
    <header className="grid grid-cols-12 gap-x-4 gap-y-6 pt-12 pb-14 md:gap-x-8 md:pt-20 md:pb-20">
      <div className="col-span-12 md:col-span-3 md:pt-3">
        <p className="label inline-flex rounded-full border border-navy/30 bg-navy-tint px-3 py-1 text-navy">
          {kicker}
        </p>
      </div>
      <div className="col-span-12 flex flex-col gap-6 md:col-span-9">
        <h1 className="display text-[clamp(2.75rem,1.4rem+5vw,6.5rem)] leading-[0.92] text-navy lowercase">
          {title.toLowerCase()}
          <span aria-hidden className="text-mustard">
            .
          </span>
        </h1>
        {intro && <p className="max-w-[40rem] text-lede text-pretty text-charcoal-soft">{intro}</p>}
        {children}
      </div>
    </header>
  );
}
