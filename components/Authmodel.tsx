"use client";

import { useState } from "react";
import supabase from "@/lib/supabase";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [userName, setUserName] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  if (!isOpen && !showWelcome) return null;

  // Handle input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // LOGIN FUNCTION
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error || !data.user) {
      alert("Invalid login credentials ❌");
      return;
    }

    // ✅ FIXED: Safe profile fetch
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("first_name")
      .eq("id", data.user.id)
      .maybeSingle();

    let name = "User";

    if (!profileError && profile?.first_name) {
      name = profile.first_name;
    }

    setUserName(name);

    onClose();
    setShowWelcome(true);

    setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
  };

  // SIGNUP FUNCTION
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    if (data.user) {
      // Insert profile safely
      await supabase.from("profiles").insert([
        {
          id: data.user.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
        },
      ]);
    }

    setUserName(formData.firstName || "User");

    onClose();
    setShowWelcome(true);

    setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
  };

  return (
    <>
      {/* LOGIN / SIGNUP MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white shadow-lg p-6 w-[420px] relative rounded">
            <h2 className="text-lg font-semibold mb-4">
              {isSignup ? "Create Account" : "Login"}
            </h2>

            <form
              onSubmit={isSignup ? handleSignup : handleLogin}
              className="space-y-4"
            >
              {isSignup && (
                <>
                  <input
                    name="firstName"
                    placeholder="First Name"
                    className="w-full border p-2 rounded"
                    onChange={handleChange}
                    required
                  />

                  <input
                    name="lastName"
                    placeholder="Last Name"
                    className="w-full border p-2 rounded"
                    onChange={handleChange}
                    required
                  />
                </>
              )}

              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full border p-2 rounded"
                onChange={handleChange}
                required
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                className="w-full border p-2 rounded"
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="w-full bg-[#556b4f] text-white py-3 rounded"
              >
                {isSignup ? "Create Account" : "Sign in"}
              </button>
            </form>

            <p className="text-center mt-4 text-sm">
              {isSignup
                ? "Already have an account?"
                : "New customer?"}{" "}
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="text-blue-600 underline"
              >
                {isSignup ? "Login" : "Create account"}
              </button>
            </p>

            <button
              onClick={onClose}
              className="absolute top-2 right-3 text-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* 🎉 WELCOME POPUP */}
      {showWelcome && (
        <div className="fixed top-5 right-5 z-50">
          <div className="bg-green-600 text-white px-6 py-4 rounded shadow-lg">
            <p className="font-semibold text-lg">
              🎉 Welcome {userName}!
            </p>
            <p className="text-sm">Login Successful</p>
          </div>
        </div>
      )}
    </>
  );
}