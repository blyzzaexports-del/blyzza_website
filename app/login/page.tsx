"use client";

import { useState } from "react";
import supabase from "@/lib/supabase";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {

    e.preventDefault();

    // 🔐 LOGIN WITH SUPABASE
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      alert(error.message);
      return;
    }

    // 👤 GET USER NAME FROM PROFILES TABLE
    if (data.user) {

      const { data: profile } =
        await supabase
          .from("profiles")
          .select("first_name")
          .eq("id", data.user.id)
          .single();

      if (profile) {
        localStorage.setItem(
          "userFirstName",
          profile.first_name
        );
      }

    }

    // 🔥 ADMIN CHECK (MAIN LOGIC)
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    if (data.user?.email === adminEmail) {

      // ✅ ADMIN
      localStorage.setItem("role", "admin");
      document.cookie = "role=admin; path=/";

      window.location.href = "/admin/dashboard";

    } else {

      // ✅ NORMAL USER
      localStorage.setItem("role", "user");
      document.cookie = "role=user; path=/";

      window.location.href = "/";

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="w-[400px] bg-white p-8 shadow-lg rounded-xl">

        <h1 className="text-3xl text-center mb-8 font-semibold">
          Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg outline-none"
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg outline-none"
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          {/* BUTTON */}
          <button
            className="w-full bg-[#556b4f] text-white py-3 rounded-lg hover:opacity-90 transition"
          >
            Login
          </button>

        </form>

      </div>

    </div>

  );
}