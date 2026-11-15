'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CategoryNav() {
  const pathname = usePathname();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(
          'https://api.abcz.workers.dev/api/bazardor/categories',
        );
        if (res.ok) {
          const data = await res.json();
          setCategories(
            Array.isArray(data) ? data : data.data || data.categories || [],
          );
        }
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    }
    fetchCategories();
  }, []);

  const fallbackEmojis = {
    chal: '🍚',
    dal: '🥣',
    tel: '🍾',
    sobji: '🥬',
    mach: '🐟',
    mangsho: '🍗',
    'dim-dui': '🥛',
    mosla: '🌶️',
  };

  return (
    <nav className="flex justify-center items-center gap-3 py-3 border-t border-gray-100 overflow-x-auto scrollbar-hide bg-white">
      {categories.map(cat => {
        const isActive = pathname === `/category/${cat.slug}`;
        return (
          <Link
            key={cat.id || cat.slug}
            href={`/category/${cat.slug}`}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[15px] font-medium whitespace-nowrap transition-all duration-300 ease-in-out ${
              isActive
                ? 'bg-[#11a35a] text-white shadow-sm'
                : 'text-gray-700 hover:bg-gray-100 hover:text-[#11a35a]'
            }`}
          >
            <span className="text-lg">
              {cat.icon || fallbackEmojis[cat.slug] || '📦'}
            </span>
            {cat.nameBn}
          </Link>
        );
      })}
    </nav>
  );
}
