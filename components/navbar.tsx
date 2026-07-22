"use client";

import { useState, useEffect } from "react";
import {
  ShoppingBag,
  Menu,
  X,
  User,
  Globe,
  ChevronDown,
} from "lucide-react";

import Link from "next/link";
import { AuthModal } from "./Authmodel";
import supabase from "@/lib/supabase";
import Image from "next/image";
import { countryGroups } from "@/lib/countries";


interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export function Navbar({
  cartCount,
  onCartClick,
}: NavbarProps) {
 
  const [isScrolled, setIsScrolled] =
    useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const [isAuthOpen, setIsAuthOpen] =
    useState(false);

  // ✅ USER
  const [user, setUser] =
    useState<any>(null);

  // ✅ LOGOUT POPUP
  const [showLogoutConfirm, setShowLogoutConfirm] =
    useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(
    countryGroups[0].countries[0]
  );
  const [showCurrency, setShowCurrency] =
    useState(false);
  const [searchCountry, setSearchCountry] =
    useState("");  

  /* 🔥 SCROLL EFFECT */
  useEffect(() => {

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, []);

  /* 🔥 USER SESSION */
  useEffect(() => {

    // ❌ DON'T USE getUser()
    // Because old session restore aagum

    const { data: listener } =
      supabase.auth.onAuthStateChange(
        (_event, session) => {

          // ✅ ONLY AFTER LOGIN
          if (_event === "SIGNED_IN") {
            setUser(session?.user || null);
          }

          // ✅ AFTER LOGOUT
          if (_event === "SIGNED_OUT") {
            setUser(null);
          }

        }
      );

    return () => {
      listener.subscription.unsubscribe();
    };

  }, []);
  useEffect(() => {
  const saved = localStorage.getItem("currency");

  if (saved) {
    const allCountries = countryGroups.flatMap(
      (group) => group.countries
    );

    const found = allCountries.find(
      (c) => c.code === saved
    );

    if (found) {
      setSelectedCurrency(found);
    }
  }
}, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#shop", label: "Shop" },
    { href: "#products", label: "Products" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (

    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between w-full">
          {/* LOGO */}
          <Link
            href="#home"
            className="flex items-center justify-start"
          >
            <Image
              src="/about/logo.png"
              alt="Blyzza Logo"
              width={140}
              height={50}
              className="object-contain"
            />
          </Link>
          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">

            {navLinks.map((link) => (

              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:text-primary"
              >
                {link.label}
              </Link>

            ))}

          </div>
          {/* 🌍 COUNTRY */}
          <div className="relative">
            <button
              onClick={() => setShowCurrency(!showCurrency)}
              className="flex items-center gap-1 p-2 rounded-full hover:bg-gray-200 transition"
            >
              <span className="text-xl">{selectedCurrency.flag}</span>
              <ChevronDown className="w-3 h-3 text-black" />
            </button>

            {showCurrency && (
              <div className="absolute right-0 mt-2 w-72 max-h-96 overflow-y-auto rounded-xl border bg-white shadow-xl z-50">

                {/* Search */}

                <div className="sticky top-0 bg-white p-3 border-b">
                  <input
                    type="text"
                    placeholder="Search country..."
                    value={searchCountry}
                    onChange={(e) => setSearchCountry(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                {countryGroups.map((group) => (
                  <div key={group.continent}>

                    <div className="bg-gray-100 px-4 py-2 font-bold sticky top-16">
                      {group.continent}
                    </div>

                    {group.countries
                      .filter((item) =>
                        item.country
                          .toLowerCase()
                          .includes(searchCountry.toLowerCase())
                      )
                      .map((item) => (
                        <button
                          key={item.country}
                          onClick={() => {
                            setSelectedCurrency(item);

                            localStorage.setItem("currency", item.code);
                            localStorage.setItem(
                              "selectedCurrency",
                              JSON.stringify(item)
                            );

                            window.dispatchEvent(
                              new CustomEvent("currency-change", {
                                detail: item,
                              })
                            );

                            setSearchCountry("");
                            setShowCurrency(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-left"
                        >
                          <span className="text-xl">{item.flag}</span>

                          <div className="flex flex-col">
                            <span>{item.country}</span>
                            <span className="text-xs text-gray-500">
                              {item.code}
                            </span>
                          </div>
                        </button>
                    ))}

                  </div>
                ))}

              </div>
            )}
          </div>
          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3 ml-8">

            {/* 👤 LOGIN / LOGOUT */}

            {user ? (

              <button
                onClick={() =>
                  setShowLogoutConfirm(true)
                }
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Logout
              </button>

            ) : (

              <button
                onClick={() =>
                  setIsAuthOpen(true)
                }
                className="p-2 hover:bg-gray-200 rounded-full"
              >

                <User className="w-6 h-6 text-black" />

              </button>

            )}

            {/* 🛒 CART */}
            <button
              onClick={() => {
                window.dispatchEvent(
                  new Event("open-cart")
                );
              }}
              className="relative p-2 hover:bg-gray-200 rounded-full"
            >

              <ShoppingBag className="w-6 h-6 text-black" />

              {cartCount > 0 && (

                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>

              )}

            </button>

            {/* 📱 MOBILE MENU */}
            <button
              onClick={() =>
                setIsMobileMenuOpen(
                  !isMobileMenuOpen
                )
              }
              className="md:hidden p-2"
            >

              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}

            </button>

          </div>

        </div>

        {/* MOBILE NAV */}
        {isMobileMenuOpen && (

          <div className="md:hidden mt-4 pb-4">

            <div className="flex flex-col gap-3">

              {navLinks.map((link) => (

                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() =>
                    setIsMobileMenuOpen(false)
                  }
                  className="py-2"
                >
                  {link.label}
                </Link>

              ))}

            </div>

          </div>

        )}

      </div>

      {/* 🔥 LOGOUT CONFIRM POPUP */}
      {showLogoutConfirm && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100]">

          <div className="bg-white p-6 rounded-2xl shadow-xl w-[320px]">

            <h2 className="text-xl font-semibold mb-3">
              Logout?
            </h2>

            <p className="text-gray-600 mb-6">
              Do you want to logout?
            </p>

            <div className="flex justify-end gap-3">

              {/* NO */}
              <button
                onClick={() =>
                  setShowLogoutConfirm(false)
                }
                className="px-4 py-2 rounded-lg border"
              >
                No
              </button>

              {/* YES */}
              <button
                onClick={async () => {

                  await supabase.auth.signOut();

                  localStorage.removeItem("role");
                  localStorage.removeItem("userFirstName");

                  document.cookie =
                    "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

                  setShowLogoutConfirm(false);

                  // ✅ REFRESH PAGE
                  window.location.reload();

                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Sure
              </button>

            </div>

          </div>

        </div>

      )}

      {/* AUTH MODAL */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() =>
          setIsAuthOpen(false)
        }
      />

    </nav>

  );
}