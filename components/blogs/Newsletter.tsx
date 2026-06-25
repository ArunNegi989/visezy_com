export default function Newsletter() {
  return (
    <section className="pb-24">
      <div className="container">
        <div className="rounded-[36px] bg-gradient-to-r from-blue-600 to-violet-600 p-12 text-center text-white">
          <h2 className="text-4xl font-bold">
            Subscribe To Our Newsletter
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Get hiring insights, recruitment trends and staffing
            updates delivered directly to your inbox.
          </p>

          <div className="mx-auto mt-8 flex max-w-xl flex-col gap-4 sm:flex-row">
            <input
              placeholder="Enter your email"
              className="flex-1 rounded-2xl bg-white px-5 py-4 text-slate-900 outline-none"
            />

            <button className="rounded-2xl bg-slate-900 px-8 py-4 font-semibold text-white">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}