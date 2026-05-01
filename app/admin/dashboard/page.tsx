"use client";

import { useEffect } from "react";

export default function AdminDashboard() {

  useEffect(() => {

    const role = localStorage.getItem("role");

    if (role !== "admin") {
      window.location.href = "/";
    }

  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>
    </div>
  );
}