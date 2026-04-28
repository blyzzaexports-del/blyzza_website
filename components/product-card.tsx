"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export interface Product {
  id: number;
  name: string;
  sizes: string[];
  prices: number[];
  image: string[];
  category: string;
  description?: string;
  benefits?: string;
  howToUse?: string;
  ingredients?: string;
}

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({
  product,
  featured = false,
}: ProductCardProps) {

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!product || !product.sizes || !product.prices) {
    console.error("❌ Invalid product data:", product);
    return null;
  }

  const safeSizeIndex =
    selectedSizeIndex < product.sizes.length
      ? selectedSizeIndex
      : 0;

  const price = product.prices[safeSizeIndex];

  // ✅ ADD TO CART FUNCTION (EVENT BASED)
  const handleAdd = () => {
    window.dispatchEvent(
      new CustomEvent("add-to-cart", {
        detail: {
          product,
          sizeIndex: safeSizeIndex,
          quantity: 1,
        },
      })
    );
  };

  return (
    <div
      className={`product-card group relative bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 ${
        featured ? "col-span-1" : ""
      }`}
    >

      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden bg-sage-light/30">
        <Image
          src={product.image?.[0] || "/fallback.jpg"}
          alt={product.name}
          width={500}
          height={500}
          className="w-full object-cover"
        />

        {/* HOVER */}
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition duration-300">

          <Link
            href={`/product/${product.id}`}
            className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium"
          >
            View Benefits
          </Link>

          <button
            onClick={handleAdd}
            className="bg-primary text-white px-4 py-2 rounded-full text-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>

        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">

        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          {product.category}
        </span>

        <h3 className="font-serif text-lg font-semibold text-foreground mt-1 mb-2">
          {product.name}
        </h3>

        {/* SIZES */}
        <div className="flex flex-wrap gap-2 mb-3">
          {product.sizes.map((size, index) => (
            <button
              key={size}
              onClick={() => setSelectedSizeIndex(index)}
              className={`text-xs px-3 py-1 rounded-full border transition ${
                safeSizeIndex === index
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* PRICE + ADD */}
        <div className="flex items-center justify-between">

          <span className="text-primary font-semibold text-lg">
            ₹{price}
          </span>

          <button
            onClick={handleAdd}
            className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition"
          >
            <Plus className="w-5 h-5" />
          </button>

        </div>
      </div>
    </div>
  );
}