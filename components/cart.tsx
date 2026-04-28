"use client";

import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { Product } from "./product-card";

export interface CartItem {
  product: Product;
  sizeIndex: number;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (
    productId: number,
    sizeIndex: number,
    delta: number
  ) => void;
  onRemoveItem: (productId: number, sizeIndex: number) => void;
  onCheckout: () => void;
}

export function Cart({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartProps) {
  const total = items.reduce(
    (sum, item) =>
      sum + item.product.prices[item.sizeIndex] * item.quantity,
    0
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50"
          onClick={onClose}
        />
      )}

      {/* Cart Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">

          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5" />
              <h2 className="text-xl font-semibold">
                Your Cart ({items.length})
              </h2>
            </div>
            <button onClick={onClose}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <p className="text-center text-gray-500">
                Your cart is empty
              </p>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.sizeIndex}-${Math.random()}`}
                    className="flex gap-4 border-b pb-4"
                  >
                    {/* IMAGE */}
                    <div className="relative w-20 h-20">
                      <Image
                        src={item.product.image?.[0] || "/fallback.jpg"}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>

                    {/* DETAILS */}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-sm font-medium">
                            {item.product.name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {item.product.sizes[item.sizeIndex]}
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            onRemoveItem(
                              item.product.id,
                              item.sizeIndex
                            )
                          }
                        >
                          <X className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>

                      {/* QUANTITY */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                item.sizeIndex,
                                -1
                              )
                            }
                            className="w-7 h-7 border flex items-center justify-center"
                          >
                            <Minus className="w-3 h-3" />
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                item.sizeIndex,
                                1
                              )
                            }
                            className="w-7 h-7 border flex items-center justify-center"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* PRICE */}
                        <span className="font-semibold">
                          ₹
                          {item.product.prices[item.sizeIndex] *
                            item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t">
              <div className="flex justify-between mb-4">
                <span>Subtotal</span>
                <span className="font-semibold">₹{total}</span>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-3 bg-black text-white"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
