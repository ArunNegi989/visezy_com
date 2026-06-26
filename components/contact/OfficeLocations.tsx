import SectionHeading from "@/components/shared/SectionHeading";
import { Clock3, MapPin } from "lucide-react";

export default function OfficeLocations() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="container">
        <SectionHeading
          badge="Office Location"
          title="Visit Our Office"
          description="Meet our team and discuss your hiring goals."
        />

        <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
          <div className="rounded-[32px] bg-white p-8 shadow-md">
            <MapPin className="text-blue-600" />

            <h3 className="mt-4 text-2xl font-bold">
              Dehradun Office
            </h3>

            <p className="mt-4 text-slate-600">
              Nehru Colony, Dehradun,
              Uttarakhand, India.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <Clock3 size={20} />
              Mon - Sat : 9 AM - 5 PM
            </div>
          </div>

          <div className="overflow-hidden rounded-[32px] shadow-lg">
            <iframe
              src="YOUR_MAP_LINK"
              className="h-[500px] w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}