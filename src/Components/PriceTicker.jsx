'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const toBn = n => (n ? n.toString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]) : '');

export default function PriceTicker() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://api.abcz.workers.dev/api/bazardor/products')
      .then(res => res.json())
      .then(data =>
        setProducts(
          Array.isArray(data) ? data : data.data || data.products || [],
        ),
      );
  }, []);

  if (!products.length) return null;
  const duplicatedProducts = [...products, ...products];

  return (
    <>
      <style>{`
        @keyframes scrollTicker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .my-ticker-animation { display: flex; width: max-content; animation: scrollTicker 35s linear infinite; }
        .my-ticker-animation:hover { animation-play-state: paused; }
      `}</style>
      <div className="w-full bg-[#f8f9fa] border-y border-gray-200 py-2.5 overflow-hidden">
        <div className="my-ticker-animation items-center">
          {duplicatedProducts.map((p, i) => {
            const isUp = p.change?.pct > 0;
            const isDown = p.change?.pct < 0;
            return (
              <Link
                key={i}
                href={`/product/${p.id || p.slug}`}
                className="flex items-center gap-1.5 whitespace-nowrap px-5 border-r border-gray-300 last:border-0"
              >
                <span className="text-base">{p.icon || '🌾'}</span>
                <span className="font-semibold text-gray-800 text-[14px]">
                  {p.nameBn}
                </span>
                <span className="text-gray-600 text-[13px] font-medium">
                  {toBn(p.today)} টাকা/{p.unit || 'কেজি'}
                </span>
                <span
                  className={`text-[12px] font-bold ml-1 ${isUp ? 'text-red-500' : isDown ? 'text-green-600' : 'text-gray-500'}`}
                >
                  {isUp ? '▲' : isDown ? '▼' : '—'}{' '}
                  {toBn(Math.abs(p.change?.pct || 0))}%
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
