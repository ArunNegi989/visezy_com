import EmployeeHero from "@/components/employees/EmployeeHero";
import EmployeeBenefits from "@/components/employees/EmployeeBenefits";
import ApplicationForm from "@/components/employees/ApplicationForm";
import HiringProcess from "@/components/employees/HiringProcess";
import CTA from "@/components/common/CTA/CTA";

export default function EmployeesPage() {
  return (
    <>
      <EmployeeHero />
      <EmployeeBenefits />
      <ApplicationForm />
      <HiringProcess />
      <CTA />
    </>
  );
}