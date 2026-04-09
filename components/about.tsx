"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function About() {
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-28 bg-background"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                <video
                  src="/about/apply-cream.mp4"   
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-sage-light rounded-3xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blush rounded-full -z-10" />
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <span className="inline-block text-primary font-medium tracking-widest text-sm uppercase mb-4">
              Our Story
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Rooted in Nature, Crafted with Care
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                Blyzza is a natural cosmetic brand focused on providing pure,
                chemical-free skincare and haircare products. Our journey began
                with a simple belief: nature holds the key to true beauty.
              </p>
              <p>
                Our products are made using high-quality herbal ingredients that
                nourish, heal, and enhance your natural beauty. From the
                soothing properties of Aloe Vera to the rejuvenating power of
                Hibiscus, every ingredient is carefully selected for its
                benefits.
              </p>
              <p>
                We believe in simplicity, sustainability, and authenticity. Each
                product is handcrafted with love, ensuring you receive the purest
                form of natural care for your skin and hair.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-10 pt-10 border-t border-border">
              <div>
                <span className="font-serif text-3xl md:text-4xl font-bold text-primary">
                  50+
                </span>
                <p className="text-muted-foreground text-sm mt-1">
                  Natural Products
                </p>
              </div>
              <div>
                <span className="font-serif text-3xl md:text-4xl font-bold text-primary">
                  10K+
                </span>
                <p className="text-muted-foreground text-sm mt-1">
                  Happy Customers
                </p>
              </div>
              <div>
                <span className="font-serif text-3xl md:text-4xl font-bold text-primary">
                  100%
                </span>
                <p className="text-muted-foreground text-sm mt-1">
                  Pure Ingredients
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
