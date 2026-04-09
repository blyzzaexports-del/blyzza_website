"use client";

import { useEffect, useRef, useState } from "react";
import { ProductCard, Product } from "./product-card";

interface FeaturedProductsProps {
  products: Product[];
  onAddToCart: (product: Product, sizeIndex: number) => void;
}

export function FeaturedProducts({ products, onAddToCart }: FeaturedProductsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const featuredProducts = products.slice(0, 6);

  return (
    <section
      id="shop"
      ref={sectionRef}
      className="py-20 md:py-28 bg-cream"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block text-primary font-medium tracking-widest text-sm uppercase mb-4">
            Bestsellers
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Featured Products
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover our most loved herbal skincare essentials, crafted with pure
            natural ingredients.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                featured
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
