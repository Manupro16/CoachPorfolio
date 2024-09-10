'use client';

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { Box, Flex, Grid, Heading, Text, Button } from "@radix-ui/themes";
import Image from "next/image";

function WelcomeSection() {
    useEffect(() => {
        // Simple GSAP animation for the wave path
        gsap.to("#wavePath", {
            duration: 10,
            attr: {
                d: "M0,144L48,154.7C96,165,192,187,288,197.3C384,208,480,208,576,192C672,176,768,144,864,128C960,112,1056,112,1152,144C1248,176,1344,240,1392,272L1440,304L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            },
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
        });
    }, []);

    return (
        <Grid
            as="div"
            columns="1fr 1fr"
            rows="1fr 1fr"
            className="relative overflow-hidden h-screen w-full bg-gradient-to-r from-black via-black/75 to-transparent"
        >
            {/* Text Section */}
            <Flex
                as="div"
                justify="start"
                align="start"
                className="pt-5 pl-10 row-span-2 z-10"
                direction="column"
                gap="4"
            >
                <Heading
                    as="h1"
                    size="8"
                    weight="bold"
                    className="text-gray-100 leading-tight relative"
                >
                    El Chuy Vera
                    <Box
                        as="span"
                        className="block h-[3px] w-1/2 bg-blue-500 mt-2"
                    />
                </Heading>
                <Text
                    as="p"
                    size="4"
                    className="text-gray-300 leading-tight"
                >
                    Professional Football Coach
                </Text>
                <Box
                    as="div"
                    className="mt-5 max-w-xl"
                >
                    <Heading
                        as="h2"
                        size="6"
                        weight="medium"
                        className="text-gray-100"
                    >
                        Chuy's Professional Portfolio and Showcase of Achievements and Career.
                    </Heading>
                    <Text
                        as="p"
                        size="4"
                        className="text-gray-300 leading-relaxed pt-1"
                    >
                        As a dedicated football coach, Chuy Vera has spent decades shaping the future of Venezuelan
                        football. His journey has seen him lead top teams like Estudiantes de Mérida, Zamora FC, and
                        Deportivo Táchira to success, while his international experience, including a pivotal role at FC
                        Dallas in the MLS, highlights his expertise in player development and strategic coaching. Chuy's
                        leadership and passion continue to inspire players and teams across the footballing world.
                    </Text>
                </Box>
                <Button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
                >
                    Explore More
                </Button>
            </Flex>

            {/* Simple Wave SVG */}
            <Box
                as="div"
                className="absolute inset-y-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden"
            >
                <svg
                    viewBox="0 0 1440 320"
                    className="w-full h-full fill-current text-gray-900"
                    preserveAspectRatio="none"
                >
                    <path
                        id="wavePath"
                        d="M0,128L48,138.7C96,149,192,171,288,181.3C384,192,480,192,576,176C672,160,768,128,864,112C960,96,1056,96,1152,128C1248,160,1344,224,1392,272L1440,304L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                    ></path>
                </svg>
            </Box>

            {/* Image Section with Improved Styling */}
            <Flex
                as="div"
                align="center"
                justify="center"
                className="relative h-full z-10"
            >
                <Box
                    as="div"
                    className="relative w-[90%] h-[90%] border border-gray-700 rounded-lg shadow-lg overflow-hidden transition-transform duration-500 hover:scale-105"
                >
                    <Image
                        src="/pic/chuyVeraDallasCup.jpg"
                        alt="Coach Chuy Vera at Dallas Cup"
                        fill
                        className="object-cover filter brightness-90 contrast-105 transition-transform duration-500 hover:scale-105"
                        quality={100}
                        priority
                    />
                    <Box
                        as="div"
                        className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"
                    />
                </Box>
            </Flex>
        </Grid>
    );
}

export default WelcomeSection;
