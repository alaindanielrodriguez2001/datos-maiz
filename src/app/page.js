import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      
      <section className="flex flex-col container overflow-auto scroll-auto px-4 text-maiz">
        <Hero/>
      </section>

    </main>
  );
}
