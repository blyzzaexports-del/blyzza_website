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

    const body =
      await req.json();

    const {

      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,

    } = body;

    console.log(
      "ORDER DATA:",
      orderData
    );

    /* ================= CHECK ORDER DATA ================= */

    if (!orderData) {

      console.log(
        "❌ orderData missing"
      );

      return NextResponse.json({
        success: false,
        message: "Order data missing",
      });

    }

    /* ================= VERIFY SIGNATURE ================= */

    const sign =
      razorpay_order_id +
      "|" +
      razorpay_payment_id;

    const expectedSign =
      crypto
        .createHmac(
          "sha256",
          process.env
            .RAZORPAY_KEY_SECRET!
        )
        .update(sign)
        .digest("hex");

    if (
      expectedSign !==
      razorpay_signature
    ) {

      console.log(
        "❌ Payment verification failed"
      );

      return NextResponse.json({
        success: false,
        message:
          "Payment verification failed",
      });

    }

    console.log(
      "✅ Payment verified"
    );

    /* ================= GET ORDER DATA ================= */

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

    const { error } =
      await supabase
        .from("orders")
        .insert({

          first_name:
            first_name,

          last_name:
            last_name ?? "",

          email:
            email,

          phone:
            phone,

          address:
            address,

          total:
            total,

          items:
            items,

          payment_id:
            razorpay_payment_id,

          order_id:
            razorpay_order_id,

          status:
            "Placed",

          refund_status:
            "Not Requested",

        });

    if (error) {

      console.log(
        "❌ DB Insert Error:",
        error
      );

      return NextResponse.json({
        success: false,
        message:
          "Order save failed",
      });

    }

    console.log(
      "✅ Order Saved"
    );

    /* ================= FORMAT ITEMS ================= */

    const formattedItems =
      items
        ?.map((item: any) => {

          const product =
            item.product;

          const size =
            product.sizes[
              item.sizeIndex
            ];

          const price =
            product.prices[
              item.sizeIndex
            ];

          return `

Product: ${product.name}
Size: ${size}
Quantity: ${item.quantity}
Price: ₹${price}

`;

        })
        .join("");

    /* ================= SEND EMAIL ================= */

    const transporter =
      nodemailer.createTransport({

        service: "gmail",

        auth: {

          user:
            process.env.EMAIL_USER,

          pass:
            process.env.EMAIL_PASS,

        },

      });

    const mailOptions = {

      from:
        process.env.EMAIL_USER,

      to:
        process.env.EMAIL_USER,

      subject:
        "🛒 New Order Received",

      text: `

New Order Details

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

    await transporter.sendMail(
      mailOptions
    );

    console.log(
      "📧 Mail Sent Successfully"
    );

    /* ================= SUCCESS ================= */

    return NextResponse.json({
      success: true,
    });

  } catch (error: any) {

    console.log(
      "VERIFY ERROR:",
      error
    );

    return NextResponse.json({

      success: false,

      message:
        error.message,

    });

  }

}