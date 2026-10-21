import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import LegalPage from "../components/legal/LegalPage";
import { termsOfService } from "../data/legal";
import { buildMetadata, ROBOTS_BASIC } from "../lib/seo";

export const metadata = buildMetadata({
  title: "Terms & Conditions | AarambhGrow Advisory",
  description:
    "Read the AarambhGrow Advisory Terms & Conditions covering our services, refunds and cancellations, liability, dispute resolution and governing law.",
  path: "/terms-of-service",
  robots: ROBOTS_BASIC,
});

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <LegalPage {...termsOfService} />
      </main>

      <Footer />
    </>
  );
}
