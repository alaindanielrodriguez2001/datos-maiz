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
          <Navbar className="mb-10" />

          {children}

          <div className = "mb-20">

          </div>

          <div className = "mt-10 fixed bottom-0 h-[25px] bg-maiz w-full text-white z-50 items-center justify-start  border border-b-white">
              <h1 className = "text-base text-white text-center">
                  Universidad Central de Las Villas "Marta Abreu", Cuba, 2024.
              </h1>
          </div>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
