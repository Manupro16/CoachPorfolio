'use client';

import { Box, Flex, Grid } from "@radix-ui/themes";
import { HomeIcon } from "@radix-ui/react-icons";
import React from "react";
import NavLinks, { NavLink } from "@/components/NavLink";




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
        <nav className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-700 px-10  py-4  shadow-lg ">
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
