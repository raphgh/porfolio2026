import { ArrowLink } from "@/components/ArrowLink";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[60vh] flex-col justify-center gap-8 py-24">
      <p className="label text-ink-soft">404 — Not found</p>
      <h1 className="text-display font-medium">
        This page <span className="font-serif font-normal italic">doesn’t exist</span> (yet).
      </h1>
      <ArrowLink href="/" className="self-start">
        Back home
      </ArrowLink>
    </div>
  );
}
