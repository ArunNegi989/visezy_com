const companies = [
  "NovoTech",
  "EliteCore",
  "FutureFlow",
  "SkyBridge",
  "AgileWave",
];

export default function TrustedCompanies() {
  return (
    <section className="py-14">
      <div className="container">
        <p className="mb-10 text-center text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          Trusted by leading companies
        </p>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {companies.map((company) => (
            <div
              key={company}
              className="rounded-2xl border border-slate-200 bg-white px-6 py-5 text-center text-xl font-semibold text-slate-400 transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:text-blue-600 hover:shadow-xl"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}