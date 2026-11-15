import Link from 'next/link';

const toBnNumber = num => {
  if (num === undefined || num === null) return '';
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, d => bnDigits[d]);
};

const getProductIcon = product => {
  if (product.icon && product.icon.trim() !== '') return product.icon;
  const text = `${product.nameBn || ''} ${product.name || ''}`.toLowerCase();
  if (text.includes('পেঁয়াজ') || text.includes('onion')) return '🧅';
  if (text.includes('আদা') || text.includes('ginger')) return '🫚';
  if (text.includes('বেগুন') || text.includes('brinjal')) return '🍆';
  if (text.includes('মাছ') || text.includes('fish')) return '🐟';
  if (text.includes('ডিম') || text.includes('egg')) return '🥚';
  if (text.includes('মরিচ') || text.includes('chili')) return '🌶️';
  if (text.includes('রসুন') || text.includes('garlic')) return '🧄';
  if (text.includes('আলু') || text.includes('potato')) return '🥔';
  if (text.includes('মাংস') || text.includes('meat')) return '🥩';
  if (text.includes('চাল') || text.includes('rice')) return '🍚';
  if (text.includes('ডাল') || text.includes('lentil')) return '🥣';
  if (text.includes('তেল') || text.includes('oil')) return '🫗';
  if (text.includes('দুধ') || text.includes('milk')) return '🥛';
  return '🛒';
};

export default function ProductCard({ product }) {
  const changePct = product.change?.pct || 0;
  const isUp = changePct > 0;
  const isDown = changePct < 0;
  const productId = product.id || product._id || product.slug;

  return (
    <Link href={`/product/${productId}`} className="block group h-full">
      <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-md hover:border-[#11a35a]/40 transition-all duration-200 h-full flex flex-col justify-between">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 flex items-center justify-center text-2xl bg-gray-50 rounded-full">
            {getProductIcon(product)}
          </div>
          <div>
            <h3 className="font-bold text-[#1a1a1a] text-[16px] leading-tight group-hover:text-[#11a35a] transition-colors line-clamp-1">
              {product.nameBn}
            </h3>
            <p className="text-[13px] text-gray-500 mt-1">
              প্রতি {product.unit || 'কেজি'}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-end mt-auto pt-2">
          <div>
            <p className="text-[13px] text-gray-500 mb-1">আজকের দাম</p>
            <p className="text-[20px] font-bold text-[#1a1a1a] flex items-baseline gap-1">
              {toBnNumber(product.today)}{' '}
              <span className="text-[13px] font-medium text-gray-600">
                টাকা
              </span>
            </p>
          </div>
          <span
            className={`text-[12px] font-bold px-2 py-1 rounded-[6px] flex items-center gap-1 ${isUp ? 'bg-[#fff0f0] text-[#e53e3e]' : isDown ? 'bg-[#ebfbee] text-[#2b8a3e]' : 'bg-gray-100 text-gray-600'}`}
          >
            {isUp ? '▲' : isDown ? '▼' : '—'} {toBnNumber(Math.abs(changePct))}%
          </span>
        </div>
      </div>
    </Link>
  );
}
