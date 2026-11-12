import type { Book } from "@/data/types";

/** Compact row of book covers — placeholders until real covers land. */
export function BookShelf({ books }: { books: Book[] }) {
  return (
    <ul className="flex flex-wrap items-start gap-3 sm:gap-3.5">
      {books.map((book, i) => {
        const cover = book.cover?.type === "image" ? book.cover : null;
        const hasCover = Boolean(cover?.src);

        return (
          <li key={`${book.title}-${book.author}-${i}`} className="group w-[4.75rem] sm:w-[5.5rem] md:w-[6.25rem]">
            <figure>
              <div className="relative aspect-[2/3] overflow-hidden rounded-md border border-navy/20 bg-[#f2f2f7] shadow-[1px_3px_10px_-6px_rgb(26_26_26/0.35)] transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
                {hasCover && cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={cover.src}
                    alt={cover.alt || `${book.title} cover`}
                    className="absolute inset-0 size-full object-cover transition-[filter] duration-300 group-hover:brightness-[0.55]"
                  />
                ) : (
                  <div className="hatch absolute inset-0 flex flex-col justify-between p-2">
                    <span className="text-[0.55rem] font-medium tracking-[0.06em] text-navy/40 uppercase">
                      Cover
                    </span>
                    <span className="line-clamp-3 text-[0.65rem] leading-snug font-medium tracking-[-0.01em] text-navy/65">
                      {book.title}
                    </span>
                  </div>
                )}
                {hasCover && (
                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-2 py-2 text-[0.65rem] font-medium text-snow opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {book.title}
                  </figcaption>
                )}
              </div>
              <figcaption className="sr-only">
                {book.title}
                {book.author ? ` by ${book.author}` : ""}
              </figcaption>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
