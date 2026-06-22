import CTA from "@/components/common/CTA/CTA";
import EmployerBenefits from "@/components/home/EmployerBenefits/Employerbenefits";
import FAQ from "@/components/home/FAQ/FAQ";
import Hero from "@/components/home/Hero/Hero";
import LatestArticles from "@/components/home/LatestArticles/LatestArticles";
import RecruitmentTech from "@/components/home/RecruitmentTech/RecruitmentTech";
import Services from "@/components/home/Services/Services";
import Testimonials from "@/components/home/Testimonials/Testimonials";
import TrustedCompanies from "@/components/home/TrustedCompanies/TrustedCompanies";


export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedCompanies />
      <Services />
      <EmployerBenefits />
      <RecruitmentTech />
      <Testimonials />
      <FAQ />
      <LatestArticles />
      <CTA />
    </>
  );
}