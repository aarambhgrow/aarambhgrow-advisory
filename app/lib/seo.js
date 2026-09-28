import { OG_IMAGE, ORGANIZATION_NAME, SITE_URL } from "../data/site";

/* Robots presets used by the SEO spec. */
export const ROBOTS_FULL = {
  index: true,
  follow: true,
  "max-snippet": -1,
  "max-image-preview": "large",
  "max-video-preview": -1,
};

export const ROBOTS_BASIC = {
  index: true,
  follow: true,
  "max-image-preview": "large",
};

/*
  Builds page metadata. Next.js replaces (not merges) openGraph/twitter from
  the root layout, so every page sets the full set here.
*/
export function buildMetadata({
  title,
  description,
  path,
  robots = ROBOTS_FULL,
  ogTitle = title,
  ogDescription = description,
  twitterTitle = ogTitle,
  twitterDescription = ogDescription,
}) {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    robots,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: ORGANIZATION_NAME,
      title: ogTitle,
      description: ogDescription,
      url,
      locale: "en_IN",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
      images: [OG_IMAGE.url],
    },
  };
}
