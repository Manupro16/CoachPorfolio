// components/NavBar.tsx

'use client';

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Box, Flex, Button, Avatar, DropdownMenu } from '@radix-ui/themes';
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
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="ghost" size="1" className="p-0 ">
                  <Avatar
                    src={`api/users/${session.user?.id}/image` || undefined}
                    fallback={
                      session.user?.name ? session.user.name.charAt(0) : 'U'
                    }
                    size="2"
                  />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content sideOffset={5} className="bg-gray-800 text-white">
                <DropdownMenu.Item disabled>
                  Signed in as {session.user?.email}
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item onSelect={() => signOut()} color="red">
                  Sign Out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
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
