"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { Toast } from "@/components/Toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  items: any[];
}

export default function Checkout({
  isOpen,
  onClose,
  total,
  items,
}: CheckoutProps) {
  const DELIVERY_CHARGE = total >= 50 ? 50 : 0;
  const finalTotal = total + DELIVERY_CHARGE;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  /* ✅ TOAST STATE */
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  /* ✅ SHOW TOAST */
  const showToast = (
    message: string,
    type: "success" | "error"
  ) => {
    setToast({ message, type });
  };

  /* 🎉 CONFETTI */
  const fireConfetti = () => {
    const end = Date.now() + 2000;

    (function frame() {
      confetti({
        particleCount: 6,
        spread: 70,
        origin: { y: 0.6 },
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  /* INPUT */
  const handleChange = (e: any) => {
    let value = e.target.value;

    // ✅ PINCODE NUMBERS ONLY
    if (e.target.name === "pincode") {
      value = value.replace(/\D/g, "").slice(0, 6);
    }

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  /* 🇮🇳 INDIA PINCODE VALIDATION */
  const isIndianPincode = (pincode: string) => {
    return /^[1-9][0-9]{5}$/.test(pincode);
  };

  /* LOAD RAZORPAY */
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");

      script.src =
        "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  /* SUBMIT */
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.pincode
    ) {
      showToast("Fill all required fields", "error");
      return;
    }

    // ✅ INDIA ONLY
    if (!isIndianPincode(formData.pincode)) {
      showToast(
        "Available only in India 🇮🇳",
        "error"
      );
      return;
    }

    setLoading(true);

    try {
      const loaded = await loadRazorpay();

      if (!loaded) {
        showToast("Razorpay load failed", "error");
        setLoading(false);
        return;
      }

      /* CREATE ORDER */
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          amount: Number(finalTotal),
        }),
      });

      const data = await res.json();

      if (!data.success) {
        showToast("Order creation failed", "error");
        setLoading(false);
        return;
      }

      const order = data.order;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        order_id: order.id,

        name: "Blyzza",
        description: "Order Payment",

        handler: async function (response: any) {
          const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
          } = response;

          if (!razorpay_payment_id) {
            showToast("Payment failed", "error");
            return;
          }

          try {
            /* GET USER */
            const user = JSON.parse(
              localStorage.getItem("user") || "null"
            );

            /* VERIFY + SAVE ORDER */
            const verifyRes = await fetch(
              "/api/verify-payment",
              {
                method: "POST",

                headers: {
                  "Content-Type": "application/json",
                },

                body: JSON.stringify({
                  razorpay_order_id,
                  razorpay_payment_id,
                  razorpay_signature,

                  orderData: {
                    user_id: user?.id || null,

                    first_name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    pincode: formData.pincode,
                    total: finalTotal,
                    items,
                  },
                }),
              }
            );

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              fireConfetti();

              setOrderPlaced(true);

              // ✅ CLEAR CART
              localStorage.removeItem("cart");

              showToast(
                "Payment successful 🎉",
                "success"
              );
            } else {
              showToast(
                "Payment verification failed",
                "error"
              );
            }
          } catch (err) {
            console.error(err);

            showToast("Verification error", "error");
          }
        },

        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },

        theme: {
          color: "#000000",
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", () => {
        showToast("Payment failed", "error");
      });

      rzp.open();
    } catch (err) {
      console.error(err);

      showToast("Payment error", "error");
    }

    setLoading(false);
  };

  /* SUCCESS UI */
  if (orderPlaced) {
    return (
      <>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              🎉 Order Placed Successfully!
            </h2>

            <button
              onClick={() => {
                setOrderPlaced(false);
                window.location.href = "/";
              }}
              className="bg-black text-white px-6 py-2 rounded"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </>
    );
  }

  if (!isOpen) return null;

  return (
    <>
      {/* ✅ TOAST */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
        <div className="bg-white p-6 rounded-xl w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">
            Checkout
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-3"
          >
            <input
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="w-full border p-2"
              required
            />

            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full border p-2"
            />

            <input
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              className="w-full border p-2"
              required
            />

            <textarea
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className="w-full border p-2"
              required
            />

            <input
              name="pincode"
              placeholder="Indian Pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full border p-2"
              maxLength={6}
              required
            />

            <div className="text-sm">
              Subtotal: ₹{total}
            </div>

            <div className="text-sm">
              Delivery: ₹{DELIVERY_CHARGE}
            </div>

            <div className="font-bold">
              Total: ₹{finalTotal}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded"
            >
              {loading
                ? "Processing..."
                : "Pay Now"}
            </button>
          </form>

          <button
            onClick={onClose}
            className="mt-3 text-red-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}