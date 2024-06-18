'use client'
import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
const Navbar = () => {
  const [nav, setNav] = useState(false);

  const navLinks = [
    { label: "Inicio", path: "/" },
    { label: "Registro", path: "/rutas/registro" },
    { label: "Predicción", path: "/prediccion" },
    { label: "Acerca de", path: "/acerca-de" },
  ];

  return (
    <nav className="flex bg-amber-600 text-white">
      <div className="container flex py-4">
        <img
          src="/favicon.ico"
          alt='logo'
          className="max-sm:ml-5 ml-10 justify-start"
        />
        <div className="flex items-center">

          <button
            onClick={() => setNav(!nav)}
            className="text-white ml-10 focus:outline-none hover:outline-none sm:hidden"
          >
            {nav ? <FaTimes /> : <FaBars />}
          </button>

          <ul
            className={`sm:flex ${nav ? "block" : "hidden"} ml-10 space-x-4 mt-4 md:mt-0`}
          >
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link href={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
