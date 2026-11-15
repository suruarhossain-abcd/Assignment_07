import HeroSection from '@/Components/HeroSection';
import PriceChanges from '@/Components/PriceChanges';
import AllProducts from '@/Components/AllProducts';

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <HeroSection />
      <PriceChanges />
      <AllProducts />
    </main>
  );
}
