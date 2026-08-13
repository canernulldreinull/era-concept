import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/cart",
          "/checkout",
          "/order-success",
          "/payment/",
        ],
      },
    ],
    sitemap: "https://eraconcept.com.tr/sitemap.xml",
    host: "https://eraconcept.com.tr",
  };
}