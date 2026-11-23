import { LegalPage, legalMetadata } from "@/components/LegalPage";

export const generateMetadata = () => legalMetadata("terms-and-conditions");
export default function Page() {
  return <LegalPage slug="terms-and-conditions" />;
}
