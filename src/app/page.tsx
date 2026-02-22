import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/hero/Hero';
import SearchLayout from '@/components/search/SearchLayout';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[var(--color-accent)] selection:text-black">
      <Navbar />
      <Hero />
      <SearchLayout />
    </main>
  );
}
