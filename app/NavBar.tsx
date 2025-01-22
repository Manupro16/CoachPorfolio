"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  Button,
  Flex,
  Avatar, Box,
} from "@radix-ui/themes"; // Or the specific imports your version supports
import { usePathname, useSearchParams } from "next/navigation";
import { NavLink } from "@/components/NavLink"; // If you have a separate interface

// Example link sets
const leftLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Story", href: "/story" },
  { label: "Career", href: "/career" },
  { label: "Achievements", href: "/achievements" },
];

const rightLinks: NavLink[] = [
  { label: "Teams", href: "/teams" },
  { label: "Players", href: "/players" },
  { label: "Philosophy", href: "/philosophy" },
];

export default function NavBar(): JSX.Element {
  const { data: session } = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const fullPath = queryString ? `${pathname}?${queryString}` : pathname;

  return (
    <nav
      className="
        w-full
        bg-gradient-to-r from-gray-900 via-black to-gray-900
        border-b border-gray-700
        shadow-lg
      "
    >
      <Box as='div' className="px-4 sm:px-6 md:px-10 py-4">
        {/*
          This Flex:
            - brand/logo on the left
            - 2 sections: normal horizontal links on md+ screens,
              and a dropdown hamburger on mobile
        */}
        <Flex justify="between" align="center">
          {/* Left side brand or title */}
          <Link href="/">
            <span className="text-white font-bold text-lg">Chuy Vera</span>
          </Link>

          {/* Normal horizontal links (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-6">
            {leftLinks.map((link) => (
              <NavItem key={link.href} link={link} />
            ))}
            {rightLinks.map((link) => (
              <NavItem key={link.href} link={link} />
            ))}
            {/* If session user is logged in or sign in link */}
            {session ? (
              <AvatarMenu session={session} signOut={signOut} />
            ) : (
              <Link href={`/auth/signin?callbackUrl=${encodeURIComponent(fullPath)}`}>
                <Button variant="solid" className="text-white" size="1">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile dropdown (visible on small screens only) */}
          <div className="md:hidden">
            <MobileDropdown session={session} fullPath={fullPath} />
          </div>
        </Flex>
      </Box>
    </nav>
  );
}

/**
 * A single nav item for desktop
 */
function NavItem({ link }: { link: NavLink }) {
  return (
    <Link
      href={link.href}
      className="
        text-sm text-gray-300
        hover:text-gray-100
        uppercase
        transition-colors
        duration-200
      "
    >
      {link.label}
    </Link>
  );
}

/**
 * The avatar + sign-out dropdown for authenticated user
 * (on desktop).
 */
function AvatarMenu({ session, signOut }: any) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="ghost" size="1" className="p-0">
          <Avatar
            key={session.user?.id}
            src={`api/users/${session.user?.id}/image?${Date.now()}`}
            fallback={
              session.user?.name ? session.user.name.charAt(0) : "U"
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
  );
}

/**
 * The mobile menu, uses a single "Menu" or "Options" button,
 * displaying all links in a vertical dropdown
 */
function MobileDropdown({ session, fullPath }: any) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="soft" color="gray" size="2">
          Menu
          {/*<DropdownMenuTriggerIcon />*/}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        size="2"
        variant="soft"
        color="gray"
        className="z-50"
      >
        {/* We can separate out the links or combine.
            For example: left + right links all in one. */}
        {leftLinks.map((link) => (
          <DropdownMenu.Item key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </DropdownMenu.Item>
        ))}
        <DropdownMenu.Separator />
        {rightLinks.map((link) => (
          <DropdownMenu.Item key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </DropdownMenu.Item>
        ))}

        <DropdownMenu.Separator />
        {session ? (
          <>
            <DropdownMenu.Item disabled>
              Signed in as {session.user?.email}
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item onSelect={() => signOut()} color="red">
              Sign Out
            </DropdownMenu.Item>
          </>
        ) : (
          <DropdownMenu.Item>
            <Link href={`/auth/signin?callbackUrl=${encodeURIComponent(fullPath)}`}>
              Sign In
            </Link>
          </DropdownMenu.Item>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
