import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { OG_IMAGE, ORGANIZATION_NAME, SITE_URL } from "./data/site";
import { ROBOTS_FULL } from "./lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const HOME_TITLE = "Business Registration, GST & Compliance Services India | AarambhGrow";

/*
  Site-wide defaults. No title template: every page title from the SEO spec
  already ends with the brand name.
*/
export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: HOME_TITLE,

  description:
    "AarambhGrow Advisory supports startups and MSMEs across India with company incorporation, GST, Udyam, ITR, ROC compliance, DPIIT, licences, certifications and trademarks.",

  applicationName: ORGANIZATION_NAME,
  authors: [{ name: ORGANIZATION_NAME }],
  creator: ORGANIZATION_NAME,
  publisher: ORGANIZATION_NAME,

  robots: ROBOTS_FULL,

  icons: {
    icon: "/images/favicon.ico",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: ORGANIZATION_NAME,
    title: HOME_TITLE,
    description:
      "Business registration, tax, compliance, licensing and certification support for startups and MSMEs across India.",
    url: `${SITE_URL}/`,
    images: [OG_IMAGE],
  },

  twitter: {
    card: "summary_large_image",
    title: "Business Registration & Compliance Services India | AarambhGrow",
    description:
      "Company incorporation, GST, Udyam, ROC compliance, DPIIT recognition, licences, certifications and trademark support across India.",
    images: [OG_IMAGE.url],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
