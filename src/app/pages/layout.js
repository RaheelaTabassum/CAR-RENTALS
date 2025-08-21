"use client";
import Link from "next/link";
import React from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/users", label: "Users" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/login", label: "Login" },
  // Add more links as needed for your pages
];

const Header = () => (
  <header
    style={{
      background: "#2323a9",
      padding: "16px 0",
      marginBottom: 32,
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    }}
  >
    <nav style={{ display: "flex", justifyContent: "center", gap: 32 }}>
      {navLinks.map(link => (
        <Link
          key={link.href}
          href={link.href}
          style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  </header>
);

export default Header;