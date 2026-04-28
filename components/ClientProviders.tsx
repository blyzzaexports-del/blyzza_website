"use client";

import { useState, useEffect, useCallback } from "react";
import { Cart } from "@/components/cart";
import Checkout from "@/components/checkout";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false); // ✅ FIX FLAG

  /* 🛒 ADD TO CART */
  const handleAddToCart = useCallback(
    (product: any, sizeIndex: number, quantity: number = 1) => {
      setCartItems((prev) => {
        const existingItem = prev.find(
          (item) =>
            item.product.id === product.id &&
            item.sizeIndex === sizeIndex
        );

        if (existingItem) {
          return prev.map((item) =>
            item.product.id === product.id &&
            item.sizeIndex === sizeIndex
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                }
              : item
          );
        }

        return [
          ...prev,
          {
            product,
            sizeIndex,
            quantity,
          },
        ];
      });

      setIsCartOpen(true);
    },
    []
  );

  /* 🔢 UPDATE QTY */
  const handleUpdateQuantity = useCallback(
    (productId: number, sizeIndex: number, delta: number) => {
      setCartItems((prev) =>
        prev
          .map((item) => {
            if (
              item.product.id === productId &&
              item.sizeIndex === sizeIndex
            ) {
              const newQuantity = item.quantity + delta;
              return newQuantity > 0
                ? { ...item, quantity: newQuantity }
                : item;
            }
            return item;
          })
          .filter((item) => item.quantity > 0)
      );
    },
    []
  );

  /* ❌ REMOVE ITEM */
  const handleRemoveItem = useCallback(
    (productId: number, sizeIndex: number) => {
      setCartItems((prev) =>
        prev.filter(
          (item) =>
            !(
              item.product.id === productId &&
              item.sizeIndex === sizeIndex
            )
        )
      );
    },
    []
  );

  /* 🎧 EVENTS */
  useEffect(() => {
    const add = (e: any) => {
      handleAddToCart(
        e.detail.product,
        e.detail.sizeIndex,
        e.detail.quantity || 1
      );
    };

    const openCart = () => setIsCartOpen(true);

    const openCheckout = () => {
      setIsCartOpen(false);
      setIsCheckoutOpen(true);
    };

    window.addEventListener("add-to-cart", add);
    window.addEventListener("open-cart", openCart);
    window.addEventListener("open-checkout", openCheckout);

    return () => {
      window.removeEventListener("add-to-cart", add);
      window.removeEventListener("open-cart", openCart);
      window.removeEventListener("open-checkout", openCheckout);
    };
  }, [handleAddToCart]);

  /* 🧠 LOAD CART (FIRST) */
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    setIsLoaded(true); // ✅ important
  }, []);

  /* 💾 SAVE CART (AFTER LOAD) */
  useEffect(() => {
    if (!isLoaded) return; // ❌ prevent overwrite

    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems, isLoaded]);

  /* 💰 TOTAL */
  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.product.prices[item.sizeIndex] * item.quantity,
    0
  );

  return (
    <>
      {children}

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        total={total}
      />
    </>
  );
}