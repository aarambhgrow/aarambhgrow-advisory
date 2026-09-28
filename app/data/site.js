/* Canonical origin used for metadata, JSON-LD and the sitemap. */
export const SITE_URL = "https://aarambhgrow.com";

export const ORGANIZATION_NAME = "AarambhGrow Advisory";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export const TELEPHONE = "+91-9998715799";

export const OG_IMAGE = {
  url: `${SITE_URL}/images/og-image.jpg`,
  width: 1200,
  height: 630,
  alt: ORGANIZATION_NAME,
};

export const ADDRESS = {
  streetAddress: "Silver Radiance 4, 813, Sarkhej - Gandhinagar Hwy, Gota",
  addressLocality: "Ahmedabad",
  addressRegion: "Gujarat",
  postalCode: "382470",
  addressCountry: "IN",
};

/* Single-line form for visible text and map links. */
export const ADDRESS_LINE = `${ADDRESS.streetAddress}, ${ADDRESS.addressLocality}, ${ADDRESS.addressRegion} ${ADDRESS.postalCode}`;

export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS_LINE)}`;

export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS_LINE)}&output=embed`;
