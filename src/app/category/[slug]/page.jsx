import ProductCard from '@/Components/ProductCard';
import SortDropdown from '@/Components/SortDropdown';
import Link from 'next/link';

export default async function CategoryPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const slug = resolvedParams.slug;
  const sortOrder = resolvedSearchParams.sort || 'asc';

  let products = [];
  let categoryName = 'ক্যাটাগরি';

  try {
    const res = await fetch(
      `https://api.abcz.workers.dev/api/bazardor/products?category=${slug}`,
      { next: { revalidate: 3600 } },
    );

    if (res.ok) {
      const data = await res.json();
      products = Array.isArray(data) ? data : data.data || data.products || [];

      if (products.length > 0 && products[0].categoryNameBn) {
        categoryName = products[0].categoryNameBn;
      }
    }
  } catch (error) {
    console.error('Failed to fetch category products', error);
  }

  if (sortOrder === 'asc') {
    products.sort((a, b) => (a.today || 0) - (b.today || 0));
  } else if (sortOrder === 'desc') {
    products.sort((a, b) => (b.today || 0) - (a.today || 0));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[#f8f9fa] min-h-screen">
      <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#11a35a]">
          হোম
        </Link>
        <span>/</span>
        <span>{categoryName}</span>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-200 mb-6 flex items-center gap-4 shadow-sm">
        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-2xl border border-gray-100">
          🌾
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{categoryName}</h1>
          <p className="text-gray-500 text-sm mt-1">
            প্রতি কেজির আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <SortDropdown />

      <div className="mb-4 text-[13px] text-gray-500 font-medium">
        মোট {products.length} টি পণ্য দেখানো হচ্ছে
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
          <p className="text-gray-500">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map(product => (
            <ProductCard key={product.id || product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
