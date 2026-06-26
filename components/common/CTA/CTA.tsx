export default function CTA() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="overflow-hidden rounded-[40px] bg-gradient-to-r from-slate-900 via-blue-950 to-violet-950 px-8 py-20 text-center text-white shadow-2xl md:px-20">
          <h2 className="mx-auto max-w-4xl text-4xl font-bold md:text-6xl">
            Find Your Next Star Hire with Speed and Accuracy
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Transform your hiring process with AI-powered recruitment solutions.
          </p>

          <button className="mt-10 rounded-2xl bg-white px-8 py-4 font-semibold text-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
}