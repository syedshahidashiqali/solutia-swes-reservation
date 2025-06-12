"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Reservation", href: "/reservation/create" },
    { name: "Equipment", href: "/equipment" },
    { name: "Calendar", href: "/calendar" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b z-50 shadow-sm">
      <div className="max-w-3xl mx-auto px-4 md:px-8 flex justify-between items-center h-16">
        {/* App Name */}
        <Link href="/" className="font-semibold text-lg">
          SWES Reservation App by Shahid 1
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="text-gray-700"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex space-x-6 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`relative pb-1 transition-all ${isActive
                      ? "after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-0.5 after:bg-amber-950"
                      : "hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:-bottom-0.5 hover:after:w-full hover:after:h-0.5 hover:after:bg-gray-400"
                    }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile Nav Links */}
      {open && (
        <ul className="md:hidden px-4 pb-4 flex flex-col space-y-2 text-sm font-medium bg-white">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`relative block py-2 border-b ${isActive
                      ? "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-amber-950"
                      : "hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-gray-400"
                    }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
