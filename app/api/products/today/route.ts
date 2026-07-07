import { NextResponse } from "next/server";
import { products } from "@/lib/products";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  try {
    // Get current product ID from Supabase
    const { data, error } = await supabaseAdmin
      .from("automation_settings")
      .select("current_product_id")
      .eq("id", 1)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Automation settings not found" },
        { status: 500 }
      );
    }

    const currentId = data.current_product_id;

    // Find the product
    const product = products.find((p) => p.id === currentId);

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Calculate next product ID (18 -> 1)
    const nextId = currentId >= 18 ? 1 : currentId + 1;

    // Update next product ID in Supabase
    const { error: updateError } = await supabaseAdmin
      .from("automation_settings")
      .update({
        current_product_id: nextId,
      })
      .eq("id", 1);

    if (updateError) {
      console.error(updateError);
    }

    // Return product data
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
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}