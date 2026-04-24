"use client";

import { useState, useEffect } from "react";
import {
  ShoppingBag,
  Menu,
  X,
  User,
} from "lucide-react";

import Link from "next/link";

import { AuthModal } from "./Authmodel";

import supabase from "@/lib/supabase";
import Image from "next/image";

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

  const [isMobileMenuOpen,
    setIsMobileMenuOpen] =
    useState(false);

  const [isAuthOpen,
    setIsAuthOpen] =
    useState(false);

  const [user,
    setUser] = useState<any>(null);

  // Detect scroll

  useEffect(() => {

    const handleScroll = () => {

      setIsScrolled(
        window.scrollY > 20
      );

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

  // Get Logged User

  useEffect(() => {

    const getUser =
      async () => {

        const {
          data: { user },
        } =
          await supabase.auth.getUser();

        setUser(user);

      };

    getUser();

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
          ? "glass shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >

      <div className="container mx-auto px-4 md:px-6">

        <div className="flex items-center justify-between">

          {/* LOGO */}

          <Link
            href="#home"
            className="flex items-center"
          >
            <Image
              src="about/logo.png"   // 👉 உங்கள் logo file name
              alt="Blyzza Logo"
              width={140}
              height={50}
              className="object-contain"
            />
          </Link>

          {/* Desktop Navigation */}

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

            {/* ✅ MY ORDERS LINK */}

            {/* {user && (

              <Link
                href="/my-orders"
                className="text-sm font-medium hover:text-primary"
              >

                My Orders

              </Link>

            )} */}

          </div>

          {/* RIGHT SIDE ICONS */}

          <div className="flex items-center gap-3">

            {/* 👤 HUMAN ICON */}

            <button
              onClick={() =>
                setIsAuthOpen(true)
              }
              className="p-2 hover:bg-gray-200 rounded-full"
              aria-label="Login"
            >

              <User className="w-6 h-6 text-black" />

            </button>

            {/* 🛒 CART ICON */}

            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-gray-200 rounded-full"
              aria-label="Cart"
            >

              <ShoppingBag className="w-6 h-6 text-black" />

              {cartCount > 0 && (

                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">

                  {cartCount}

                </span>

              )}

            </button>

            {/* MOBILE MENU */}

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

              {/* ✅ MOBILE MY ORDERS */}

              {user && (

                <Link
                  href="/my-orders"
                  className="py-2"
                  onClick={() =>
                    setIsMobileMenuOpen(false)
                  }
                >

                  My Orders

                </Link>

              )}

            </div>

          </div>

        )}

      </div>

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