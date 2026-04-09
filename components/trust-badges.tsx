"use client";

import { useEffect, useRef, useState } from "react";
import { Leaf, Shield, Heart, Sparkles } from "lucide-react";

const badges = [
  {
    icon: Leaf,
    title: "100% Natural",
    description: "Pure herbal ingredients from nature",
  },
  {
    icon: Shield,
    title: "Chemical-Free",
    description: "No harmful chemicals or additives",
  },
  {
    icon: Heart,
    title: "Handmade Products",
    description: "Crafted with love and care",
  },
  {
    icon: Sparkles,
    title: "Cruelty-Free",
    description: "Never tested on animals",
  },
];

export function TrustBadges() {
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
    <section ref={sectionRef} className="py-16 md:py-24 bg-primary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {badges.map((badge, index) => (
            <div
              key={badge.title}
              className={`text-center transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-foreground/10 mb-4">
                <badge.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-serif font-semibold text-primary-foreground text-lg mb-2">
                {badge.title}
              </h3>
              <p className="text-primary-foreground/70 text-sm">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
