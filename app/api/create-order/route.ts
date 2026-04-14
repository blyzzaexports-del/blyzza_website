import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    console.log("🚀 API HIT");

    const body = await req.json();
    console.log("📦 BODY:", body);

    const { amount } = body;

    if (!amount) {
      console.log("❌ Amount missing");
      return NextResponse.json({ error: "Amount missing" }, { status: 400 });
    }

    console.log("💰 Amount:", amount);

    console.log("🔑 KEY:", process.env.RAZORPAY_KEY_ID);
    console.log("🔐 SECRET:", process.env.RAZORPAY_KEY_SECRET);

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const order = await razorpay.orders.create({
      amount: Number(amount) * 100,
      currency: "INR",
    });

    console.log("✅ ORDER CREATED:", order);

    return NextResponse.json(order);

  } catch (error: any) {
    console.error("❌ FULL ERROR:", error);
    console.error("❌ MESSAGE:", error?.message);
    console.error("❌ STACK:", error?.stack);

    return NextResponse.json(
      { error: error?.message || "Server error" },
      { status: 500 }
    );
  }
}