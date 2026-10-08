import type { Metadata } from "next";
import { products } from "@/lib/products";
import ProductPageClient from "@/components/ProductPageClient";

type ProductPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const productId = Number(params.id);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return {
      title: "Product Not Found | Blyzza",
      description: "The requested Blyzza product could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const productDescription =
    product.description ||
    `Shop ${product.name} from Blyzza. Discover premium natural skincare and wellness products made with traditional care.`;

  return {
    title: `${product.name} | Blyzza`,
    description: productDescription.slice(0, 160),

    alternates: {
      canonical: `/product/${product.id}`,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title: `${product.name} | Blyzza`,
      description: productDescription.slice(0, 160),
      url: `https://www.blyzza.com/product/${product.id}`,
      siteName: "Blyzza",
      type: "website",
      images:
        product.image && product.image.length > 0
          ? [
              {
                url: product.image[0],
                width: 600,
                height: 600,
                alt: product.name,
              },
            ]
          : [],
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const productId = Number(params.id);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-10">
        <p>Product not found</p>
      </div>
    );
  }

  return <ProductPageClient product={product} />;
}