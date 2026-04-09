"use client";

import { useState } from "react";

export default function OrderPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    product: "",
    quantity: "",
    message: "",
    address: "",
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    console.log("SENDING DATA:", form); // ✅ debug

    await fetch("/api/send-order-mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    alert("Order Sent!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Order Form</h2>

      <input name="name" placeholder="Name" onChange={handleChange} /><br /><br />
      <input name="email" placeholder="Email" onChange={handleChange} /><br /><br />
      <input name="phone" placeholder="Phone" onChange={handleChange} /><br /><br />
      <input name="product" placeholder="Product" onChange={handleChange} /><br /><br />
      <input name="quantity" placeholder="Quantity" onChange={handleChange} /><br /><br />

      {/* ✅ ADDRESS FIELD */}
      <input name="address" placeholder="Address" onChange={handleChange} /><br /><br />

      <textarea name="message" placeholder="Message" onChange={handleChange} /><br /><br />

      <button onClick={handleSubmit}>Send Order</button>
    </div>
  );
}