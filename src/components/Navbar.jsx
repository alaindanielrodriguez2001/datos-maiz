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

  const navLinks = [
    { label: "Inicio", path: "/" },
    // { label: "Datos", path: "/rutas/datos" },
    // { label: "Campos de cultivo", path: "/rutas/campos" },
    // { label: "Acerca de", path: "/rutas/acerca-de" },

    { label: "Registros", path: "/rutas/registros" },
    { label: "Estaciones meteorológicas", path: "/rutas/estaciones" },
    { label: "Unidades de cultivo", path: "/rutas/unidades" },
    { label: "Pronósticos", path: "/rutas/pronosticos" },
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
      window.alert("Usted ha iniciado su sesión exitosamente.")
      console.log(session)
    } else {
      console.error('Authentication error:', result.error);
      window.alert("No se pudo autenticar. Compruebe que las credenciales sean correctas.")
    }
  };

  if (session?.error === 'RefreshAccessTokenError') {
    signIn();
  }

  return (
    <nav className={`flex top-0 fixed ${nav ? "h-[250px] md:h-[75px]" : "h-[75px]"} bg-maiz w-full text-white z-50 items-center justify-start border border-b-white`}>
      <img
        src="/favicon.ico"
        alt="logo"
        className="max-sm:ml-2 ml-5 h-[30px] w-[30px]"
      />
      <div className="flex items-center justify-start ml-2 w-full">
        <div className="mx-5">
          <CustomButton
            onClick={() => setNav(!nav)}
            customStyle="text-white ml-2 md:hidden"
            content={nav ? <FaTimes /> : <FaBars />}
          />
        </div>
        <ul className={`flex flex-row ${nav ? "max-md:flex-col max-md:space-y-4" : "max-md:hidden"} justify-start space-x-2 md:space-x-3 items-center w-full mx-5`}>
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
              customStyle="w-full"
              content={session ? "Cerrar sesión" : "Autenticarse"}
              onClick={handleAuthClick}
            />
            {showDropdown && !session && (
              <div className="absolute bg-white p-4 mt-2 rounded shadow-lg">
                <form onSubmit={handleSignIn} className="space-y-2">
                  <div className="border border-maiz p-2 w-full rounded-xl text-gray-400">
                    <label htmlFor="username" aria-label="Username">Nombre de usuario</label>
                    <input type="text" id="username" name="username" required aria-label="Username" className="ml-4 px-2" />
                  </div>
                  <div className="border border-maiz p-2 w-full rounded-xl text-gray-400">
                    <label htmlFor="password" aria-label="Password">Contraseña</label>
                    <input type="password" id="password" name="password" required aria-label="Password" className="ml-4 px-2" />
                  </div>

                  <CustomButton
                    customStyle="w-full mt-3"
                    content="Autenticarse"
                    type="submit"
                  />
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
