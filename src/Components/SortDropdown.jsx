'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || 'asc';

  const handleSortChange = e => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', e.target.value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex justify-end items-center gap-3 mb-6">
      <span className="text-[14px] text-gray-500 font-medium">সাজান:</span>
      <select
        value={currentSort}
        onChange={handleSortChange}
        className="select select-bordered select-sm bg-gray-50 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#11a35a]"
      >
        <option value="asc">দাম কম থেকে বেশি</option>
        <option value="desc">দাম বেশি থেকে কম</option>
      </select>
    </div>
  );
}
