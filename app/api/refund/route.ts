// import Razorpay from "razorpay";
// import { NextResponse } from "next/server";
// import { createClient } from "@supabase/supabase-js";

// // Razorpay instance
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID!,
//   key_secret: process.env.RAZORPAY_KEY_SECRET!,
// });

// // Supabase
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// );

// export async function POST(req: Request) {

//   try {

//     const { orderId } =
//       await req.json();

//     console.log("Refund Request:", orderId);

//     // 🔹 Get payment_id + refund status
//     const { data: order, error } =
//       await supabase
//         .from("orders")
//         .select("payment_id, refund_status")
//         .eq("id", orderId)
//         .single();

//     if (error || !order) {

//       console.log("Order fetch error:", error);

//       return NextResponse.json({
//         success: false,
//         message: "Order not found",
//       });

//     }

//     const paymentId =
//       order.payment_id;

//     console.log("Payment ID:", paymentId);

//     // 🔹 Prevent double refund
//     if (
//       order.refund_status ===
//       "Refunded"
//     ) {

//       return NextResponse.json({
//         success: false,
//         message:
//           "Already refunded",
//       });

//     }

//     // 🔹 Fetch payment
//     const payment: any =
//       await razorpay
//         .payments
//         .fetch(paymentId);

//     console.log(
//       "Payment Status:",
//       payment.status
//     );

//     console.log(
//       "Payment Amount:",
//       payment.amount
//     );

//     if (
//       payment.status !==
//       "captured"
//     ) {

//       return NextResponse.json({
//         success: false,
//         message:
//           "Payment not captured",
//       });

//     }

//     // 🔥 FINAL FIX — Full refund without amount
//     console.log(
//       "Trying refund for:",
//       paymentId
//     );

//     const refund: any =
//       await razorpay
//         .payments
//         .refund(paymentId, {
//           speed: "normal",
//           notes: {
//             reason:
//               "Customer cancelled order",
//           },
//         });

//     console.log(
//       "Refund Success:",
//       refund
//     );

//     // 🔹 Update DB
//     await supabase
//       .from("orders")
//       .update({
//         status: "Cancelled",
//         refund_status:
//           "Refunded",
//         refund_id:
//           refund.id,
//       })
//       .eq("id", orderId);

//     return NextResponse.json({
//       success: true,
//       refundId:
//         refund.id,
//     });

//   } catch (error: any) {

//     console.log(
//       "==== FINAL REFUND ERROR ===="
//     );

//     console.log(
//       JSON.stringify(
//         error,
//         null,
//         2
//       )
//     );

//     return NextResponse.json({
//       success: false,
//       message:
//         error?.error?.description ||
//         error.message,
//     });

//   }

// }