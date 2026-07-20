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
 
//   const currencies = [
//   { country: "Afghanistan", flag: "🇦🇫", code: "AFN", symbol: "؋", rate: 0.45 },
//   { country: "Armenia", flag: "🇦🇲", code: "AMD", symbol: "֏", rate: 4.6 },
//   { country: "Azerbaijan", flag: "🇦🇿", code: "AZN", symbol: "₼", rate: 0.021 },
//   { country: "Afghanistan", code: "AFN", symbol: "؋", flag: "🇦🇫", rate: 0.86 },
//   { country: "Armenia", code: "AMD", symbol: "֏", flag: "🇦🇲", rate: 4.67 },
//   { country: "Azerbaijan", code: "AZN", symbol: "₼", flag: "🇦🇿", rate: 0.020 },
//   { country: "Bahrain", code: "BHD", symbol: ".د.ب", flag: "🇧🇭", rate: 0.0044 },
//   { country: "Bangladesh", code: "BDT", symbol: "৳", flag: "🇧🇩", rate: 1.42 },
//   { country: "Bhutan", code: "BTN", symbol: "Nu.", flag: "🇧🇹", rate: 1 },
//   { country: "Brunei", code: "BND", symbol: "B$", flag: "🇧🇳", rate: 0.016 },
//   { country: "Cambodia", code: "KHR", symbol: "៛", flag: "🇰🇭", rate: 48.6 },
//   { country: "China", code: "CNY", symbol: "¥", flag: "🇨🇳", rate: 0.084 },
//   { country: "Cyprus", code: "EUR", symbol: "€", flag: "🇨🇾", rate: 0.010 },
//   { country: "Georgia", code: "GEL", symbol: "₾", flag: "🇬🇪", rate: 0.033 },
//   { country: "Hong Kong", code: "HKD", symbol: "HK$", flag: "🇭🇰", rate: 0.091 },
//   { country: "India", code: "INR", symbol: "₹", flag: "🇮🇳", rate: 1 },
//   { country: "Indonesia", code: "IDR", symbol: "Rp", flag: "🇮🇩", rate: 190 },
//   { country: "Iran", code: "IRR", symbol: "﷼", flag: "🇮🇷", rate: 503 },
//   { country: "Iraq", code: "IQD", symbol: "ع.د", flag: "🇮🇶", rate: 15.6 },
//   { country: "Israel", code: "ILS", symbol: "₪", flag: "🇮🇱", rate: 0.044 },
//   { country: "Japan", code: "JPY", symbol: "¥", flag: "🇯🇵", rate: 1.74 },
//   { country: "Jordan", code: "JOD", symbol: "JD", flag: "🇯🇴", rate: 0.0082 },
//   { country: "Kazakhstan", code: "KZT", symbol: "₸", flag: "🇰🇿", rate: 5.9 },
//   { country: "Kuwait", code: "KWD", symbol: "KD", flag: "🇰🇼", rate: 0.0036 },
//   { country: "Laos", code: "LAK", symbol: "₭", flag: "🇱🇦", rate: 270 },
//   { country: "Lebanon", code: "LBP", symbol: "ل.ل", flag: "🇱🇧", rate: 1080 },
//   { country: "Malaysia", code: "MYR", symbol: "RM", flag: "🇲🇾", rate: 0.053 },
//   { country: "Maldives", code: "MVR", symbol: "Rf", flag: "🇲🇻", rate: 0.18 },
//   { country: "Mongolia", code: "MNT", symbol: "₮", flag: "🇲🇳", rate: 41.3 },
//   { country: "Myanmar", code: "MMK", symbol: "Ks", flag: "🇲🇲", rate: 25.2 },
//   { country: "Nepal", code: "NPR", symbol: "Rs", flag: "🇳🇵", rate: 1.6 },
//   { country: "North Korea", code: "KPW", symbol: "₩", flag: "🇰🇵", rate: 10.7 },
//   { country: "Oman", code: "OMR", symbol: "ر.ع.", flag: "🇴🇲", rate: 0.0045 },
//   { country: "Pakistan", code: "PKR", symbol: "₨", flag: "🇵🇰", rate: 3.4 },
//   { country: "Philippines", code: "PHP", symbol: "₱", flag: "🇵🇭", rate: 0.68 },
//   { country: "Qatar", code: "QAR", symbol: "﷼", flag: "🇶🇦", rate: 0.042 },
//   { country: "Saudi Arabia", code: "SAR", symbol: "﷼", flag: "🇸🇦", rate: 0.044 },
//   { country: "Singapore", code: "SGD", symbol: "S$", flag: "🇸🇬", rate: 0.016 },
//   { country: "South Korea", code: "KRW", symbol: "₩", flag: "🇰🇷", rate: 16.4 },
//   { country: "Sri Lanka", code: "LKR", symbol: "Rs", flag: "🇱🇰", rate: 3.6 },
//   { country: "Syria", code: "SYP", symbol: "£", flag: "🇸🇾", rate: 170 },
//   { country: "Taiwan", code: "TWD", symbol: "NT$", flag: "🇹🇼", rate: 0.39 },
//   { country: "Thailand", code: "THB", symbol: "฿", flag: "🇹🇭", rate: 0.43 },
//   { country: "Turkey", code: "TRY", symbol: "₺", flag: "🇹🇷", rate: 0.48 },
//   { country: "United Arab Emirates", code: "AED", symbol: "AED", flag: "🇦🇪", rate: 0.044 },
//   { country: "Uzbekistan", code: "UZS", symbol: "so'm", flag: "🇺🇿", rate: 151 },
//   { country: "Vietnam", code: "VND", symbol: "₫", flag: "🇻🇳", rate: 302 },
//   { country: "Yemen", code: "YER", symbol: "﷼", flag: "🇾🇪", rate: 3.0 },
  
//   // 🌍 EUROPE
//     { country: "Albania", flag: "🇦🇱", code: "ALL", symbol: "L", rate: 0.95 },
//     { country: "Andorra", flag: "🇦🇩", code: "EUR", symbol: "€", rate: 0.011 },
//     { country: "Austria", flag: "🇦🇹", code: "EUR", symbol: "€", rate: 0.011 },
//     { country: "Belarus", flag: "🇧🇾", code: "BYN", symbol: "Br", rate: 0.039 },
//     { country: "Belgium", flag: "🇧🇪", code: "EUR", symbol: "€", rate: 0.011 },
//     { country: "Bosnia and Herzegovina", flag: "🇧🇦", code: "BAM", symbol: "KM", rate: 0.022 },
//     { country: "Bulgaria", flag: "🇧🇬", code: "BGN", symbol: "лв", rate: 0.022 },
//     { country: "Croatia", flag: "🇭🇷", code: "EUR", symbol: "€", rate: 0.011 },
//     { country: "Cyprus", flag: "🇨🇾", code: "EUR", symbol: "€", rate: 0.011 },
//     { country: "Czech Republic", flag: "🇨🇿", code: "CZK", symbol: "Kč", rate: 0.27 },
//     { country: "Denmark", flag: "🇩🇰", code: "DKK", symbol: "kr", rate: 0.083 },
//     { country: "Estonia", flag: "🇪🇪", code: "EUR", symbol: "€", rate: 0.011 },
//     { country: "Finland", flag: "🇫🇮", code: "EUR", symbol: "€", rate: 0.011 },
//     { country: "France", flag: "🇫🇷", code: "EUR", symbol: "€", rate: 0.011 },
//     { country: "Germany", flag: "🇩🇪", code: "EUR", symbol: "€", rate: 0.011 },
//     { country: "Greece", flag: "🇬🇷", code: "EUR", symbol: "€", rate: 0.011 },
//     { country: "Hungary", flag: "🇭🇺", code: "HUF", symbol: "Ft", rate: 4.3 },
//     { country: "Iceland", flag: "🇮🇸", code: "ISK", symbol: "kr", rate: 1.60 },
//     { country: "Ireland", flag: "🇮🇪", code: "EUR", symbol: "€", rate: 0.011 },
//     { country: "Italy", flag: "🇮🇹", code: "EUR", symbol: "€", rate: 0.011 },
//     { country: "Kosovo", flag: "🇽🇰", code: "EUR", symbol: "€", rate: 0.011 },
//     { country: "Latvia", flag: "🇱🇻", code: "EUR", symbol: "€", rate: 0.011 },
//     { country: "Liechtenstein", flag: "🇱🇮", code: "CHF", symbol: "CHF", rate: 0.010 },
//     { country: "Lithuania", flag: "🇱🇹", code: "EUR", symbol: "€", rate: 0.011 },
//     { country: "Luxembourg", flag: "🇱🇺", code: "EUR", symbol: "€", rate: 0.011 },
//     { country: "Malta", flag: "🇲🇹", code: "EUR", symbol: "€", rate: 0.011 },
//     { country: "Moldova", flag: "🇲🇩", code: "MDL", symbol: "L", rate: 0.21 },
//     { country: "Monaco", flag: "🇲🇨", code: "EUR", symbol: "€", rate: 0.011 },
//     { country: "Montenegro", flag: "🇲🇪", code: "EUR", symbol: "€", rate: 0.011 },
//     { country: "Netherlands", flag: "🇳🇱", code: "EUR", symbol: "€", rate: 0.011 },
//     { country: "North Macedonia", flag: "🇲🇰", code: "MKD", symbol: "ден", rate: 0.69 },
//     { country: "Norway", flag: "🇳🇴", code: "NOK", symbol: "kr", rate: 0.13 },
//     { country: "Poland", flag: "🇵🇱", code: "PLN", symbol: "zł", rate: 0.047 },
//     { country: "Portugal", flag: "🇵🇹", code: "EUR", symbol: "€", rate: 0.011 },
//     { country: "Romania", flag: "🇷🇴", code: "RON", symbol: "lei", rate: 0.057 },
//     { country: "Russia", flag: "🇷🇺", code: "RUB", symbol: "₽", rate: 1.07 },
//     { country: "San Marino", flag: "🇸🇲", code: "EUR", symbol: "€", rate: 0.011 },
//     { country: "Serbia", flag: "🇷🇸", code: "RSD", symbol: "дин", rate: 1.29 },
//     { country: "Slovakia", flag: "🇸🇰", code: "EUR", symbol: "€", rate: 0.011 },
//     { country: "Slovenia", flag: "🇸🇮", code: "EUR", symbol: "€", rate: 0.011 },
//     { country: "Spain", flag: "🇪🇸", code: "EUR", symbol: "€", rate: 0.011 },
//     { country: "Sweden", flag: "🇸🇪", code: "SEK", symbol: "kr", rate: 0.13 },
//     { country: "Switzerland", flag: "🇨🇭", code: "CHF", symbol: "CHF", rate: 0.010 },
//     { country: "Ukraine", flag: "🇺🇦", code: "UAH", symbol: "₴", rate: 0.50 },
//     { country: "United Kingdom", flag: "🇬🇧", code: "GBP", symbol: "£", rate: 0.009 },
//     { country: "Vatican City", flag: "🇻🇦", code: "EUR", symbol: "€", rate: 0.011 },

//   // 🌍 AFRICA
//     { country: "Algeria", flag: "🇩🇿", code: "DZD", symbol: "دج", rate: 1.57 },
//     { country: "Angola", flag: "🇦🇴", code: "AOA", symbol: "Kz", rate: 10.6 },
//     { country: "Benin", flag: "🇧🇯", code: "XOF", symbol: "CFA", rate: 7.2 },
//     { country: "Botswana", flag: "🇧🇼", code: "BWP", symbol: "P", rate: 0.17 },
//     { country: "Burkina Faso", flag: "🇧🇫", code: "XOF", symbol: "CFA", rate: 7.2 },
//     { country: "Burundi", flag: "🇧🇮", code: "BIF", symbol: "FBu", rate: 35.5 },
//     { country: "Cabo Verde", flag: "🇨🇻", code: "CVE", symbol: "$", rate: 1.21 },
//     { country: "Cameroon", flag: "🇨🇲", code: "XAF", symbol: "CFA", rate: 7.2 },
//     { country: "Central African Republic", flag: "🇨🇫", code: "XAF", symbol: "CFA", rate: 7.2 },
//     { country: "Chad", flag: "🇹🇩", code: "XAF", symbol: "CFA", rate: 7.2 },
//     { country: "Comoros", flag: "🇰🇲", code: "KMF", symbol: "CF", rate: 5.4 },
//     { country: "Congo", flag: "🇨🇬", code: "XAF", symbol: "CFA", rate: 7.2 },
//     { country: "DR Congo", flag: "🇨🇩", code: "CDF", symbol: "FC", rate: 35.0 },
//     { country: "Djibouti", flag: "🇩🇯", code: "DJF", symbol: "Fdj", rate: 2.2 },
//     { country: "Egypt", flag: "🇪🇬", code: "EGP", symbol: "£", rate: 0.61 },
//     { country: "Equatorial Guinea", flag: "🇬🇶", code: "XAF", symbol: "CFA", rate: 7.2 },
//     { country: "Eritrea", flag: "🇪🇷", code: "ERN", symbol: "Nfk", rate: 0.18 },
//     { country: "Eswatini", flag: "🇸🇿", code: "SZL", symbol: "L", rate: 0.22 },
//     { country: "Ethiopia", flag: "🇪🇹", code: "ETB", symbol: "Br", rate: 1.56 },
//     { country: "Gabon", flag: "🇬🇦", code: "XAF", symbol: "CFA", rate: 7.2 },
//     { country: "Gambia", flag: "🇬🇲", code: "GMD", symbol: "D", rate: 0.92 },
//     { country: "Ghana", flag: "🇬🇭", code: "GHS", symbol: "₵", rate: 0.15 },
//     { country: "Guinea", flag: "🇬🇳", code: "GNF", symbol: "FG", rate: 126.0 },
//     { country: "Guinea-Bissau", flag: "🇬🇼", code: "XOF", symbol: "CFA", rate: 7.2 },
//     { country: "Ivory Coast", flag: "🇨🇮", code: "XOF", symbol: "CFA", rate: 7.2 },
//     { country: "Kenya", flag: "🇰🇪", code: "KES", symbol: "KSh", rate: 1.53 },
//     { country: "Lesotho", flag: "🇱🇸", code: "LSL", symbol: "L", rate: 0.22 },
//     { country: "Liberia", flag: "🇱🇷", code: "LRD", symbol: "L$", rate: 2.4 },
//     { country: "Libya", flag: "🇱🇾", code: "LYD", symbol: "LD", rate: 0.057 },
//     { country: "Madagascar", flag: "🇲🇬", code: "MGA", symbol: "Ar", rate: 54.5 },
//     { country: "Malawi", flag: "🇲🇼", code: "MWK", symbol: "MK", rate: 21.0 },
//     { country: "Mali", flag: "🇲🇱", code: "XOF", symbol: "CFA", rate: 7.2 },
//     { country: "Mauritania", flag: "🇲🇷", code: "MRU", symbol: "UM", rate: 0.47 },
//     { country: "Mauritius", flag: "🇲🇺", code: "MUR", symbol: "₨", rate: 0.56 },
//     { country: "Morocco", flag: "🇲🇦", code: "MAD", symbol: "د.م.", rate: 0.12 },
//     { country: "Mozambique", flag: "🇲🇿", code: "MZN", symbol: "MT", rate: 0.80 },
//     { country: "Namibia", flag: "🇳🇦", code: "NAD", symbol: "$", rate: 0.22 },
//     { country: "Niger", flag: "🇳🇪", code: "XOF", symbol: "CFA", rate: 7.2 },
//     { country: "Nigeria", flag: "🇳🇬", code: "NGN", symbol: "₦", rate: 18.5 },
//     { country: "Rwanda", flag: "🇷🇼", code: "RWF", symbol: "FRw", rate: 17.5 },
//     { country: "Sao Tome and Principe", flag: "🇸🇹", code: "STN", symbol: "Db", rate: 0.27 },
//     { country: "Senegal", flag: "🇸🇳", code: "XOF", symbol: "CFA", rate: 7.2 },
//     { country: "Seychelles", flag: "🇸🇨", code: "SCR", symbol: "₨", rate: 0.18 },
//     { country: "Sierra Leone", flag: "🇸🇱", code: "SLE", symbol: "Le", rate: 0.27 },
//     { country: "Somalia", flag: "🇸🇴", code: "SOS", symbol: "Sh", rate: 7.1 },
//     { country: "South Africa", flag: "🇿🇦", code: "ZAR", symbol: "R", rate: 0.22 },
//     { country: "South Sudan", flag: "🇸🇸", code: "SSP", symbol: "£", rate: 1.5 },
//     { country: "Sudan", flag: "🇸🇩", code: "SDG", symbol: "£", rate: 7.1 },
//     { country: "Tanzania", flag: "🇹🇿", code: "TZS", symbol: "TSh", rate: 32.0 },
//     { country: "Togo", flag: "🇹🇬", code: "XOF", symbol: "CFA", rate: 7.2 },
//     { country: "Tunisia", flag: "🇹🇳", code: "TND", symbol: "د.ت", rate: 0.038 },
//     { country: "Uganda", flag: "🇺🇬", code: "UGX", symbol: "USh", rate: 46.0 },
//     { country: "Zambia", flag: "🇿🇲", code: "ZMW", symbol: "ZK", rate: 0.29 },
//     { country: "Zimbabwe", flag: "🇿🇼", code: "ZiG", symbol: "ZiG", rate: 0.17 },
  
//   // 🌎 NORTH AMERICA
//     { country: "Antigua and Barbuda", flag: "🇦🇬", code: "XCD", symbol: "$", rate: 0.032 },
//     { country: "Bahamas", flag: "🇧🇸", code: "BSD", symbol: "$", rate: 0.012 },
//     { country: "Barbados", flag: "🇧🇧", code: "BBD", symbol: "$", rate: 0.024 },
//     { country: "Belize", flag: "🇧🇿", code: "BZD", symbol: "BZ$", rate: 0.024 },
//     { country: "Canada", flag: "🇨🇦", code: "CAD", symbol: "C$", rate: 0.016 },
//     { country: "Costa Rica", flag: "🇨🇷", code: "CRC", symbol: "₡", rate: 6.2 },
//     { country: "Cuba", flag: "🇨🇺", code: "CUP", symbol: "$", rate: 0.29 },
//     { country: "Dominica", flag: "🇩🇲", code: "XCD", symbol: "$", rate: 0.032 },
//     { country: "Dominican Republic", flag: "🇩🇴", code: "DOP", symbol: "RD$", rate: 0.73 },
//     { country: "El Salvador", flag: "🇸🇻", code: "USD", symbol: "$", rate: 0.012 },
//     { country: "Grenada", flag: "🇬🇩", code: "XCD", symbol: "$", rate: 0.032 },
//     { country: "Guatemala", flag: "🇬🇹", code: "GTQ", symbol: "Q", rate: 0.093 },
//     { country: "Haiti", flag: "🇭🇹", code: "HTG", symbol: "G", rate: 1.65 },
//     { country: "Honduras", flag: "🇭🇳", code: "HNL", symbol: "L", rate: 0.31 },
//     { country: "Jamaica", flag: "🇯🇲", code: "JMD", symbol: "J$", rate: 1.95 },
//     { country: "Mexico", flag: "🇲🇽", code: "MXN", symbol: "$", rate: 0.23 },
//     { country: "Nicaragua", flag: "🇳🇮", code: "NIO", symbol: "C$", rate: 0.44 },
//     { country: "Panama", flag: "🇵🇦", code: "PAB", symbol: "B/.", rate: 0.012 },
//     { country: "Saint Kitts and Nevis", flag: "🇰🇳", code: "XCD", symbol: "$", rate: 0.032 },
//     { country: "Saint Lucia", flag: "🇱🇨", code: "XCD", symbol: "$", rate: 0.032 },
//     { country: "Saint Vincent and the Grenadines", flag: "🇻🇨", code: "XCD", symbol: "$", rate: 0.032 },
//     { country: "Trinidad and Tobago", flag: "🇹🇹", code: "TTD", symbol: "TT$", rate: 0.082 },
//     { country: "United States", flag: "🇺🇸", code: "USD", symbol: "$", rate: 0.012 },

//     // 🌎 SOUTH AMERICA

//     { country: "Argentina", flag: "🇦🇷", code: "ARS", symbol: "$", rate: 15.5 },
//     { country: "Bolivia", flag: "🇧🇴", code: "BOB", symbol: "Bs.", rate: 0.083 },
//     { country: "Brazil", flag: "🇧🇷", code: "BRL", symbol: "R$", rate: 0.066 },
//     { country: "Chile", flag: "🇨🇱", code: "CLP", symbol: "$", rate: 11.5 },
//     { country: "Colombia", flag: "🇨🇴", code: "COP", symbol: "$", rate: 49.0 },
//     { country: "Ecuador", flag: "🇪🇨", code: "USD", symbol: "$", rate: 0.012 },
//     { country: "Guyana", flag: "🇬🇾", code: "GYD", symbol: "G$", rate: 2.5 },
//     { country: "Paraguay", flag: "🇵🇾", code: "PYG", symbol: "₲", rate: 94.0 },
//     { country: "Peru", flag: "🇵🇪", code: "PEN", symbol: "S/", rate: 0.045 },
//     { country: "Suriname", flag: "🇸🇷", code: "SRD", symbol: "$", rate: 0.44 },
//     { country: "Uruguay", flag: "🇺🇾", code: "UYU", symbol: "$U", rate: 0.48 },
//     { country: "Venezuela", flag: "🇻🇪", code: "VES", symbol: "Bs.", rate: 1.20 },
//   // 🌏 OCEANIA
//     { country: "Australia", flag: "🇦🇺", code: "AUD", symbol: "A$", rate: 0.018 },
//     { country: "New Zealand", flag: "🇳🇿", code: "NZD", symbol: "NZ$", rate: 0.020 },
//     { country: "Fiji", flag: "🇫🇯", code: "FJD", symbol: "FJ$", rate: 0.027 },
//     { country: "Papua New Guinea", flag: "🇵🇬", code: "PGK", symbol: "K", rate: 0.048 },
//     { country: "Solomon Islands", flag: "🇸🇧", code: "SBD", symbol: "SI$", rate: 0.10 },
//     { country: "Vanuatu", flag: "🇻🇺", code: "VUV", symbol: "VT", rate: 1.43 },
//     { country: "Samoa", flag: "🇼🇸", code: "WST", symbol: "WS$", rate: 0.033 },
//     { country: "Tonga", flag: "🇹🇴", code: "TOP", symbol: "T$", rate: 0.028 },
//     { country: "Tuvalu", flag: "🇹🇻", code: "AUD", symbol: "A$", rate: 0.018 },
//     { country: "Kiribati", flag: "🇰🇮", code: "AUD", symbol: "A$", rate: 0.018 },
//     { country: "Nauru", flag: "🇳🇷", code: "AUD", symbol: "A$", rate: 0.018 },
//     { country: "Palau", flag: "🇵🇼", code: "USD", symbol: "$", rate: 0.012 },
//     { country: "Marshall Islands", flag: "🇲🇭", code: "USD", symbol: "$", rate: 0.012 },
//     { country: "Federated States of Micronesia", flag: "🇫🇲", code: "USD", symbol: "$", rate: 0.012 },
// ];

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