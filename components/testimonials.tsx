"use client";

import { useEffect, useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    type: "text",
    name: "Priya Sharma",
    role: "Skincare Enthusiast",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    rating: 5,
    text: "Blyzza products have completely transformed my skincare routine.",
  },
  {
    id: 2,
    type: "text",
    name: "Ananya Reddy",
    role: "Beauty Blogger",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    rating: 5,
    text: "Blyzza stands out for its authenticity. Loved it!",
  },

  // 🎬 VIDEO 1
  {
    id: 3,
    type: "video",
    video: "/videos/review.mp4",
  },

  // 🎬 VIDEO 2
  {
    id: 4,
    type: "video",
    video: "/videos/review1.mp4",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const current = testimonials[currentIndex];

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Testimonials</h2>
        </div>

        {/* CARD */}
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">

          {current.type === "text" ? (
            <div className="text-center">

              <div className="w-24 h-24 mx-auto mb-4 relative rounded-full overflow-hidden">
                <Image src={current.image} alt="" fill className="object-cover" />
              </div>

              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="mb-4">“{current.text}”</p>
              <h4 className="font-semibold">{current.name}</h4>
              <p className="text-sm text-gray-500">{current.role}</p>

            </div>
          ) : (
            // 🎬 VIDEO SECTION (FIXED)
            <div className="flex justify-center">
              <div className="h-[520px] w-[300px] bg-black rounded-2xl overflow-hidden">

                <video
                  key={current.video} // ✅ IMPORTANT FIX
                  className="h-full w-full object-cover"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={current.video} type="video/mp4" />
                </video>

              </div>
            </div>
          )}

        </div>

        {/* NAVIGATION */}
        <div className="flex justify-center items-center gap-4 mt-8">

          {/* LEFT */}
          <button
            onClick={prevTestimonial}
            className="w-10 h-10 rounded-full border flex items-center justify-center"
          >
            <ChevronLeft />
          </button>

          {/* DOTS */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full ${
                  index === currentIndex ? "bg-black" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* RIGHT */}
          <button
            onClick={nextTestimonial}
            className="w-10 h-10 rounded-full border flex items-center justify-center"
          >
            <ChevronRight />
          </button>

        </div>

      </div>
    </section>
  );
}