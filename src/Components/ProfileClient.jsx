'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function ProfileClient({ user }) {
  const router = useRouter();
  const [name, setName] = useState(user.name || '');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async e => {
    e.preventDefault();
    setLoading(true);
    const { error } = await authClient.updateUser({ name: name });
    if (error) {
      toast.error(error.message || 'আপডেট করতে সমস্যা হয়েছে!');
    } else {
      toast.success('তথ্য সফলভাবে আপডেট হয়েছে!');
      router.refresh();
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success('সফলভাবে সাইন আউট হয়েছেন!');
          router.push('/');
          router.refresh();
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[700px] mx-auto">
        <div className="mb-8">
          <h1 className="text-[26px] font-bold text-[#1a1a1a] mb-1">
            আমার প্রোফাইল
          </h1>
          <p className="text-[14px] text-gray-500">
            আপনার একাউন্টের তথ্য দেখুন
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-400">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-[20px] font-bold text-[#1a1a1a]">
                {user.name}
              </h2>
              <p className="text-[14px] text-gray-500 mt-0.5">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-500 hover:bg-red-50 rounded-lg text-[14px] font-semibold transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
            সাইন আউট
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <h3 className="text-[16px] font-bold text-[#1a1a1a] mb-6">তথ্য</h3>
          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label className="block text-[13px] font-bold text-gray-800 mb-1.5">
                নাম
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#11a35a]/20 focus:border-[#11a35a] transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading || name === user.name}
              className="w-full bg-[#11a35a] hover:bg-[#0e8c4c] text-white text-[15px] font-bold py-2.5 rounded-lg transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'আপডেট হচ্ছে...' : 'আপডেট'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
