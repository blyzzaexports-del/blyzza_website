"use client";

import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { FeaturedProducts } from "@/components/featured-products";
import { AllProducts } from "@/components/all-products";
import { Testimonials } from "@/components/testimonials";
import { TrustBadges } from "@/components/trust-badges";
import { About } from "@/components/about";
import { Newsletter } from "@/components/newsletter";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

import { products } from "@/lib/products";

export default function Home() {

  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserName = async () => {

      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;

      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name")
        .eq("id", user.id)
        .single();

      if (profile) {
        setUserName(profile.first_name);
      }
    };

    fetchUserName();
  }, []);

  return (
    <main className="min-h-screen">

      <Navbar
        cartCount={0}
        onCartClick={() => {
          window.dispatchEvent(new Event("open-cart"));
        }}
      />

      {userName && (
        <div className="px-6 py-4">
          <h2 className="text-xl font-semibold text-primary">
            Welcome {userName} 👋
          </h2>
        </div>
      )}

      <Hero />

      <FeaturedProducts products={products} />

      <TrustBadges />

      <AllProducts products={products} />

      <About />

      <Testimonials />

      <Newsletter />

      <Contact />

      <Footer />

      <WhatsAppButton />

    </main>
  );
}