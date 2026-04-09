"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";

export default function MyOrders() {

  const [orders, setOrders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [cancelLoading,
    setCancelLoading] =
    useState<string | null>(null);

  // 🔹 Fetch Orders

  const fetchOrders =
    async () => {

      setLoading(true);

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {

        setLoading(false);
        return;

      }

      const { data, error } =
        await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: false,
          });

      if (error) {

        console.log(
          "Fetch error:",
          error
        );

      }

      if (data) {

        setOrders(data);

      }

      setLoading(false);

    };

  useEffect(() => {

    fetchOrders();

  }, []);

  // 🔥 CANCEL + REFUND FUNCTION

  const cancelOrder =
    async (order: any) => {

      const confirmCancel =
        confirm(
          "Are you sure you want to cancel this order?"
        );

      if (!confirmCancel) return;

      try {

        setCancelLoading(order.id);

        console.log(
          "Sending refund request:",
          order.id
        );

        // 🔥 SEND ONLY orderId
        const res =
          await fetch("/api/refund", {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              orderId: order.id
            }),
          });

        const data =
          await res.json();

        console.log(
          "Refund response:",
          data
        );

        if (data.success) {

          alert(
            "✅ Refund Initiated Successfully"
          );

          fetchOrders();

        } else {

          alert(
            "❌ Refund Failed: " +
            data.message
          );

        }

      } catch (error) {

        console.log(
          "Refund error:",
          error
        );

        alert(
          "❌ Something went wrong"
        );

      } finally {

        setCancelLoading(null);

      }

    };

  return (

    <div className="min-h-screen p-8 bg-gray-50">

      <h1 className="text-3xl font-bold mb-8">

        My Orders

      </h1>

      {loading && (

        <p>Loading orders...</p>

      )}

      {!loading &&
        orders.length === 0 && (

        <p>
          No orders found.
        </p>

      )}

      <div className="space-y-6">

        {orders.map((order) => (

          <div
            key={order.id}
            className="border rounded-xl p-6 shadow-sm bg-white"
          >

            {/* Order Info */}

            <div className="grid md:grid-cols-2 gap-4">

              <p>
                <b>Order ID:</b>{" "}
                {order.id}
              </p>

              <p>
                <b>Total:</b> ₹
                {order.total}
              </p>

              <p>
                <b>Status:</b>{" "}

                <span
                  className={`font-medium ${
                    order.status ===
                    "Cancelled"
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                >

                  {order.status}

                </span>

              </p>

              <p>
                <b>Date:</b>{" "}
                {new Date(
                  order.created_at
                ).toLocaleDateString()}
              </p>

              {/* Refund Status */}

              {order.refund_status && (

                <p>
                  <b>Refund:</b>{" "}
                  {order.refund_status}
                </p>

              )}

            </div>

            {/* Cancel Button */}

            {order.status !==
              "Cancelled" && (

              <button
                onClick={() =>
                  cancelOrder(order)
                }

                disabled={
                  cancelLoading ===
                  order.id
                }

                className="mt-5 px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50"
              >

                {cancelLoading ===
                order.id
                  ? "Processing..."
                  : "Cancel & Refund"}

              </button>

            )}

          </div>

        ))}

      </div>

    </div>

  );

}