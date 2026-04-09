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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSignup = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    const { data, error } =
      await supabase.auth.signUp({

        email: formData.email,
        password: formData.password,

      });

    if (error) {

      alert(error.message);
      return;

    }

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
      "/";

  };

  return (

    <div className="min-h-screen flex items-center justify-center">

      <div className="w-[600px]">

        <h1 className="text-3xl text-center mb-8">

          Create Account

        </h1>

        <form
          onSubmit={handleSignup}
          className="space-y-5"
        >

          <input
            name="firstName"
            placeholder="First Name"
            className="w-full border p-3"
            onChange={handleChange}
            required
          />

          <input
            name="lastName"
            placeholder="Last Name"
            className="w-full border p-3"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border p-3"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border p-3"
            onChange={handleChange}
            required
          />

          <button
            className="w-full bg-[#556b4f] text-white py-4"
          >

            Create

          </button>

        </form>

      </div>

    </div>

  );

}