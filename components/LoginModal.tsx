"use client";

import { useState } from "react";
import supabase from "@/lib/supabase";
import Link from "next/link";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({
  isOpen,
  onClose,
}: LoginModalProps) {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);

    const { error } =
      await supabase.auth.signInWithPassword({

        email,
        password,

      });

    if (error) {

      alert(
        "Invalid login credentials ❌"
      );

      setLoading(false);
      return;

    }

    alert("Login successful ✅");

    onClose();

    window.location.reload();

  };

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white shadow-lg p-6 w-[400px] relative">

        {/* TITLE */}

        <h2 className="text-lg font-semibold mb-4">

          Login

        </h2>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >

          {/* EMAIL */}

          <div>

            <label className="text-sm">

              Email

            </label>

            <input
              type="email"
              className="w-full border p-2 mt-1"
              placeholder=""
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>

          {/* PASSWORD */}

          <div>

            <div className="flex justify-between text-sm">

              <label>Password</label>

              <Link
                href="/forgot-password"
                className="underline text-xs"
              >

                Forgot password?

              </Link>

            </div>

            <input
              type="password"
              className="w-full border p-2 mt-1"
              placeholder=""
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>

          {/* SIGN IN */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#556b4f] text-white py-3"
          >

            {loading
              ? "Signing in..."
              : "Sign in"}

          </button>

        </form>

        {/* CREATE ACCOUNT */}

        <p className="text-center mt-4 text-sm">

          New customer?{" "}

          <Link
            href="/signup"
            className="text-blue-600 underline"
          >

            Create account

          </Link>

        </p>

        {/* CLOSE */}

        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-lg"
        >

          ✕

        </button>

      </div>

    </div>

  );

}