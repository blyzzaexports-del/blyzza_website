"use client";

import { useState } from "react";
import supabase from "@/lib/supabase";

export default function SignupPage() {

  const [formData, setFormData] =
    useState({

      firstName: "",
      lastName: "",
      email: "",
      password: "",

    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSignup = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);

    /* CREATE USER */

    const { data, error } =
      await supabase.auth.signUp({

        email: formData.email,

        password: formData.password,

      });

    if (error) {

      alert(error.message);

      setLoading(false);
      return;

    }

    /* INSERT PROFILE */

    if (data.user) {

      await supabase
        .from("profiles")
        .insert([{

          id: data.user.id,

          first_name:
            formData.firstName,

          last_name:
            formData.lastName,

          email:
            formData.email,

        }]);

    }

    alert("Account created ✅");

    window.location.href =
      "/login";

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#f5f3ef]">

      <div className="w-[600px]">

        <h1 className="text-3xl font-semibold text-center mb-8">

          Create Account

        </h1>

        <form
          onSubmit={handleSignup}
          className="space-y-5"
        >

          {/* FIRST NAME */}

          <div>

            <label className="text-sm">

              First Name

            </label>

            <input
              name="firstName"
              className="w-full border p-3 mt-1"
              onChange={handleChange}
              required
            />

          </div>

          {/* LAST NAME */}

          <div>

            <label className="text-sm">

              Last Name

            </label>

            <input
              name="lastName"
              className="w-full border p-3 mt-1"
              onChange={handleChange}
              required
            />

          </div>

          {/* EMAIL */}

          <div>

            <label className="text-sm">

              Email

            </label>

            <input
              type="email"
              name="email"
              className="w-full border p-3 mt-1"
              onChange={handleChange}
              required
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label className="text-sm">

              Password

            </label>

            <input
              type="password"
              name="password"
              className="w-full border p-3 mt-1"
              onChange={handleChange}
              required
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#556b4f] text-white py-4 mt-4"
          >

            {loading
              ? "Creating..."
              : "Create"}

          </button>

        </form>

      </div>

    </div>

  );

}