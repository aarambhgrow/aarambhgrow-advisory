export default function robots() {
  const baseUrl = "https://aarambhgrow.com";

  return {
    rules: {
      userAgent: "*",

      allow: "/",

      disallow: ["/api/", "/admin/"],
    },

    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
