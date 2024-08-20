'use client';
import Link from "next/link";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSession, signIn, signOut } from 'next-auth/react';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const navLinks = [
    { label: "Inicio", path: "/" },
    { label: "Datos", path: "/rutas/datos" },
    { label: "Campos de cultivo", path: "/rutas/campos" },
    { label: "Acerca de", path: "/rutas/acerca-de" },
  ];

  const handleAuthClick = () => {
    if (session) {
      signOut();
    } else {
      setShowDropdown(!showDropdown);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      username: e.target.username.value,
      password: e.target.password.value,
    });
    if (!result.error) {
      setShowDropdown(false);
    } else {
      // Handle error (e.g., show an error message)
      console.error('Authentication error:', result.error);
    }
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (session?.error === 'RefreshAccessTokenError') {
    signIn();
  }

  return (
    <nav className={`flex top-0 fixed ${nav ? "h-[250px] md:h-[50px]" : "h-[50px]"} bg-maiz w-full text-white z-50 items-center justify-start border border-b-white`}>
      <img
        src="/favicon.ico"
        alt="logo"
        className="max-sm:ml-5 ml-10 h-[30px] w-[30px]"
      />
      <div className="flex items-center justify-start ml- w-full">
        <div className="mx-5">
          <CustomButton
            onClick={() => setNav(!nav)}
            customStyle="text-white ml-5 md:hidden"
            content={nav ? <FaTimes /> : <FaBars />}
          />
        </div>
        <ul className={`flex flex-row ${nav ? "max-md:flex-col max-md:space-y-4" : "max-md:hidden"} justify-start space-x-3 md:space-x-5 items-center w-full mx-10`}>
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link href={link.path}>
                <CustomButton
                  customStyle="w-auto"
                  content={link.label}
                />
              </Link>
            </li>
          ))}
          <li>
            <CustomButton
              customStyle="w-auto"
              content={session ? session.user.name : "Autenticarse"}
              onClick={handleAuthClick}
            />
            {showDropdown && !session && (
              <div className="absolute bg-white text-black p-4 mt-2 rounded shadow-lg">
                <form onSubmit={handleSignIn}>
                  <div>
                    <label htmlFor="username" aria-label="Username">Username</label>
                    <input type="text" id="username" name="username" required aria-label="Username" />
                  </div>
                  <div>
                    <label htmlFor="password" aria-label="Password">Password</label>
                    <input type="password" id="password" name="password" required aria-label="Password" />
                  </div>
                  <button type="submit" aria-label="Login">Login</button>
                </form>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
