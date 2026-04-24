
"use client";

import { useState, useEffect } from "react";
import {
  FaWhatsapp,
  FaFacebookF,
  FaTwitter,
  FaEnvelope,
  FaInstagram,
  FaLink,
} from "react-icons/fa";

export default function ShareSection() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    <div>
      {/* 🔗 SHARE BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 border border-gray-300 px-5 py-2.5 rounded-lg 
                   hover:bg-black hover:text-white transition-all duration-200 shadow-sm"
      >
        🔗 Share this product
      </button>

      {/* 🌫️ GLASS POPUP */}
      {open && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 
                          p-6 rounded-2xl w-[320px] text-center shadow-2xl">

            <h2 className="text-lg font-semibold mb-4 text-white">
              Share this product
            </h2>

            {/* 🔥 ICONS */}
            <div className="flex flex-wrap gap-4 justify-center text-xl text-white">

              {/* WhatsApp */}
              <a
                href={`https://wa.me/?text=${encodeURIComponent(url)}`}
                target="_blank"
                className="p-3 rounded-full border border-white/30 hover:bg-green-500 hover:text-white transition transform hover:scale-110"
              >
                <FaWhatsapp />
              </a>

              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                target="_blank"
                className="p-3 rounded-full border border-white/30 hover:bg-blue-600 hover:text-white transition transform hover:scale-110"
              >
                <FaFacebookF />
              </a>

              {/* Twitter */}
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`}
                target="_blank"
                className="p-3 rounded-full border border-white/30 hover:bg-black hover:text-white transition transform hover:scale-110"
              >
                <FaTwitter />
              </a>

              {/* Email */}
              <a
                href={`mailto:?subject=Check this product&body=${url}`}
                className="p-3 rounded-full border border-white/30 hover:bg-gray-700 hover:text-white transition transform hover:scale-110"
              >
                <FaEnvelope />
              </a>

              {/* Instagram (mobile share) */}
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: "Check this product",
                      url: url,
                    });
                  } else {
                    alert("Instagram sharing works on mobile only");
                  }
                }}
                className="p-3 rounded-full border border-white/30 hover:bg-pink-500 hover:text-white transition transform hover:scale-110"
              >
                <FaInstagram />
              </button>

              {/* Copy Link */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(url);
                  alert("Link copied!");
                }}
                className="p-3 rounded-full border border-white/30 hover:bg-white hover:text-black transition transform hover:scale-110"
              >
                <FaLink />
              </button>

            </div>

            {/* ❌ CLOSE */}
            <button
              onClick={() => setOpen(false)}
              className="mt-5 text-sm text-white/70 hover:text-white underline"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

