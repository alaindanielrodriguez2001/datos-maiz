import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="relative flex flex-col justify-center">
      
      <section className="flex flex-col justify-center container overflow-auto scroll-auto text-maiz">
        <Hero/>
      </section>

    </main>
  );
}
