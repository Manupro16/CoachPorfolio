// ShowcaseSection.tsx

'use client';

import React from 'react';
import {Box, Button, Flex, Grid, Heading, Text} from '@radix-ui/themes';
import VideoCard from '@/components/VideoCard';
import useGsapWaveAnimation from '../hooks/useGsapWaveAnimation';
import Link from "next/link";
import WebsiteBackgroundColor from "@/components/WebsiteBackgroundColor"; // Import the custom hook

function ShowcaseSection() {
    const showcases = [
        {
            team: 'Zamora FC Venezuela',
            season: '2010/2011',
            videoSrc: '/videos/zamora_2010.mp4',
            description: 'Highlights from the 2010/2011 season.',
        },
        {
            team: 'Estudiantes de Mérida',
            season: '2012/2013',
            videoSrc: '/videos/estudiantes_2012.mp4',
            description: 'Key moments from the 2012/2013 season.',
        },
        {
            team: 'Deportivo Táchira',
            season: '2014/2015',
            videoSrc: '/videos/tachira_2014.mp4',
            description: 'Memorable plays from the 2014/2015 season.',
        },
    ];

    // Define the animations
    const animations = [
        {
            targetId: 'showcaseWavePathTop',
            duration: 30, // Total duration for the entire animation cycle
            repeat: -1,
            paths: [
                // Path 1 (Original)
                'M0,192 C144,160,288,128,432,133.3 C576,138.7,720,170.7 864,165.3 C1008,160,1152,117,1296,101.3 C1440,85.3,1584,96,1728,106.7 L1728,0 L0,0 Z',
                // Path 2
                'M0,224 C144,192,288,160,432,149.3 C576,138.7,720,138.7 864,154.7 C1008,170.7,1152,202.7,1296,202.7 C1440,202.7,1584,170.7,1728,160 L1728,0 L0,0 Z',
                // Path 3 (Same as Path 1)
                'M0,192 C144,160,288,128,432,133.3 C576,138.7,720,170.7 864,165.3 C1008,160,1152,117,1296,101.3 C1440,85.3,1584,96,1728,106.7 L1728,0 L0,0 Z',
            ],
        },
        {
            targetId: 'showcaseWavePathBottom',
            duration: 30, // Total duration for the entire animation cycle
            repeat: -1,
            paths: [
                // Path 1 (Original)
                'M0,192 C144,160,288,128,432,133.3 C576,138.7,720,170.7 864,165.3 C1008,160,1152,117,1296,101.3 C1440,85.3,1584,96,1728,106.7 L1728,320 L0,320 Z',
                // Path 2
                'M0,256 C144,224,288,192,432,181.3 C576,170.7,720,170.7 864,186.7 C1008,202.7,1152,234.7,1296,234.7 C1440,234.7,1584,202.7,1728,192 L1728,320 L0,320 Z',
                // Path 3 (Same as Path 1)
                'M0,192 C144,160,288,128,432,133.3 C576,138.7,720,170.7 864,165.3 C1008,160,1152,117,1296,101.3 C1440,85.3,1584,96,1728,106.7 L1728,320 L0,320 Z',
            ],
        },
    ];

    useGsapWaveAnimation(animations);

    return (
        <section className="relative w-full overflow-hidden bg-black/10">
            {/* Background Gradient */}
            <WebsiteBackgroundColor />

            {/* Top SVG Wave */}
            <Box
                as="div"
                className="absolute inset-x-0 top-0 w-full h-[40%] pointer-events-none z-0 overflow-hidden"
            >
                <svg
                    viewBox="0 0 1728 320"
                    className="w-full h-full fill-current text-primaryDark opacity-30"
                    preserveAspectRatio="none"
                >
                    <path
                        id="showcaseWavePathTop" // Add ID for GSAP animation
                        d="M0,192 C144,160,288,128,432,133.3 C576,138.7,720,170.7 864,165.3 C1008,160,1152,117,1296,101.3 C1440,85.3,1584,96,1728,106.7 L1728,0 L0,0 Z"
                    ></path>
                </svg>
            </Box>

            {/* Main Content Grid */}
            <Grid
                as="div"
                className="relative z-10 w-full min-h-screen py-8 px-4 sm:px-6 lg:px-8"
                columns={{ initial: '1' }}
                rows="auto"
                gapY={{ initial: '4', md: "8" }}
            >
                 {/* Header Section */}
                <Flex
                    as="div"
                    direction="column"
                    align="center"
                    gap="2"
                >
                    <Heading size="8" className="text-textLight mb-2 text-center">
                        No Matter Where He Goes, His Philosophies and Style Remain the Same
                    </Heading>
                    <Text size="4" className="text-textMuted max-w-2xl text-center">
                        An introduction to the history of Chuy Vera&#39;s amazing soccer career. This showcase provides you with clips of his teams in each season and his impact on the club.
                    </Text>
                </Flex>


                 {/*Video Cards Section */}
                <Flex
                    direction="column"
                    className="w-full py-8 px-4 sm:px-6 lg:px-8"
                    align="center"
                    justify="center"
                    as="div"
                >
                    <Grid
                        columns={{ initial: '1', sm: '1', md: '2', lg: '3' }}
                        gap="6"
                        className="w-full"
                    >
                        {showcases.map((item, index) => (
                            <VideoCard key={index} {...item} />
                        ))}
                    </Grid>
                </Flex>

                {/* Button Section */}
                <Flex
                    as="div"
                    justify="center"
                    align="start"
                    className="z-10 py-4"
                >
                    <Link href="/teams">
                        <Button className="px-6 py-3 bg-primary text-white rounded-lg shadow-lg hover:bg-primaryDark transition-colors">
                            Explore More
                        </Button>
                    </Link>
                </Flex>
            </Grid>

            {/* Bottom SVG Wave */}
            <Box
                as="div"
                className="absolute inset-x-0 bottom-0 w-full h-[30%] pointer-events-none z-0 overflow-hidden"
            >
                <svg
                    viewBox="0 0 1728 320"
                    className="w-full h-full fill-current text-primaryDark opacity-30"
                    preserveAspectRatio="none"
                >
                    <path
                        id="showcaseWavePathBottom" // Add ID for GSAP animation
                        d="M0,192 C144,160,288,128,432,133.3 C576,138.7,720,170.7 864,165.3 C1008,160,1152,117,1296,101.3 C1440,85.3,1584,96,1728,106.7 L1728,320 L0,320 Z"
                    />
                </svg>
            </Box>
        </section>
    );
}

export default ShowcaseSection;