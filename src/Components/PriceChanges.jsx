import ProductCard from './ProductCard';

export default async function PriceChanges() {
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

  const increasedProducts = products
    .filter(p => (p.change?.pct || 0) > 0)
    .slice(0, 6);
  const decreasedProducts = products
    .filter(p => (p.change?.pct || 0) < 0)
    .slice(0, 6);

  return (
    <div className="space-y-10 mt-12">
      {increasedProducts.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[#e53e3e] text-[12px]">▲</span>
            <h2 className="text-[20px] font-bold text-[#1a1a1a] leading-none">
              আজ দাম বেড়েছে
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {increasedProducts.map(product => (
              <ProductCard key={product.slug || product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {decreasedProducts.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[#2b8a3e] text-[12px]">▼</span>
            <h2 className="text-[20px] font-bold text-[#1a1a1a] leading-none">
              আজ দাম কমেছে
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {decreasedProducts.map(product => (
              <ProductCard key={product.slug || product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
