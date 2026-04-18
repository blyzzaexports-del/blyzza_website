"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

export function Newsletter() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
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

  // 🔥 UPDATED FUNCTION
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {

        setIsSubscribed(true);
        setEmail("");

        setTimeout(() => {
          setIsSubscribed(false);
        }, 3000);

      }

    } catch (error) {

      console.error("Subscribe Error:", error);

    }
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-blush/30">
      <div className="container mx-auto px-4 md:px-6">

        <div
          className={`max-w-2xl mx-auto text-center transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >

          <span className="inline-block text-primary font-medium tracking-widest text-sm uppercase mb-4">
            Stay Connected
          </span>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Stay Updated with Blyzza
          </h2>

          <p className="text-muted-foreground text-lg mb-8">
            Subscribe to our newsletter for exclusive offers, skincare tips, and
            new product launches.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >

            <div className="flex-1 relative">

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                required
                className="w-full px-6 py-4 bg-card border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
              />

            </div>

            <button
              type="submit"
              className="px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg"
            >

              <span>Subscribe</span>

              <Send className="w-4 h-4" />

            </button>

          </form>

          {isSubscribed && (

            <p className="mt-4 text-primary font-medium animate-fade-in">
              ✅ Thank you for subscribing!
            </p>

          )}

          <p className="text-muted-foreground/70 text-sm mt-4">
            No spam, unsubscribe anytime.
          </p>

        </div>

      </div>
    </section>
  );
}