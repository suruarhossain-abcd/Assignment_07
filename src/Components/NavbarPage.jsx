'use client';

import Link from 'next/link';
import Image from 'next/image';
import CategoryNav from './CategoryNav';
import PriceTicker from './PriceTicker';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function NavbarPage() {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  const today = new Date();
  const formattedDate = today.toLocaleDateString('bn-BD', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-[52px] h-[52px] bg-[#11a35a] rounded-[14px] flex items-center justify-center shadow-sm overflow-hidden">
              <Image
                src="/logo-icon.png"
                alt="Bazar Dor Logo"
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-[26px] font-bold text-gray-900 leading-tight">
                বাজার দর
              </h1>
              <p
                suppressHydrationWarning
                className="text-[14px] text-gray-600 mt-0.5"
              >
                {formattedDate}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            {isPending ? (
              <span className="text-sm text-gray-400">লোড হচ্ছে...</span>
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 hover:bg-gray-50 p-1.5 rounded-lg transition-colors focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border border-gray-200">
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-bold text-gray-500">
                        {session.user.name?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className="text-[15px] font-semibold text-gray-800 hidden md:block">
                    {session.user.name}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-3.5 h-3.5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-[260px] bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 z-50 overflow-hidden">
                    <div className="p-5 border-b border-gray-100">
                      <p className="text-[15px] font-bold text-gray-900 truncate">
                        {session.user.name}
                      </p>
                      <p className="text-[13px] text-gray-500 mt-0.5 truncate">
                        {session.user.email}
                      </p>
                    </div>
                    <div className="p-2">
                      <Link
                        href="/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-[14px] font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 text-blue-500"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        আমার প্রোফাইল
                      </Link>
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          handleSignOut();
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-[14px] font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-1"
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
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-[15px] font-bold text-gray-800 hover:text-gray-600 transition-colors"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/sign-up"
                  className="text-[15px] font-medium text-white bg-[#11a35a] hover:bg-[#0e8c4c] px-6 py-2.5 rounded-lg transition-colors shadow-sm"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>
        <CategoryNav />
      </div>
      <PriceTicker />
    </header>
  );
}
