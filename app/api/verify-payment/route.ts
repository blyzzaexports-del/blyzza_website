import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { supabaseAdmin } from "@/lib/supabase-admin"; // ✅ ADD THIS

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
    } = body;

    /* ================= CHECK ================= */
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false },
        { status: 400 }
      );
    }

    /* ================= VERIFY ================= */
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(sign)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return NextResponse.json(
        { success: false },
        { status: 400 }
      );
    }

    console.log("✅ PAYMENT VERIFIED");

    /* ================= SAVE TO DB ================= */

    const { error } = await supabaseAdmin.from("orders").insert([
      {
        first_name: orderData.first_name,
        email: orderData.email,
        phone: orderData.phone,
        address: orderData.address,
        pincode: orderData.pincode, // ✅ THIS IS WHAT YOU ASKED
        total: orderData.total,
        items: orderData.items,

        razorpay_order_id,
        razorpay_payment_id,
      },
    ]);

    if (error) {
      console.error("❌ DB ERROR:", error);
      return NextResponse.json({ success: false });
    }

    console.log("💾 ORDER SAVED IN DB");

    /* ================= MAIL ================= */

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const ADMIN_MAIL = "blyzzaexports@gmail.com";

    const itemsHtml = orderData.items
      .map(
        (item: any) =>
          `<li>${item.product.name} x ${item.quantity}</li>`
      )
      .join("");

    const html = `
      <h2>🛒 New Order - Blyzza</h2>

      <p><b>Name:</b> ${orderData.first_name}</p>
      <p><b>Phone:</b> ${orderData.phone}</p>
      <p><b>Address:</b> ${orderData.address}</p>
      <p><b>Pincode:</b> ${orderData.pincode}</p> <!-- ✅ ADDED -->

      <p><b>Total:</b> ₹${orderData.total}</p>

      <h3>Items:</h3>
      <ul>${itemsHtml}</ul>

      <hr/>
      <p><b>Payment ID:</b> ${razorpay_payment_id}</p>
    `;

    await transporter.sendMail({
      from: `"Blyzza Store" <${process.env.EMAIL_USER}>`,
      to: ADMIN_MAIL,
      subject: "🧾 New Order Received",
      html,
    });

    console.log("📧 MAIL SENT TO ADMIN");

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("❌ ERROR:", err);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}