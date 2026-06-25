import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

import { getBlogBySlug, getBlogs } from "@/services/blog.service";

const API = process.env.NEXT_PUBLIC_API_URL;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps) {
  const { slug } = await params;

  try {
    const blog = await getBlogBySlug(slug);

    return {
      title: blog.seoTitle || blog.title,
      description:
        blog.seoDescription || blog.shortDescription,
      openGraph: {
        title: blog.seoTitle || blog.title,
        description:
          blog.seoDescription ||
          blog.shortDescription,
       images: [
  blog.thumbnail?.startsWith("http")
    ? blog.thumbnail
    : `${API}/${blog.thumbnail}`,
],
      },
    };
  } catch {
    return {
      title: "Blog",
    };
  }
}

export default async function BlogDetailsPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

  const relatedResponse = await getBlogs({
    category: blog.category,
    limit: 3,
  });

  const relatedBlogs = relatedResponse.blogs.filter(
    (item: any) => item.slug !== blog.slug
  );

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 py-32">

        <div className="absolute inset-0">

        <img
  src={
    blog.thumbnail?.startsWith("http")
      ? blog.thumbnail
      : `${API}/${blog.thumbnail}`
  }
  alt={blog.title}
  className="h-full w-full object-cover opacity-25"
/>

          <div className="absolute inset-0 bg-slate-350" />

        </div>

        <div className="container relative z-10">

          <Link
            href="/blogs"
            className="mb-10 inline-flex items-center pr-10 gap-2 text-white/80 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to Blogs
          </Link>

          <span className="inline-flex rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white">
            {blog.category}
          </span>

          <h1 className="mt-8 max-w-5xl text-5xl font-bold leading-tight text-white md:text-7xl">
            {blog.title}
          </h1>

          <p className="mt-8 max-w-3xl text-xl text-slate-300">
            {blog.shortDescription}
          </p>

          <div className="mt-10 flex flex-wrap gap-8 text-sm text-slate-300">

            <div className="flex items-center gap-2">
              <Calendar size={16} />

              {new Date(
                blog.createdAt
              ).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>

            <div className="flex items-center gap-2">
              <Clock size={16} />

              {blog.readingTime}
            </div>

            <div>
              By{" "}
              <span className="font-semibold text-white">
                {blog.author}
              </span>
            </div>

          </div>

        </div>

      </section>

      <section className="py-24">

        <div className="container">

          <div className="mx-auto max-w-5xl">   

            {/* Blog Content */}

            <article
              className="
                prose prose-lg max-w-none
                prose-headings:font-bold
                prose-headings:text-slate-900
                prose-p:text-slate-700
                prose-p:leading-8
                prose-a:text-blue-600
                prose-img:rounded-2xl
                prose-img:shadow-lg
                prose-strong:text-slate-900
                prose-li:text-slate-700
                prose-blockquote:border-l-4
                prose-blockquote:border-blue-600
                prose-blockquote:pl-5
              "
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            />

            {/* Tags */}

            {blog.tags?.length > 0 && (
              <div className="mt-14">

                <h3 className="mb-5 text-xl font-bold">
                  Tags
                </h3>

                <div className="flex flex-wrap gap-3">

                  {blog.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-5 py-2 text-sm font-medium text-slate-700"
                    >
                      #{tag}
                    </span>
                  ))}

                </div>

              </div>
            )}

            {/* Share */}

            <div className="mt-16 rounded-3xl border border-slate-200 bg-slate-50 p-8">

              <h3 className="text-2xl font-bold">
                Share this article
              </h3>

              <div className="mt-6 flex flex-wrap gap-4">

                <a
                  target="_blank"
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    `${process.env.NEXT_PUBLIC_SITE_URL}/blogs/${blog.slug}`
                  )}`}
                  className="rounded-xl bg-[#0077B5] px-5 py-3 font-medium text-white transition hover:opacity-90"
                >
                  LinkedIn
                </a>

                <a
                  target="_blank"
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    `${process.env.NEXT_PUBLIC_SITE_URL}/blogs/${blog.slug}`
                  )}&text=${encodeURIComponent(blog.title)}`}
                  className="rounded-xl bg-black px-5 py-3 font-medium text-white transition hover:opacity-90"
                >
                  X (Twitter)
                </a>

                <a
                  target="_blank"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    `${process.env.NEXT_PUBLIC_SITE_URL}/blogs/${blog.slug}`
                  )}`}
                  className="rounded-xl bg-[#1877F2] px-5 py-3 font-medium text-white transition hover:opacity-90"
                >
                  Facebook
                </a>

              </div>

            </div>

            {/* Author */}

            <div className="mt-16 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">

              <div className="flex items-center gap-5">

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-2xl font-bold text-white">
                  {blog.author?.charAt(0)}
                </div>

                <div>

                  <p className="text-sm text-slate-500">
                    Written By
                  </p>

                  <h4 className="text-2xl font-bold">
                    {blog.author}
                  </h4>

                </div>

              </div>

            </div>
            
            </div>
                        {/* Related Blogs */}

            {relatedBlogs.length > 0 && (
              <div className="mt-24">

                <div className="mb-10 flex items-center justify-between">

                  <h2 className="text-4xl font-bold text-slate-900">
                    Related Articles
                  </h2>

                  <Link
                    href="/blogs"
                    className="font-semibold text-blue-600 transition hover:text-blue-700"
                  >
                    View All →
                  </Link>

                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                  {relatedBlogs.map((item: any) => (
                    <Link
                      key={item._id}
                      href={`/blogs/${item.slug}`}
                      className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                    >

                      <div className="relative h-56 overflow-hidden">

                       <img
  src={
    item.thumbnail?.startsWith("http")
      ? item.thumbnail
      : `${API}/${item.thumbnail}`
  }
  alt={item.title}
  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
/>

                      </div>

                      <div className="p-6">

                        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                          {item.category}
                        </span>

                        <h3 className="mt-4 line-clamp-2 text-2xl font-bold text-slate-900 transition group-hover:text-blue-600">
                          {item.title}
                        </h3>

                        <p className="mt-3 line-clamp-3 text-slate-600">
                          {item.shortDescription}
                        </p>

                        <div className="mt-5 flex items-center justify-between text-sm text-slate-500">

                          <div className="flex items-center gap-2">
                            <Calendar size={14} />
                            {new Date(item.createdAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock size={14} />
                            {item.readingTime}
                          </div>

                        </div>

                      </div>

                    </Link>
                  ))}

                </div>

              </div>
            )}


        </div>

      </section>

    </>
  );
}