"use client";

import { useInterfaceMode } from "@/components/InterfaceModeProvider";
import { WiiPage } from "@/components/wii/WiiPage";
import { blogPosts } from "@/data/blog";
import type { BlogPost } from "@/data/types";

/**
 * Blog feed - posts render inline on `/blog`, no cards or separate pages.
 */
export function BlogView() {
  const { mode, ready } = useInterfaceMode();
  if (!ready) return null;

  if (mode !== "wii") return <ModernBlog posts={blogPosts} />;
  return <ClassicBlog posts={blogPosts} />;
}

function ModernBlog({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="shell pt-10 pb-24 md:pt-14 md:pb-32">
      <header className="max-w-2xl">
        <p className="label text-charcoal-muted">Blog</p>
        <h1 className="display mt-2 text-title text-navy">logs</h1>
        <p className="mt-3 text-lede text-charcoal-soft">
          Short notes on events, thoughts, and things worth remembering.
        </p>
      </header>

      <div className="mt-12 flex max-w-2xl flex-col gap-16 md:gap-20">
        {posts.map((post) => (
          <BlogEntry key={post.slug} post={post} priority={post === posts[0]} modern />
        ))}
      </div>
    </div>
  );
}

function ClassicBlog({ posts }: { posts: BlogPost[] }) {
  return (
    <WiiPage
      title="Blog"
      subtitle="cool things worth sharing :p"
      thumb="/scrapbook/fundraiser.jpg"
      accent="#e8eef3"
      channelId="blog"
    >
      <div className="wii-blog">
        {posts.map((post) => (
          <BlogEntry key={post.slug} post={post} priority={post === posts[0]} />
        ))}
      </div>
    </WiiPage>
  );
}

function BlogEntry({
  post,
  priority = false,
  modern = false,
}: {
  post: BlogPost;
  priority?: boolean;
  modern?: boolean;
}) {
  if (modern) {
    return (
      <article id={post.slug} className="scroll-mt-24">
        <header>
          <p className="label text-charcoal-muted">{post.date}</p>
          <h2 className="display mt-2 text-heading text-navy text-pretty">{post.title}</h2>
        </header>

        <div className="mt-5 flex flex-col gap-4">
          {post.body.map((paragraph, i) => (
            <p key={i} className="text-lede text-pretty text-charcoal-soft">
              {paragraph}
            </p>
          ))}
        </div>

        {post.photos && post.photos.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {post.photos.map((photo, i) =>
              photo.type === "image" ? (
                <figure key={i} className="flex flex-col gap-2">
                  <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[4/3]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="absolute inset-0 size-full object-cover"
                      fetchPriority={priority && i === 0 ? "high" : undefined}
                    />
                  </div>
                  {photo.caption ? (
                    <figcaption className="label text-charcoal-muted">{photo.caption}</figcaption>
                  ) : null}
                </figure>
              ) : null,
            )}
          </div>
        ) : null}
      </article>
    );
  }

  return (
    <article id={post.slug} className="wii-blog-entry">
      <header className="wii-blog-entry__head">
        <p className="wii-blog-entry__date">{post.date}</p>
        <h2 className="wii-blog-entry__title">{post.title}</h2>
      </header>

      <div className="wii-blog-post">
        {post.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      {post.photos && post.photos.length > 0 ? (
        <div className="wii-blog-photos">
          {post.photos.map((photo, i) =>
            photo.type === "image" ? (
              <figure key={i} className="wii-blog-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.src} alt={photo.alt} />
                {photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
              </figure>
            ) : null,
          )}
        </div>
      ) : null}
    </article>
  );
}
