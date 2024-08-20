// app/layout.js or app/layout.tsx
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import Navbar from "@/components/Navbar";
import "./globals.css";
import "@/components/Navbar";
import "@/components/Footer";

export const metadata = {
  title: "Datamaíz",
  description: "Software para el trabajo con datos del cultivo del maíz en Villa Clara, Cuba, y la predicción de la aparición de las manchas de asfalto",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <SessionProviderWrapper>
          <Navbar className="mb-6" />
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
