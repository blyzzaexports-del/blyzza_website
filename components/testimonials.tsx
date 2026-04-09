"use client";

import { useEffect, useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Skincare Enthusiast",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    rating: 5,
    text: "Blyzza products have completely transformed my skincare routine. The Aloe Vera Gel is my holy grail product - so pure and effective!",
  },
  {
    id: 2,
    name: "Ananya Reddy",
    role: "Beauty Blogger",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    rating: 5,
    text: "I&apos;ve tried countless natural skincare brands, but Blyzza stands out for its authenticity. The Hibiscus Powder has done wonders for my hair!",
  },
  {
    id: 3,
    name: "Meera Patel",
    role: "Wellness Coach",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    rating: 5,
    text: "As someone who values chemical-free products, Blyzza is a dream come true. The Goat Milk Soap leaves my skin so soft and nourished.",
  },
  {
    id: 4,
    name: "Kavya Nair",
    role: "Yoga Instructor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    rating: 5,
    text: "The Shea Butter from Blyzza is incredibly rich and pure. It&apos;s become an essential part of my daily self-care ritual.",
  },
];

export function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-sage-light/30"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block text-primary font-medium tracking-widest text-sm uppercase mb-4">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Real stories from people who have experienced the Blyzza difference.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div
          className={`max-w-4xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative">
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-lg border border-border/50">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Image */}
                <div className="flex-shrink-0">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-sage-light">
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  {/* Stars */}
                  <div className="flex justify-center md:justify-start gap-1 mb-4">
                    {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-accent text-accent"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-foreground text-lg md:text-xl mb-6 leading-relaxed">
                    &ldquo;{testimonials[currentIndex].text}&rdquo;
                  </p>

                  {/* Author */}
                  <div>
                    <h4 className="font-serif font-semibold text-foreground text-lg">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-200"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                      index === currentIndex ? "bg-primary" : "bg-border"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-200"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Grid View for larger screens */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6 mt-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-card rounded-2xl p-6 shadow-sm border border-border/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-md ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground/80 text-sm mb-4 line-clamp-4">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h5 className="font-medium text-foreground text-sm">
                    {testimonial.name}
                  </h5>
                  <p className="text-muted-foreground text-xs">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
