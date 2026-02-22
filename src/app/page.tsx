import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/hero/Hero';
import SplitScreenLayout from '@/components/search/SplitScreenLayout';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[var(--color-accent)] selection:text-black">
      <Navbar />
      <Hero />
      <SplitScreenLayout />
    </main>
  );
}
