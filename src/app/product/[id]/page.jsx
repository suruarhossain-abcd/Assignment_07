import Link from 'next/link';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const toBn = n =>
  n === undefined || n === null || n === ''
    ? ''
    : n.toString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]);

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;

  let session = null;
  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
  } catch (error) {
    console.error('Auth session error:', error);
  }

  if (!session) {
    redirect('/sign-in?message=login_required');
  }

  let product = null;

  try {
    const res = await fetch(
      'https://api.abcz.workers.dev/api/bazardor/products',
      {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(10000),
      },
    );

    if (res.ok) {
      const data = await res.json();
      const allProducts = Array.isArray(data)
        ? data
        : data.data || data.products || [];

      product = allProducts.find(
        p =>
          String(p.id) === String(id) ||
          String(p.slug) === String(id) ||
          String(p._id) === String(id),
      );
    }
  } catch (e) {
    console.error('Error fetching product details:', e);
  }

  if (!product) {
    return (
      <div className="text-center py-20 min-h-[60vh] bg-[#f8f9fa]">
        <h1 className="text-2xl font-bold text-gray-800">
          পণ্যটি পাওয়া যায়নি বা লোড হচ্ছে
        </h1>
        <p className="text-gray-500 mt-2">ID: {id}</p>
        <Link
          href="/"
          className="inline-block mt-4 bg-[#11a35a] text-white px-5 py-2 rounded-lg text-sm"
        >
          হোমপেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const pct = product.change?.pct || 0;
  const isUp = pct > 0;
  const isDown = pct < 0;
  const diff = product.previousPrice
    ? Math.abs(product.today - product.previousPrice)
    : 0;
  const markets =
    product.markets || product.marketPrices || product.market_rates || [];

  const mins = markets
    .map(m => Number(m.min || m.minPrice || 0))
    .filter(Boolean);
  const maxs = markets
    .map(m => Number(m.max || m.maxPrice || 0))
    .filter(Boolean);
  const avgs = markets
    .map(m => Number(m.avg || m.average || 0))
    .filter(Boolean);

  const min = mins.length ? Math.min(...mins) : product.today;
  const max = maxs.length ? Math.max(...maxs) : product.today;
  const avg = avgs.length
    ? Math.round(avgs.reduce((a, b) => a + b, 0) / avgs.length)
    : product.today;

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-[#f8f9fa]">
      <div className="flex gap-2 text-[13px] text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#11a35a]">
          হোম
        </Link>
        <span>/</span>
        <span>{product.categoryNameBn || 'চাল'}</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">{product.nameBn}</span>
      </div>

      <div className="bg-white rounded-[20px] border border-gray-200 shadow-sm p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 flex items-center justify-center text-3xl bg-gray-50 rounded-2xl border border-gray-100">
            {product.icon || '🍚'}
          </div>
          <div>
            <h1 className="text-[26px] font-bold text-[#1a1a1a]">
              {product.nameBn}
            </h1>
            <p className="text-[14px] text-gray-500 mt-1">
              প্রতি {product.unit || 'কেজি'} : {product.categoryNameBn || 'চাল'}
            </p>
            <p className="text-[13px] text-gray-600 mt-2">
              গতকালের তুলনায় আজ দাম{' '}
              <span className={isUp ? 'text-red-500' : 'text-green-600'}>
                {isUp ? 'বেড়েছে' : 'কমেছে'}
              </span>{' '}
              ৳ {toBn(diff)} টাকা
            </p>
          </div>
        </div>

        <div className="bg-[#f8f9fa] rounded-2xl p-5 w-full md:w-[160px] text-center border border-gray-200">
          <p className="text-[12px] text-gray-500 mb-1">আজকের দাম</p>
          <p className="text-[32px] font-bold text-gray-900 leading-none mb-1">
            {toBn(product.today)}
          </p>
          <p className="text-[12px] text-gray-500 mb-3">
            টাকা / {product.unit || 'কেজি'}
          </p>
          <span
            className={`text-[13px] font-bold px-3 py-1.5 rounded-md inline-flex items-center gap-1 ${isUp ? 'bg-[#fff0f0] text-[#e53e3e]' : isDown ? 'bg-[#ebfbee] text-[#2b8a3e]' : 'bg-gray-200 text-gray-600'}`}
          >
            {isUp ? '▲' : isDown ? '▼' : '—'} {toBn(Math.abs(pct))}%
          </span>
        </div>
      </div>

      <div className="bg-white rounded-[20px] border border-gray-200 shadow-sm p-6 sm:p-8 mb-6">
        <h2 className="text-[18px] font-bold text-[#1a1a1a] mb-5">
          দামের সারসংক্ষেপ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="border border-gray-200 rounded-xl p-5">
            <p className="text-[13px] text-gray-500 mb-1">সর্বনিম্ন দাম</p>
            <p className="text-[24px] font-bold text-[#11a35a] mb-1">
              {toBn(min)}{' '}
              <span className="text-[14px] font-medium text-gray-700">
                টাকা
              </span>
            </p>
            <p className="text-[12px] text-gray-400">
              সর্বচেয়ে কম দামের বাজার
            </p>
          </div>
          <div className="border border-gray-200 rounded-xl p-5">
            <p className="text-[13px] text-gray-500 mb-1">সর্বোচ্চ দাম</p>
            <p className="text-[24px] font-bold text-[#e53e3e] mb-1">
              {toBn(max)}{' '}
              <span className="text-[14px] font-medium text-gray-700">
                টাকা
              </span>
            </p>
            <p className="text-[12px] text-gray-400">
              সর্বচেয়ে বেশি দামের বাজার
            </p>
          </div>
          <div className="border border-gray-200 rounded-xl p-5">
            <p className="text-[13px] text-gray-500 mb-1">গড় দাম</p>
            <p className="text-[24px] font-bold text-[#11a35a] mb-1">
              {toBn(avg)}{' '}
              <span className="text-[14px] font-medium text-gray-700">
                টাকা
              </span>
            </p>
            <p className="text-[12px] text-gray-400">
              প্রতি {product.unit || 'কেজি'}-এর হিসাব
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[20px] border border-gray-200 shadow-sm p-6 sm:p-8">
        <h2 className="text-[18px] font-bold text-[#1a1a1a] mb-5">
          বাজারভিত্তিক আজকের দাম
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-[14px] font-bold text-gray-600">
                  বাজার
                </th>
                <th className="py-3 px-4 text-[14px] font-bold text-gray-600">
                  জেলা
                </th>
                <th className="py-3 px-4 text-[14px] font-bold text-gray-600">
                  সর্বনিম্ন
                </th>
                <th className="py-3 px-4 text-[14px] font-bold text-gray-600">
                  সর্বোচ্চ
                </th>
                <th className="py-3 px-4 text-[14px] font-bold text-gray-600">
                  গড়
                </th>
              </tr>
            </thead>
            <tbody>
              {markets.length > 0 ? (
                markets.map((m, i) => {
                  const marketName =
                    m.marketName ||
                    m.market_name ||
                    m.market ||
                    m.bazar ||
                    m.name ||
                    'অজানা বাজার';
                  const districtName =
                    m.district ||
                    m.zila ||
                    m.district_name ||
                    m.districtName ||
                    m.zilla ||
                    'ঢাকা';
                  const minP = Number(m.min || m.minPrice || m.min_price || 0);
                  const maxP = Number(m.max || m.maxPrice || m.max_price || 0);
                  const avgP =
                    m.avg ||
                    m.avgPrice ||
                    m.avg_price ||
                    m.average ||
                    (minP && maxP ? Math.round((minP + maxP) / 2) : 0);

                  return (
                    <tr
                      key={i}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4 text-[14px] font-medium text-gray-800">
                        {marketName}
                      </td>
                      <td className="py-3 px-4 text-[14px] text-gray-600">
                        {districtName}
                      </td>
                      <td className="py-3 px-4 text-[14px] text-gray-600">
                        {minP ? `${toBn(minP)} টাকা` : '-'}
                      </td>
                      <td className="py-3 px-4 text-[14px] text-gray-600">
                        {maxP ? `${toBn(maxP)} টাকা` : '-'}
                      </td>
                      <td className="py-3 px-4 text-[14px] font-semibold text-[#1a1a1a]">
                        {avgP ? `${toBn(avgP)} টাকা` : '-'}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-500 text-[14px]"
                  >
                    এই পণ্যের জন্য বাজারভিত্তিক ডেটা এপিআই-তে পাওয়া যায়নি।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
