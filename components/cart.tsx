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
  onUpdateQuantity: (productId: number, sizeIndex: number, delta: number) => void;
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
    (sum, item) => sum + item.product.prices[item.sizeIndex] * item.quantity,
    0
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-50 animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Cart Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-card z-50 shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <h2 className="font-serif text-xl font-semibold text-foreground">
                Your Cart
              </h2>
              <span className="text-muted-foreground text-sm">
                ({items.length} items)
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full transition-colors duration-200"
              aria-label="Close cart"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto hide-scrollbar p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground text-lg mb-2">
                  Your cart is empty
                </p>
                <p className="text-muted-foreground/70 text-sm">
                  Add some products to get started
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.sizeIndex}`}
                    className="flex gap-4 pb-6 border-b border-border last:border-0"
                  >
                    {/* Image */}
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-foreground text-sm">
                            {item.product.name}
                          </h3>
                          <p className="text-muted-foreground text-xs mt-0.5">
                            {item.product.sizes[item.sizeIndex]}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            onRemoveItem(item.product.id, item.sizeIndex)
                          }
                          className="p-1 hover:bg-muted rounded-full transition-colors duration-200"
                          aria-label="Remove item"
                        >
                          <X className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                item.sizeIndex,
                                -1
                              )
                            }
                            className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors duration-200"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-foreground font-medium text-sm w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                item.sizeIndex,
                                1
                              )
                            }
                            className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors duration-200"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-semibold text-primary">
                          ₹{item.product.prices[item.sizeIndex] * item.quantity}
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
            <div className="p-6 border-t border-border bg-muted/30">
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-serif font-semibold text-foreground text-xl">
                  ₹{total}
                </span>
              </div>
              <p className="text-muted-foreground text-xs mb-4">
                Shipping and taxes calculated at checkout
              </p>
              <button
                onClick={onCheckout}
                className="w-full py-4 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors duration-200"
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
