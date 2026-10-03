import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const productUrls = products.map((product) => ({
    url: `https://www.blyzza.com/product/${product.id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: "https://www.blyzza.com",
      lastModified: new Date(),
    },
    ...productUrls,
  ];
}