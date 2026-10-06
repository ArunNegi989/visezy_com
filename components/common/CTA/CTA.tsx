export default function CTA() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="overflow-hidden rounded-[40px] bg-gradient-to-r from-slate-900 via-blue-950 to-violet-950 px-8 py-20 text-center text-white shadow-2xl md:px-20">
          <h2 className="mx-auto max-w-4xl text-4xl font-bold md:text-6xl">
            Turn Your Ideas Into Powerful Digital Solutions
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Build scalable websites, mobile apps, e-commerce platforms, and
            custom software solutions designed around your business goals.
          </p>

          <button className="mt-10 rounded-2xl bg-white px-8 py-4 font-semibold text-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
}