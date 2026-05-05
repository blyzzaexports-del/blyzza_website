"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in">

      <div
        className={`px-6 py-3 rounded-xl shadow-lg text-white flex items-center gap-2 ${
          type === "success"
            ? "bg-green-600"
            : "bg-red-600"
        }`}
      >
        {/* ICON */}
        {type === "success" ? "✅" : "❌"}

        {/* MESSAGE */}
        <span>{message}</span>
      </div>

    </div>
  );
}