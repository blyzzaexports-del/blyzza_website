"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔥 IMPORTANT: Check session from email link
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        alert("Invalid or expired reset link ❌");
        router.push("/");
      } else {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleReset = async () => {
    if (!password) {
      alert("Enter new password ❌");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Password updated successfully ✅");
      router.push("/login");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Checking link...
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

        <button
          onClick={handleReset}
          className="w-full bg-green-600 text-white py-3"
        >
          Update Password
        </button>

      </div>
    </div>
  );
}