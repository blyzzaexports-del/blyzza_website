import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";

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

    /* ================= MAIL ================= */

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 🔥 IMPORTANT: hardcode admin mail (no env issue)
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

      <p><b>Total:</b> ₹${orderData.total}</p>

      <h3>Items:</h3>
      <ul>${itemsHtml}</ul>

      <hr/>
      <p><b>Payment ID:</b> ${razorpay_payment_id}</p>
    `;

    await transporter.sendMail({
      from: `"Blyzza Store" <${process.env.EMAIL_USER}>`,
      to: ADMIN_MAIL, // 🔥 ONLY ADMIN
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