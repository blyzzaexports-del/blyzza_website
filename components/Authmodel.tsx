"use client";

import { useState } from "react";
import supabase from "@/lib/supabase";
import confetti from "canvas-confetti";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [resetData, setResetData] = useState({
    name: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  if (!isOpen) return null;

  // 🎉 CONFETTI FUNCTION
  const fireConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.3, y: 0.6 },
      });
    }, 200);

    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.7, y: 0.6 },
      });
    }, 400);
  };

  // INPUT HANDLE
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (showReset) {
      setResetData({
        ...resetData,
        [e.target.name]: e.target.value,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  // LOGIN
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      alert("Invalid login ❌");
      return;
    }

    fireConfetti(); // 🎉 blast
    onClose();
  };

  // SIGNUP
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    fireConfetti(); // 🎉 blast
    setIsSignup(false);
  };

  // RESET PASSWORD
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (resetData.newPassword !== resetData.confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: resetData.newPassword,
    });

    if (error) {
      alert(error.message);
    } else {
      fireConfetti(); // 🎉 blast
      setShowReset(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 w-[420px] rounded relative">

        <h2 className="text-lg font-semibold mb-4">
          {showReset
            ? "Reset Password"
            : isSignup
            ? "Create Account"
            : "Login"}
        </h2>

        <form
          onSubmit={
            showReset
              ? handleResetPassword
              : isSignup
              ? handleSignup
              : handleLogin
          }
          className="space-y-4"
        >
          {showReset ? (
            <>
              <input
                name="name"
                placeholder="Name"
                className="w-full border p-2"
                onChange={handleChange}
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full border p-2"
                onChange={handleChange}
              />

              <input
                name="newPassword"
                type="password"
                placeholder="New Password"
                className="w-full border p-2"
                onChange={handleChange}
              />

              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="w-full border p-2"
                onChange={handleChange}
              />

              <button className="w-full bg-green-600 text-white py-3">
                Update Password
              </button>

              <button
                type="button"
                onClick={() => setShowReset(false)}
                className="text-sm text-gray-500"
              >
                Back to Login
              </button>
            </>
          ) : (
            <>
              {isSignup && (
                <>
                  <input
                    name="firstName"
                    placeholder="First Name"
                    className="w-full border p-2"
                    onChange={handleChange}
                  />
                  <input
                    name="lastName"
                    placeholder="Last Name"
                    className="w-full border p-2"
                    onChange={handleChange}
                  />
                </>
              )}

              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full border p-2"
                onChange={handleChange}
                required
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                className="w-full border p-2"
                onChange={handleChange}
                required
              />

              {/* 🔥 FORGOT PASSWORD */}
              {!isSignup && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setShowReset(true)}
                    className="text-sm text-blue-600 underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button className="w-full bg-[#556b4f] text-white py-3">
                {isSignup ? "Create Account" : "Sign in"}
              </button>
            </>
          )}
        </form>

        {!showReset && (
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
        )}

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