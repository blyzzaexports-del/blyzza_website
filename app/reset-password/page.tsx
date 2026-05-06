"use client";

import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

export default function Page() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validSession, setValidSession] = useState(false);

  // ✅ Check session (VERY IMPORTANT)
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        setValidSession(true);
      } else {
        alert("Invalid or expired reset link ❌");
        router.push("/");
      }
    };

    checkSession();
  }, [router]);

  const fireConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
    });
  };

  const handleReset = async () => {
    if (!password || !confirmPassword) {
      alert("Fill all fields ❌");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters ⚠️");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      fireConfetti();

      setTimeout(() => {
        router.push("/");
      }, 1500);
    }
  };

  // ⛔ session check ஆகும் வரை render பண்ணாதே
  if (!validSession) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Checking reset link...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[500px]">
        <h1 className="text-2xl text-center mb-6">
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-3 mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border p-3 mb-4"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 disabled:bg-gray-400"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
}