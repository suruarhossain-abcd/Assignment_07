'use client';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#f8f9fa] px-4 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-2">
        কিছু একটা সমস্যা হয়েছে!
      </h2>
      <p className="text-gray-600 mb-6">
        {error.message || 'ডেটা লোড করতে সমস্যা হচ্ছে।'}
      </p>
      <button
        onClick={() => reset()}
        className="bg-[#11a35a] hover:bg-[#0e8c4c] text-white px-6 py-2.5 rounded-lg transition-colors font-medium"
      >
        আবার চেষ্টা করুন
      </button>
    </div>
  );
}
