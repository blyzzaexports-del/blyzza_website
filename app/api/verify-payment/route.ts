import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

/* ================= SUPABASE ================= */

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/* ================= API ================= */

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
    } = body;

    /* ================= VALIDATION ================= */

    if (!orderData) {
      return NextResponse.json(
        { success: false, message: "Order data missing" },
        { status: 400 }
      );
    }

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        { success: false, message: "Payment details missing" },
        { status: 400 }
      );
    }

    /* ================= VERIFY SIGNATURE ================= */

    const sign =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Payment verification failed" },
        { status: 400 }
      );
    }

    console.log("✅ Payment verified");

    /* ================= EXTRACT ORDER ================= */

    const {
      first_name,
      last_name,
      email,
      phone,
      address,
      total,
      items,
    } = orderData;

    /* ================= SAVE ORDER ================= */

    const { error } = await supabase.from("orders").insert({
      first_name,
      last_name: last_name ?? "",
      email,
      phone,
      address,
      total,
      items,
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      status: "Placed",
      refund_status: "Not Requested",
    });

    if (error) {
      console.error("❌ DB Insert Error:", error);

      return NextResponse.json(
        { success: false, message: "Order save failed" },
        { status: 500 }
      );
    }

    console.log("✅ Order saved");

    /* ================= FORMAT ITEMS ================= */

    const formattedItems = items
      ?.map((item: any) => {
        const product = item.product;
        const size = product.sizes[item.sizeIndex];
        const price = product.prices[item.sizeIndex];

        return `
Product: ${product.name}
Size: ${size}
Qty: ${item.quantity}
Price: ₹${price}
`;
      })
      .join("\n");

    /* ================= EMAIL ================= */

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "🛒 New Order Received",
        text: `
New Order

Name: ${first_name}
Email: ${email}
Phone: ${phone}
Address: ${address}

Total: ₹${total}

Payment ID: ${razorpay_payment_id}
Order ID: ${razorpay_order_id}

Items:
${formattedItems}
        `,
      };

      await transporter.sendMail(mailOptions);

      console.log("📧 Mail sent");
    } catch (mailError) {
      console.error("❌ Mail failed:", mailError);

      // 🔥 IMPORTANT: email fail ஆனாலும் API crash ஆகாது
    }

    /* ================= SUCCESS ================= */

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("❌ VERIFY ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Server error",
      },
      { status: 500 }
    );
  }
}