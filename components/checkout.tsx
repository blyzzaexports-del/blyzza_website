"use client";

import { useState } from "react";

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

export function Checkout({
  isOpen,
  onClose,
  total,
  items,
}: CheckoutProps) {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  /* ================= INPUT ================= */

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= LOAD RAZORPAY ================= */

  const loadRazorpay = () => {
    return new Promise((resolve) => {

      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      script.onload = () => {
        console.log("✅ Razorpay loaded");
        resolve(true);
      };

      script.onerror = () => {
        console.error("❌ Razorpay load failed");
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address) {
      alert("Fill all required fields");
      return;
    }

    setLoading(true);

    try {

      /* LOAD SCRIPT */
      const loaded = await loadRazorpay();

      if (!loaded) {
        alert("Razorpay SDK failed");
        setLoading(false);
        return;
      }

      /* CREATE ORDER */
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: total }),
      });

      const order = await res.json();

      console.log("🧾 Razorpay Order:", order);

      /* RAZORPAY OPTIONS */
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        order_id: order.id,

        name: "Blyzza",
        description: "Order Payment",

        handler: async function (response: any) {

          console.log("🔥 PAYMENT SUCCESS");
          console.log("ORDER ID:", response.razorpay_order_id);
          console.log("PAYMENT ID:", response.razorpay_payment_id);
          console.log("SIGNATURE:", response.razorpay_signature);
          console.log("FORM DATA:", formData);
          console.log("ITEMS:", items);

          try {

            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderData: {
                  first_name: formData.name,
                  last_name: "",
                  email: formData.email,
                  phone: formData.phone,
                  address: formData.address,
                  total,
                  items,
                },
              }),
            });

            const verifyData = await verifyRes.json();

            console.log("VERIFY RESPONSE:", verifyData);

            if (!verifyData.success) {
              alert("Payment verification failed");
              return;
            }

            console.log("🎉 Order Completed");
            setOrderPlaced(true);

          } catch (err) {
            console.error("VERIFY ERROR:", err);
            alert("Verification error");
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

      rzp.on("payment.failed", function (response: any) {
        console.error("❌ PAYMENT FAILED:", response.error);
        alert("Payment failed");
      });

      rzp.open();

    } catch (err) {
      console.error("PAYMENT ERROR:", err);
      alert("Payment failed");
    }

    setLoading(false);
  };

  /* ================= SUCCESS UI ================= */

  if (orderPlaced) {
    return (
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
    );
  }

  if (!isOpen) return null;

  /* ================= UI ================= */

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">

      <div className="bg-white p-6 rounded-xl w-full max-w-md">

        <h2 className="text-xl font-bold mb-4">Checkout</h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input name="name" placeholder="Name" onChange={handleChange} className="w-full border p-2" required />

          <input name="email" placeholder="Email" onChange={handleChange} className="w-full border p-2" />

          <input name="phone" placeholder="Phone" onChange={handleChange} className="w-full border p-2" required />

          <textarea name="address" placeholder="Address" onChange={handleChange} className="w-full border p-2" required />

          <div className="font-bold">Total: ₹{total}</div>

          <button type="submit" disabled={loading} className="w-full bg-black text-white py-2 rounded">
            {loading ? "Processing..." : "Pay Now"}
          </button>

        </form>

        <button onClick={onClose} className="mt-3 text-red-500">
          Cancel
        </button>

      </div>

    </div>
  );
}