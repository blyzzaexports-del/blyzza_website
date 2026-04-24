"use client";

import { useState } from "react";
import Image from "next/image";
import { products } from "@/lib/products";
import { useParams } from "next/navigation";
import ShareSection from "@/components/ShareSection";

export default function ProductPage() {

  const params = useParams();
  const productId = Number(params.id);

  const product = products.find(
    (p) => p.id === productId
  );

  if (!product) return <p>Product not found</p>;

  // ✅ DYNAMIC IMAGES
  const images: string[] =
  product.image && product.image.length > 0
    ? product.image
    : ["/fallback.jpg"];

  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [openTab, setOpenTab] = useState("description");

  /* 🛒 ADD TO CART */
  const handleAddToCart = () => {
    window.dispatchEvent(
      new CustomEvent("add-to-cart", {
        detail: { product, sizeIndex: 0 },
      })
    );
  };

  const handleBuyNow = () => {
    window.dispatchEvent(
      new CustomEvent("add-to-cart", {
        detail: { product, sizeIndex: 0 },
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

          <h1 className="text-3xl font-bold mb-2">
            {product.name}
          </h1>

          <p className="text-2xl text-green-700 font-semibold">
            ₹{product.prices[0]}
          </p>

          {/* RATING */}
          <div className="flex items-center gap-2 mt-2 text-yellow-500">
            ⭐⭐⭐⭐⭐ <span className="text-gray-600">(567)</span>
          </div>

          {/* DESC */}
          <p className="mt-4 text-gray-600">
            This is a natural herbal product with powerful benefits for skin & hair care.
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
                  <p className="pb-4 text-gray-600">
                    {tab === "description" &&
                      "This product nourishes skin and improves glow."}

                    {tab === "benefits" &&
                      "Reduces acne, improves skin texture, natural glow."}

                    {tab === "how" &&
                      "Apply gently on face and leave for 15 mins."}

                    {tab === "ingredients" &&
                      "Aloe Vera, Herbs, Essential oils."}
                  </p>
                )}

              </div>
            ))}
          </div>

          {/* 🔗 SHARE */}
          <div className="mt-6">
            <ShareSection />
          </div>

        </div>

      </div>

    </div>
  );
}