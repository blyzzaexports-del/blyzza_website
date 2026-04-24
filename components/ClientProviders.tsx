"use client";

import { useState, useEffect, useCallback } from "react";
import { Cart } from "@/components/cart";
import { Checkout } from "@/components/checkout";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  /* 🛒 STATE */
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  /* 🛒 ADD TO CART (MERGE SAME PRODUCT) */
  const handleAddToCart = useCallback(
    (product: any, sizeIndex: number) => {
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
                  quantity: item.quantity + 1,
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

      setIsCartOpen(true); // 👉 add pannina udane cart open
    },
    []
  );

  /* 🔢 UPDATE QUANTITY */
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

  /* 🎧 GLOBAL EVENTS */
  useEffect(() => {
    const add = (e: any) => {
      handleAddToCart(e.detail.product, e.detail.sizeIndex);
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

  /* 💰 TOTAL */
  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.product.prices[item.sizeIndex] * item.quantity,
    0
  );

  return (
    <>
      {children}

      {/* 🛒 CART */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity} // ✅ FIXED
        onRemoveItem={handleRemoveItem} // ✅ FIXED
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* ⚡ CHECKOUT */}
      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        total={total}
      />
    </>
  );
}