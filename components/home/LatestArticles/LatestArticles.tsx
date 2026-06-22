import Link from "next/link";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    title: "Top Recruitment Trends in 2026",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
    category: "Recruitment",
  },
  {
    title: "How AI is Transforming Hiring",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
    category: "AI Hiring",
  },
  {
    title: "Contract Staffing vs Direct Hiring",
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop",
    category: "Staffing",
  },
];

export default function LatestArticles() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="mb-3 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
              Insights & Resources
            </span>

            <h2 className="text-4xl font-bold text-slate-900 md:text-5xl">
              Latest Articles
            </h2>
          </div>

          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 self-start rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg"
          >
            View All
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.title}
              className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-slate-900/10 to-transparent" />

                <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-blue-600 backdrop-blur-sm">
                  {article.category}
                </span>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
                  {article.title}
                </h3>

                <p className="mt-4 text-slate-600">
                  Explore the latest insights, strategies, and innovations
                  shaping the future of recruitment and talent acquisition.
                </p>

                <div className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-600">
                  Read Article

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}