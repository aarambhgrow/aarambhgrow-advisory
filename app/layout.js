import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { SITE_URL } from "./data/site";

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

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "AarambhGrow Advisory – Company Registration, GST & Compliance Services",
    template: "%s | AarambhGrow Advisory",
  },

  description:
    "AarambhGrow Advisory provides company incorporation, MSME registration, GST registration, ITR filing, MCA compliance, DSC, Startup India DPIIT recognition, licences, ISO, trademark, ZED certification and 80IAC tax exemption services across India.",

  applicationName: "AarambhGrow Advisory",

  authors: [
    {
      name: "AarambhGrow Advisory",
    },
  ],

  creator: "AarambhGrow Advisory",
  publisher: "AarambhGrow Advisory",

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/images/favicon.ico",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "AarambhGrow Advisory",

    title: "AarambhGrow Advisory – Company Registration, GST & Compliance Services",

    description:
      "Business registration, GST, MSME, tax filing, MCA compliance, licences, certifications and startup recognition services for businesses across India.",

    url: "https://aarambhgrow.com",

    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AarambhGrow Advisory – Business Registration & Compliance Services",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "AarambhGrow Advisory – Company Registration, GST & Compliance Services",

    description: "Company registration, GST, MSME, tax filing, MCA compliance, licences, certifications and startup advisory services.",

    images: ["/images/og-image.jpg"],
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
