import { LegalPage, legalMetadata } from "@/components/LegalPage";

export const generateMetadata = () => legalMetadata("support-policy");
export default function Page() {
  return <LegalPage slug="support-policy" />;
}
