import { NextResponse } from "next/server";
import { products } from "@/lib/products";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    id: product.id,
    name: product.name,
    price: product.prices[0],
    image: `https://www.blyzza.com${product.image[0]}`,
    images: product.image.map(
      (img) => `https://www.blyzza.com${img}`
    ),
    description: product.description,
    benefits: product.benefits,
    howToUse: product.howToUse,
    ingredients: product.ingredients,
    category: product.category,
    productUrl: `https://www.blyzza.com/product/${product.id}`,
  });
}