import type { Metadata, Viewport } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";

import ClientProviders from "@/components/ClientProviders";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

/* ✅ METADATA */
export const metadata: Metadata = {
  metadataBase: new URL("https://www.blyzza.com"),

  title: "Blyzza | Premium Herbal Skincare Products Online",

  description:
    "Shop Blyzza for premium herbal skincare products made with traditional herbal care. Discover natural skincare essentials for your daily beauty routine.",

  alternates: {
    canonical: "/",
  },
};

/* ✅ VIEWPORT */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${poppins.variable}`}
    >
      <body className="font-sans antialiased bg-white text-black">

        {/* 🔥 GLOBAL PROVIDERS */}
        <ClientProviders>
          {children}
        </ClientProviders>

        {/* 📊 VERCEL ANALYTICS */}
        <Analytics />

        {/* 📊 GOOGLE ANALYTICS 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2CD32V5R08"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-2CD32V5R08');
          `}
        </Script>

        {/* 💳 RAZORPAY SCRIPT */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />

      </body>
    </html>
  );
}