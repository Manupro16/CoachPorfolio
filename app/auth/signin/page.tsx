// /app/auth/signin/page.tsx

'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SignInPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email: userInfo.email,
      password: userInfo.password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center text-white mb-4">
          Sign In
        </h2>
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block text-white mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-white mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={userInfo.password}
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary hover:bg-primaryDark text-white py-2 rounded transition duration-200"
        >
          Sign In
        </button>
        <p className="text-center text-white mt-4">
          Don't have an account?{' '}
          <Link href="/auth/register">
            <span className="text-primary hover:underline">Register</span>
          </Link>
        </p>
      </form>
    </div>
  );
}
