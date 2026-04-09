import { supabaseAdmin } from "@/lib/supabase-admin";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      product,
      quantity,
      message,
      address,
      city,
      pincode,
      total
    } = body;

    console.log("DATA RECEIVED:", body);

    // ✅ 1. SAVE TO SUPABASE
    const { error } = await supabaseAdmin
      .from("orders")
      .insert([
        {
          name,
          email,
          phone,
          product,
          quantity,
          message,
          address,
          city,
          pincode,
          total
        },
      ]);

    if (error) {
      console.error("DB ERROR:", error);
      return Response.json({
        success: false,
        error: "DB Insert Failed"
      });
    }

    console.log("DB SAVED SUCCESS");

    // ✅ 2. EMAIL SETUP

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 📩 ADMIN MAIL
    const adminMail = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "🛒 New Order Received",

      html: `
        <h2>New Order Details</h2>

        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>

        <h3>Product Details</h3>

        <p><b>Product:</b> ${product}</p>
        <p><b>Quantity:</b> ${quantity}</p>

        <h3>Shipping Address</h3>

        <p><b>Address:</b> ${address}</p>
        <p><b>City:</b> ${city}</p>
        <p><b>Pincode:</b> ${pincode}</p>

        <h3>Total</h3>

        <p><b>Amount:</b> ₹ ${total}</p>

        <h3>Message</h3>

        <p>${message || "No message"}</p>
      `,
    };

    // 📩 CUSTOMER MAIL
    const customerMail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "✅ Order Confirmation",

      html: `
        <h2>Thank you for your order!</h2>

        <p>Hi ${name},</p>

        <p>Your order has been received successfully.</p>

        <h3>Order Summary</h3>

        <p><b>Product:</b> ${product}</p>
        <p><b>Quantity:</b> ${quantity}</p>

        <h3>Shipping Address</h3>

        <p>${address}, ${city} - ${pincode}</p>

        <h3>Total Amount</h3>

        <p><b>₹ ${total}</b></p>

        <p>We will contact you soon.</p>

        <br>

        <p>Thanks,<br>Blyzza Team</p>
      `,
    };

    // SEND BOTH MAILS

    await transporter.sendMail(adminMail);
    await transporter.sendMail(customerMail);

    console.log("MAIL SENT SUCCESS");

    return Response.json({
      success: true
    });

  } catch (err) {

    console.error("SERVER ERROR:", err);

    return Response.json({
      success: false,
      error: "Server Error"
    });

  }
}