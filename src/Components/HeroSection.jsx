import Image from 'next/image';

export default function HeroSection() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('bn-BD', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="bg-white rounded-3xl p-6 md:p-10 lg:p-12 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="flex-1 flex flex-col items-start z-10">
          <div className="bg-[#e8f5e9] text-[#11a35a] px-4 py-1.5 rounded-full text-sm font-semibold mb-6 inline-block">
            {formattedDate}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 leading-[1.3] mb-4">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="text-gray-600 text-[15px] md:text-base leading-relaxed mb-8 max-w-xl">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#all-products"
            className="bg-[#11a35a] hover:bg-[#0e8c4c] text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-sm inline-flex items-center gap-2"
          >
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="flex-1 flex justify-center md:justify-end items-center relative z-10">
          <div className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px] relative">
            <Image
              src="/bazar-hero.png"
              alt="বাজারের ঝুড়ি"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
