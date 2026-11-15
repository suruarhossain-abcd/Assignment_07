import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">৪০৪</h2>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        দুঃখিত! ক্যাটাগরিটি পাওয়া যায়নি।
      </h3>
      <p className="text-gray-500 mb-6">
        আপনি যে ক্যাটাগরিটি খুঁজছেন সেটি হয়তো ডিলিট করা হয়েছে অথবা ভুল লিংকে
        এসেছেন।
      </p>
      <Link
        href="/"
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
