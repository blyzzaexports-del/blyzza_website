"use client";

import { useState } from "react";
import supabase from "@/lib/supabase";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    /* LOGIN */

    const { data, error } =
      await supabase.auth.signInWithPassword({

        email,
        password,

      });

    if (error) {

      alert(error.message);
      return;

    }

    /* GET FIRST NAME */

    if (data.user) {

      const { data: profile } =
        await supabase
          .from("profiles")
          .select("first_name")
          .eq("id", data.user.id)
          .single();

      if (profile) {

        // ⭐ Save name locally
        localStorage.setItem(
          "userFirstName",
          profile.first_name
        );

      }

    }

    // Redirect to Home
    window.location.href = "/";

  };

  return (

    <div className="min-h-screen flex items-center justify-center">

      <div className="w-[600px]">

        <h1 className="text-3xl text-center mb-8">

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
            className="w-full border p-3"
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          {/* PASSWORD */}

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3"
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            className="w-full bg-[#556b4f] text-white py-4"
          >

            Login

          </button>

        </form>

      </div>

    </div>

  );
}