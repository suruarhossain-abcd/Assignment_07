import ProductCard from './ProductCard';

export default async function AllProducts() {
  let products = [];
  try {
    const res = await fetch(
      'https://api.abcz.workers.dev/api/bazardor/products',
      { next: { revalidate: 3600 } },
    );
    if (res.ok) {
      const data = await res.json();
      products = Array.isArray(data) ? data : data.data || data.products || [];
    }
  } catch (error) {
    console.error('Failed to fetch products', error);
  }

  return (
    <div id="all-products" className="mt-12">
      <div className="mb-6">
        <h2 className="text-[20px] font-bold text-[#1a1a1a]">সব পণ্য</h2>
        <p className="text-[14px] text-gray-500 mt-1">
          সর্বশেষ আপডেটকৃত বাজার দর
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map(product => (
          <ProductCard key={product.slug || product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
