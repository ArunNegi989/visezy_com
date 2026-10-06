import dynamic from "next/dynamic";

import Hero from "@/components/home/Hero/Hero";
import RecruitmentTech from "@/components/home/RecruitmentTech/RecruitmentTech";
import Services from "@/components/home/Services/Services";
import TrustedCompanies from "@/components/home/TrustedCompanies/TrustedCompanies";

import type { Metadata } from "next";


const Testimonials = dynamic(
  () => import("@/components/home/Testimonials/Testimonials")
);

const FAQ = dynamic(
  () => import("@/components/home/FAQ/FAQ")
);

const LatestArticles = dynamic(
  () => import("@/components/home/LatestArticles/LatestArticles")
);

const EmployerBenefits = dynamic(
  () => import("@/components/home/EmployerBenefits/Employerbenefits")
);

const CTA = dynamic(
  () => import("@/components/common/CTA/CTA")
);

export const metadata: Metadata = {
  title: "Visezy",
  description: "IT Consulting",
};

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