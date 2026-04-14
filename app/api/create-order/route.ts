import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    console.log("🚀 API HIT");

    const body = await req.json();
    console.log("📦 BODY:", body);

    const { amount } = body;

    /* ================= VALIDATION ================= */

    const amountNum = Number(amount);

    if (!amountNum || isNaN(amountNum) || amountNum <= 0) {
      console.log("❌ Invalid amount:", amount);
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    console.log("💰 Final Amount (INR):", amountNum);

    /* ================= ENV CHECK ================= */

    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      console.log("❌ Razorpay keys missing");
      return NextResponse.json(
        { error: "Payment gateway not configured" },
        { status: 500 }
      );
    }

    console.log("🔑 Razorpay Key Loaded");

    /* ================= INIT ================= */

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    /* ================= CREATE ORDER ================= */

    const order = await razorpay.orders.create({
      amount: amountNum * 100, // ✅ paisa conversion (IMPORTANT)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    console.log("✅ ORDER CREATED:", order);

    /* ================= RESPONSE ================= */

    return NextResponse.json(
      {
        success: true,
        order,
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("❌ FULL ERROR:", error);
    console.error("❌ MESSAGE:", error?.message);
    console.error("❌ STACK:", error?.stack);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Server error",
      },
      { status: 500 }
    );
  }
}