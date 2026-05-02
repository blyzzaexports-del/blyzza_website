"use client";

import { useState } from "react";
import supabase from "@/lib/supabase";

export default function ResetPasswordPage() {

  const [password, setPassword] = useState("");

  const handleReset = async () => {

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Password updated successfully ✅");
      window.location.href = "/login";
    }
  };

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