import { LegalPage, legalMetadata } from "@/components/LegalPage";

export const generateMetadata = () => legalMetadata("privacy-policy");
export default function Page() {
  return <LegalPage slug="privacy-policy" />;
}
