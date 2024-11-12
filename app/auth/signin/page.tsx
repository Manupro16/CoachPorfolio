// /app/auth/signin/page.tsx

'use client';

import {signIn, useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {Box, Flex, Heading} from "@radix-ui/themes";
import WebsiteBackgroundColor from "@/components/WebsiteBackgroundColor";

export default function SignInPage() {
    const {data: session} = useSession();
    const router = useRouter();

    const [userInfo, setUserInfo] = useState({email: '', password: ''});
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
        <Flex as="div" align="center" justify="center" className="min-h-screen">
            <WebsiteBackgroundColor/>
            <Box className="shadow-md rounded-lg p-8 w-full max-w-md bg-gray-900">
                <Heading
                    as="h2"
                    size="4"
                    className="text-2xl font-semibold text-blue-500 mb-6 text-center"
                >
                    Create an Account
                </Heading>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <p className="text-red-500 text-center mb-4">{error}</p>
                    )}
                    <Box className="mb-4">
                        <label htmlFor="email" className="block text-white mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-2 rounded bg-gray-700 text-white"
                            value={userInfo.email}
                            onChange={(e) =>
                                setUserInfo({...userInfo, email: e.target.value})
                            }
                            required
                        />
                    </Box>
                    <Box className="mb-6">
                        <label htmlFor="password" className="block text-white mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-2 rounded bg-gray-700 text-white"
                            value={userInfo.password}
                            onChange={(e) =>
                                setUserInfo({...userInfo, password: e.target.value})
                            }
                            required
                        />
                    </Box>
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
            </Box>

        </Flex>
    );
}
