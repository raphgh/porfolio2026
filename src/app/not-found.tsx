import { ArrowLink } from "@/components/ArrowLink";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[60vh] flex-col justify-center gap-6 py-24">
      <span className="label inline-flex w-fit rounded-full border border-navy/30 bg-navy-tint px-3 py-1 text-navy">
        404 — Not found
      </span>
      <h1 className="display text-display text-navy">
        This page doesn’t exist <span className="text-mustard">(yet)</span>
      </h1>
      <ArrowLink href="/" className="self-start">
        Back home
      </ArrowLink>
    </div>
  );
}
