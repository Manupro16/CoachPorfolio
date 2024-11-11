'use client';

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Box, Flex, Button } from '@radix-ui/themes';
import Link from 'next/link';
import NavLinks, { NavLink } from '@/components/NavLink';

function NavBar(): JSX.Element {
  const { data: session } = useSession();

  const leftLinks: NavLink[] = [
    { label: 'Home', href: '/' },
    { label: 'Story', href: '/story' },
    { label: 'Career', href: '/career' },
    { label: 'Achievements', href: '/achievements' },
  ];

  const rightLinks: NavLink[] = [
    { label: 'Teams', href: '/teams' },
    { label: 'Players', href: '/players' },
    { label: 'Philosophy', href: '/philosophy' },
  ];

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-700 px-10 py-4 shadow-lg">
      <Flex justify="between" align="center">
        <Box as="div">
          <NavLinks links={leftLinks} />
        </Box>
        <Flex align="center" gap="4">
          <Box as="div">
            <NavLinks links={rightLinks} />
          </Box>
          {session ? (
            <Button
              variant="solid"
              color="red"
              onClick={() => signOut()}
              className="text-white"
              size="1"
            >
              Sign Out
            </Button>
          ) : (
            <Link href="/auth/signin">
              <Button variant="solid" className="text-white" size="1">
                Sign In
              </Button>
            </Link>
          )}
        </Flex>
      </Flex>
    </nav>
  );
}

export default NavBar;
