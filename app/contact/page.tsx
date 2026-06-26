import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import OfficeLocations from "@/components/contact/OfficeLocations";
import CTA from "@/components/common/CTA/CTA";

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <OfficeLocations />
      <CTA />
    </>
  );
}