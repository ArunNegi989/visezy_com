import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeaturedPost() {
  return (
    <section className="pb-24">
      <div className="container">
        <div className="group overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
          <div className="grid lg:grid-cols-2">
            <div className="relative h-[350px] lg:h-full">
              <Image
                fill
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200"
                alt=""
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-col justify-center p-10">
              <span className="w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
                Featured
              </span>

              <h2 className="mt-5 text-4xl font-bold text-slate-900">
                How AI Is Transforming Recruitment In 2026
              </h2>

              <p className="mt-5 text-slate-600">
                Discover how intelligent automation is reducing hiring
                time and improving candidate quality.
              </p>

              <Link
                href="/blogs/ai-recruitment"
                className="mt-8 inline-flex items-center gap-2 font-semibold text-blue-600"
              >
                Read Article
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}