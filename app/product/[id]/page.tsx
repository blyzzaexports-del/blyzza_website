"use client";

import { useState } from "react";
import Image from "next/image";
import { products } from "@/lib/products";
import { useParams } from "next/navigation";
import ShareSection from "@/components/ShareSection";

export default function ProductPage() {
  const params = useParams();
  const productId = Number(params.id);

  const product = products.find((p) => p.id === productId);

  if (!product) return <p>Product not found</p>;

  // ✅ IMAGES
  const images: string[] =
    product.image && product.image.length > 0
      ? product.image
      : ["/fallback.jpg"];

  // ✅ STATES
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [openTab, setOpenTab] = useState("");
  const [selectedSize, setSelectedSize] = useState(0);

  /* 🛒 ADD TO CART */
  const handleAddToCart = () => {
    window.dispatchEvent(
      new CustomEvent("add-to-cart", {
        detail: {
          product,
          sizeIndex: selectedSize,
          quantity: qty,
        },
      })
    );
  };

  /* ⚡ BUY NOW */
  const handleBuyNow = () => {
    window.dispatchEvent(
      new CustomEvent("add-to-cart", {
        detail: {
          product,
          sizeIndex: selectedSize,
          quantity: qty,
        },
      })
    );

    window.dispatchEvent(new Event("open-checkout"));
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-12">
        {/* LEFT - IMAGES */}
        <div className="flex gap-4">
          {/* THUMBNAILS */}
          <div className="flex flex-col gap-3">
            {images.map((img: string, i: number) => (
              <Image
                key={i}
                src={img}
                alt="thumb"
                width={80}
                height={80}
                onClick={() => setSelectedImage(img)}
                className={`cursor-pointer border p-1 ${
                  selectedImage === img ? "border-black" : ""
                }`}
              />
            ))}
          </div>

          {/* MAIN IMAGE */}
          <div className="flex-1">
            <Image
              src={selectedImage}
              alt="product"
              width={600}
              height={600}
              className="w-full rounded-lg object-cover"
            />
          </div>
        </div>

        {/* RIGHT - DETAILS */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          {/* ✅ DYNAMIC PRICE */}
          <p className="text-2xl text-green-700 font-semibold">
            ₹{product.prices[selectedSize]}
          </p>

          {/* ⭐ RATING */}
          <div className="flex items-center gap-2 mt-2 text-yellow-500">
            ⭐⭐⭐⭐⭐ <span className="text-gray-600">(567)</span>
          </div>

          {/* SIZE SELECT */}
          <div className="mt-4">
            <p className="font-medium">Select Size</p>

            <div className="flex gap-2 mt-2">
              {product.sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(index)}
                  className={`px-4 py-2 border rounded-full ${
                    selectedSize === index ? "bg-black text-white" : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* DESC */}
          <p className="mt-4 text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* QTY */}
          <div className="flex items-center gap-4 mt-6">
            <span className="font-medium">Quantity</span>

            <div className="flex border rounded">
              <button
                className="px-3"
                onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
              >
                -
              </button>

              <span className="px-4">{qty}</span>

              <button
                className="px-3"
                onClick={() => setQty(qty + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={handleAddToCart}
              className="w-full border py-3 font-medium"
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="w-full bg-green-800 text-white py-3 font-semibold"
            >
              BUY IT NOW
            </button>
          </div>

          {/* ACCORDION */}
          <div className="mt-8 border-t">
            {["description", "benefits", "how", "ingredients"].map((tab) => (
              <div key={tab} className="border-b">
                <button
                  onClick={() =>
                    setOpenTab(openTab === tab ? "" : tab)
                  }
                  className="w-full flex justify-between py-3 font-medium"
                >
                  {tab.toUpperCase()}
                  <span>{openTab === tab ? "-" : "+"}</span>
                </button>

                {openTab === tab && (
                  <p className="pb-4 text-gray-600 whitespace-pre-line">
                    {tab === "description" && product.description}
                    {tab === "benefits" && product.benefits}
                    {tab === "how" && product.howToUse}
                    {tab === "ingredients" && product.ingredients}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* SHARE */}
          <div className="mt-6">
            <ShareSection />
          </div>
        </div>
      </div>
    </div>
  );
}