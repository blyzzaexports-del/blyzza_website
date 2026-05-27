"use client";

import { useEffect } from "react";

export default function InstagramEmbed() {
  useEffect(() => {
    // Instagram script reload
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="flex justify-center">
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink="https://www.instagram.com/reel/DYzFWmNuIJ4/"
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: 0,
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          maxWidth: "540px",
          width: "100%",
        }}
      />
    </div>
  );
}