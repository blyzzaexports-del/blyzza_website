"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/about/background.jpg"
          alt="Natural skincare ingredients"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 py-32">
        <div className="max-w-2xl">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <span className="inline-block text-primary font-medium tracking-widest text-sm uppercase mb-4">
              Natural Beauty
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6 text-balance">
              Glow Naturally with Blyzza
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
              Pure Herbal Skincare Products for Healthy Skin & Hair. Embrace the
              power of nature with our chemical-free formulations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#products"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                Shop Now
              </Link>
              <Link
                href="#shop"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-foreground/20 text-foreground font-medium rounded-full hover:border-primary hover:text-primary transition-all duration-300"
              >
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-foreground/30 rounded-full" />
        </div>
      </div>
    </section>
  );
}
