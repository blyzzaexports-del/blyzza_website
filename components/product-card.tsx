"use client";

import Image from "next/image";
import { Plus } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  sizes: string[];
  prices: number[];
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, sizeIndex: number) => void;
  featured?: boolean;
}

export function ProductCard({ product, onAddToCart, featured = false }: ProductCardProps) {
  return (
    <div
      className={`product-card group bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 ${
        featured ? "col-span-1" : ""
      }`}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-sage-light/30">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover product-image"
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onAddToCart(product, 0)}
            className="bg-card text-foreground px-6 py-3 rounded-full font-medium shadow-lg hover:bg-primary hover:text-primary-foreground transition-colors duration-200 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          {product.category}
        </span>
        <h3 className="font-serif text-lg font-semibold text-foreground mt-1 mb-2">
          {product.name}
        </h3>
        
        {/* Sizes */}
        <div className="flex flex-wrap gap-2 mb-3">
          {product.sizes.map((size, index) => (
            <span
              key={size}
              className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
            >
              {size}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-primary font-semibold text-lg">
            ₹{product.prices[0]}
            {product.prices.length > 1 && (
              <span className="text-muted-foreground text-sm font-normal">
                {" "}onwards
              </span>
            )}
          </span>
          <button
            onClick={() => onAddToCart(product, 0)}
            className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
