import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostBody } from "@/components/blog/post-body";
import { CtaBand } from "@/components/sections/cta-band";
import { Icon } from "@/components/ui/icon";
import { getPost, posts, postsByDate } from "@/content/blog";
import { site } from "@/content/site";

export function generateStaticParams() {
  return posts.map((post) => ({ id: String(post.id) }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[id]">): Promise<Metadata> {
  const { id } = await params;
  const post = getPost(id);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.id}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author],
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[id]">) {
  const { id } = await params;
  const post = getPost(id);
  if (!post) notFound();

  const related = postsByDate()
    .filter((candidate) => candidate.id !== post.id)
    .slice(0, 3);

  return (
    <>
      <article>
        <header className="relative isolate overflow-hidden border-b border-hairline bg-ink-deep">
          <Image
            src={post.image}
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/85 to-ink-deep/60" aria-hidden />
          <div className="container-page relative py-14 sm:py-16 lg:py-20">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-flame-500"
            >
              <Icon name="arrow-right" className="size-4 rotate-180" />
              All posts
            </Link>
            <p className="eyebrow mt-6">{post.category}</p>
            <h1 className="mt-3 max-w-4xl text-[2rem] leading-tight sm:text-[2.5rem] lg:text-[2.9rem]">
              {post.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-2">
                <Icon name="users" className="size-4 text-flame-500" />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-2">
                <Icon name="calendar" className="size-4 text-flame-500" />
                {post.date}
              </span>
            </div>
          </div>
        </header>

        <div className="bg-ink py-14 sm:py-16">
          <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="max-w-3xl">
              <p className="border-l-2 border-flame-600 pl-5 text-[1.15rem] leading-relaxed text-white">
                {post.excerpt}
              </p>
              <div className="mt-10">
                <PostBody blocks={post.body} />
              </div>
            </div>

            <aside className="lg:sticky lg:top-32 lg:self-start">
              <div className="rounded-2xl border border-hairline bg-surface p-6">
                <h2 className="text-[1.05rem]">Need help now?</h2>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  Same-day diagnostics across Cincinnati and Dayton, 24/7 for emergencies.
                </p>
                <a
                  href={site.phone.href}
                  className="mt-5 flex items-center gap-2.5 rounded-lg bg-flame-700 px-4 py-3 font-semibold text-white transition-colors hover:bg-flame-600"
                >
                  <Icon name="phone" className="size-[18px]" />
                  {site.phone.display}
                </a>
                <Link
                  href="/contact#schedule"
                  className="mt-3 flex items-center gap-2.5 rounded-lg border border-hairline-strong px-4 py-3 font-semibold text-white transition-colors hover:border-flame-600"
                >
                  <Icon name="calendar" className="size-[18px] text-flame-500" />
                  Schedule online
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <section className="border-t border-hairline bg-surface-alt py-14 sm:py-16">
        <div className="container-page">
          <h2 className="text-[1.5rem]">Keep reading</h2>
          <div className="mt-7 grid gap-5 sm:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/blog/${item.id}`}
                className="group overflow-hidden rounded-xl border border-hairline bg-surface transition-colors hover:border-hairline-strong"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 640px) 360px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm font-semibold text-flame-500">{item.category}</p>
                  <h3 className="mt-2 text-[1rem] leading-snug">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand heading="Stop guessing. Get it diagnosed today." />
    </>
  );
}
