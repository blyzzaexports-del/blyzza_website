
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

/* ✅ METADATA (SEO + FAVICON 🔥) */
export const metadata: Metadata = {
  title: "Blyzza | Premium Herbal Skincare",
  description: "Natural skincare products",

  // 🔥 ADD THIS FOR LOGO IN TOP BAR
  icons: {
    icon: "/favicon.ico",       // main favicon
    shortcut: "/favicon.ico",
    apple: "/icon.png",         // for iPhone
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${poppins.variable}`}
    >
      <body className="font-sans antialiased">

        {/* ✅ CLIENT SIDE PROVIDERS */}
        <ClientProviders>
          {children}
        </ClientProviders>

        {/* ✅ ANALYTICS */}
        <Analytics />

        {/* ✅ RAZORPAY SCRIPT */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />

      </body>
    </html>
  );
}

