import { NextResponse } from "next/server";
import { products } from "@/lib/products";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    // Get current product ID
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

    const currentId = Number(data.current_product_id);

    // Find current product
    const product = products.find((p) => p.id === currentId);

    if (!product) {
      return NextResponse.json(
        { error: `Product ${currentId} not found` },
        { status: 404 }
      );
    }

    // Calculate next product
    const nextId = currentId >= 18 ? 1 : currentId + 1;

    // Save next product ID
    const { error: updateError } = await supabaseAdmin
      .from("automation_settings")
      .update({
        current_product_id: nextId,
      })
      .eq("id", 1);

    if (updateError) {
      console.error("Supabase Update Error:", updateError);
    }

    return NextResponse.json(
      {
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
      },
      {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (err) {
    console.error("API Error:", err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}