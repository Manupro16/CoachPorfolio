'use client';

import { Box, Flex, Grid } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon } from "@radix-ui/react-icons";
import React from "react";

/**
 * Type definition for navigation link objects.
 */
interface NavLink {
    href: string;
    label: string;
    icon?: React.ReactNode;
}

const linkClasses = "font-sans text-sm tracking-tight text-gray-300 hover:text-gray-100 transition-colors duration-200 uppercase";

/**
 * Utility function to generate a string of class names for links.
 * @param {boolean} isActive - Whether the link is the active link.
 * @returns {string} A string of class names.
 */
const getActiveLinkClasses = (isActive: boolean): string =>
    `${linkClasses} ${isActive ? 'font-bold text-gray-100 border-b-2 border-blue-400' : 'font-medium'} `;

/**
 * A functional component for rendering a list of navigation links.
 *
 * @param {Object} props - The component props.
 * @param {NavLink[]} props.links - An array of navigation link objects.
 * @returns {JSX.Element} The JSX code for rendering the list of navigation links.
 */
const NavLinks: React.FC<{ links: NavLink[] }> = ({ links }: { links: NavLink[] }): JSX.Element => {
    const currentPath = usePathname();

    return (
        <ul className="flex list-none p-0 gap-6">
            {links.map((link) => (
                <li key={link.href} className="flex items-center">
                    <Link
                        className={getActiveLinkClasses(link.href === currentPath)}
                        href={link.href}
                        aria-label={link.label.toLowerCase()}
                    >
                        {link.icon || link.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

/**
 * A functional component that renders the navigation bar.
 *
 * The navigation bar consists of two sections:
 * - Left section: Contains links to "Home", "Story", "Career", and "Achievements".
 * - Right section: Contains links to "Teams", "Players", and "Philosophy".
 *
 * @returns {JSX.Element} The JSX code for rendering the navigation bar.
 */
function NavBar(): JSX.Element {
    const leftLinks: NavLink[] = [
        { label: "Home", href: "/", icon: <HomeIcon className="h-6 w-6 text-gray-300 hover:text-gray-100" /> },
        { label: "Story", href: "/story" },
        { label: "Career", href: "/career" },
        { label: "Achievements", href: "/achievements" },
    ];

    const rightLinks: NavLink[] = [
        { label: "Teams", href: "/teams" },
        { label: "Players", href: "/players" },
        { label: "Philosophy", href: "/philosophy" },
    ];

    return (
        <nav className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-700 px-10 py-4 shadow-lg">
            <Grid columns="2" rows="1" gap="3">
                <Flex direction="row" align="center" justify="start">
                    <Box as="div">
                        <NavLinks links={leftLinks} />
                    </Box>
                </Flex>
                <Flex direction="row" align="center" justify="end">
                    <Box as="div">
                        <NavLinks links={rightLinks} />
                    </Box>
                </Flex>
            </Grid>
        </nav>
    );
}

export default NavBar;
