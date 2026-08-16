"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/profile", label: "Profile" },
  { href: "/groups", label: "Groups" },
  { href: "/settings", label: "Settings" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full border-b bg-white px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-10">
      <Link href="/" className="font-bold text-lg text-gray-800">
        Student Portal
      </Link>
      <div className="flex gap-4 items-center">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm ${
              pathname === link.href
                ? "text-blue-600 font-medium"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/login"
          className="text-sm text-gray-500 hover:text-gray-800"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="text-sm bg-blue-600 text-white rounded px-3 py-1"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
