export default function BlogHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,.12),transparent_35%)]" />

      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-600">
            Insights & Resources
          </span>

          <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-slate-900 md:text-7xl">
            Recruitment
            <span className="block bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Blog & Insights
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Hiring trends, AI recruitment strategies and staffing
            insights to help businesses grow faster.
          </p>
        </div>
      </div>
    </section>
  );
}