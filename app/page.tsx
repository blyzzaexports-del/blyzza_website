"use client";

import { useState, useCallback, useEffect } from "react";
import supabase from "@/lib/supabase";

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { FeaturedProducts } from "@/components/featured-products";
import { AllProducts } from "@/components/all-products";
import { Testimonials } from "@/components/testimonials";
import { TrustBadges } from "@/components/trust-badges";
import { About } from "@/components/about";
import { Cart, CartItem } from "@/components/cart";
import { Checkout } from "@/components/checkout";
import { Newsletter } from "@/components/newsletter";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

import { products } from "@/lib/products";
import { Product } from "@/components/product-card";

export default function Home() {

  /* ⭐ USER NAME STATE */

  const [userName, setUserName] =
    useState<string | null>(null);

  /* ⭐ GET USER NAME FROM SUPABASE */

  useEffect(() => {

  const fetchUserName = async () => {

    // ⭐ Get session first

    const { data: sessionData } =
      await supabase.auth.getSession();

    const user =
      sessionData.session?.user;

    if (!user) return;

    // ⭐ Get profile

    const { data: profile, error } =
      await supabase
        .from("profiles")
        .select("first_name")
        .eq("id", user.id)
        .single();

    if (profile) {

      console.log(
        "User Name:",
        profile.first_name
      );

      setUserName(
        profile.first_name
      );

    }

  };

  fetchUserName();

}, []);

  /* CART STATE */

  const [cartItems, setCartItems] =
    useState<CartItem[]>([]);

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  const [isCheckoutOpen, setIsCheckoutOpen] =
    useState(false);

  /* ADD TO CART */

  const handleAddToCart =
    useCallback(
      (
        product: Product,
        sizeIndex: number
      ) => {

        setCartItems((prev) => {

          const existingItem =
            prev.find(
              (item) =>
                item.product.id ===
                  product.id &&
                item.sizeIndex ===
                  sizeIndex
            );

          if (existingItem) {

            return prev.map(
              (item) =>
                item.product.id ===
                  product.id &&
                item.sizeIndex ===
                  sizeIndex
                  ? {
                      ...item,
                      quantity:
                        item.quantity + 1,
                    }
                  : item
            );

          }

          return [

            ...prev,

            {

              product,

              sizeIndex,

              quantity: 1,

            },

          ];

        });

        setIsCartOpen(true);

      },

      []
    );

  /* UPDATE QTY */

  const handleUpdateQuantity =
    useCallback(
      (
        productId: number,
        sizeIndex: number,
        delta: number
      ) => {

        setCartItems((prev) =>

          prev
            .map((item) => {

              if (

                item.product.id ===
                  productId &&
                item.sizeIndex ===
                  sizeIndex

              ) {

                const newQuantity =
                  item.quantity + delta;

                return newQuantity > 0
                  ? {
                      ...item,
                      quantity:
                        newQuantity,
                    }
                  : item;

              }

              return item;

            })

            .filter(
              (item) =>
                item.quantity > 0
            )

        );

      },

      []
    );

  /* REMOVE ITEM */

  const handleRemoveItem =
    useCallback(
      (
        productId: number,
        sizeIndex: number
      ) => {

        setCartItems((prev) =>

          prev.filter(

            (item) =>

              !(

                item.product.id ===
                  productId &&

                item.sizeIndex ===
                  sizeIndex

              )

          )

        );

      },

      []
    );

  /* CHECKOUT */

  const handleCheckout =
    useCallback(() => {

      setIsCartOpen(false);

      setIsCheckoutOpen(true);

    }, []);

  /* CART COUNT */

  const cartCount =
    cartItems.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );

  /* CART TOTAL */

  const cartTotal =
    cartItems.reduce(

      (sum, item) =>

        sum +

        item.product.prices[
          item.sizeIndex
        ] *

          item.quantity,

      0

    );

  return (

    <main className="min-h-screen">

      <Navbar
        cartCount={cartCount}
        onCartClick={() =>
          setIsCartOpen(true)
        }
      />

      {/* ⭐ WELCOME USER */}

      {userName && (

        <div className="px-6 py-4">

          <h2 className="text-xl font-semibold text-primary">

            Welcome {userName} 👋

          </h2>

        </div>

      )}

      <Hero />

      <FeaturedProducts
        products={products}
        onAddToCart={
          handleAddToCart
        }
      />

      <TrustBadges />

      <AllProducts
        products={products}
        onAddToCart={
          handleAddToCart
        }
      />

      <About />

      <Testimonials />

      <Newsletter />

      <Contact />

      <Footer />

      <WhatsAppButton />

      <Cart
        isOpen={isCartOpen}
        onClose={() =>
          setIsCartOpen(false)
        }
        items={cartItems}
        onUpdateQuantity={
          handleUpdateQuantity
        }
        onRemoveItem={
          handleRemoveItem
        }
        onCheckout={
          handleCheckout
        }
      />

      <Checkout
        isOpen={
          isCheckoutOpen
        }
        onClose={() =>
          setIsCheckoutOpen(false)
        }
        items={cartItems}
        total={cartTotal}
      />

    </main>

  );
}