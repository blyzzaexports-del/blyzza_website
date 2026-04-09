import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const { name, email, message } = body;

    // Gmail transporter

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

    // Send mail

    await transporter.sendMail({

      from:
        process.env.EMAIL_USER,

      to:
        "blyzzaexports@gmail.com",

      subject:
        "New Contact Form Message",

      html: `
        <h2>New Message</h2>

        <p><b>Name:</b> ${name}</p>

        <p><b>Email:</b> ${email}</p>

        <p><b>Message:</b></p>

        <p>${message}</p>
      `,

    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      success: false,
    });

  }

}