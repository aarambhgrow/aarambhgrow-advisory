import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import LegalPage from "../components/legal/LegalPage";
import { privacyPolicy } from "../data/legal";
import { buildMetadata, ROBOTS_BASIC } from "../lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy | AarambhGrow Advisory",
  description:
    "Read the AarambhGrow Advisory Privacy Policy to learn how we collect, use, store and safeguard the information you share through our website and services.",
  path: "/privacy-policy",
  robots: ROBOTS_BASIC,
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <LegalPage {...privacyPolicy} />
      </main>

      <Footer />
    </>
  );
}
