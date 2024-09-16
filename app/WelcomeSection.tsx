'use client';

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { Box, Flex, Grid, Heading, Text, Button } from "@radix-ui/themes";
import Image from "next/image";

// GSAP Animation
const useWaveAnimation = () => {
    useEffect(() => {
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
};

const WelcomeHeading = () => (
    <Heading
        as="h1"
        size="8"
        weight="bold"
        className="text-gray-100 leading-tight relative"
        style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)' }}
    >
        El Chuy Vera
        <Box as="span" className="block h-[3px] w-1/2 bg-blue-500 mt-2" />
    </Heading>
);

const Subheading = () => (
    <Text
        as="p"
        size="4"
        className="text-gray-300 leading-tight"
        style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}
    >
        Professional Football Coach
    </Text>
);

const Description = () => (
    <Box as="div" className="mt-5 max-w-xl">
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
);

const CallToAction = () => (
    <Button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
    >
        Explore More
    </Button>
);

const ImageSection = () => (
    <Flex
        as="div"
        align="center"
        justify="center"
        className="relative h-full z-10 row-span-1"
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
);

const WaveBackground = () => (
    <Box
        as="div"
        className="absolute inset-y-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    >
        <svg
            viewBox="0 0 1440 320"
            className="w-full h-full fill-current text-blue-900 opacity-30"
            preserveAspectRatio="none"
        >
            <path
                id="wavePath"
                d="M0,128L48,138.7C96,149,192,171,288,181.3C384,192,480,192,576,176C672,160,768,128,864,112C960,96,1056,96,1152,128C1248,160,1344,224,1392,256L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            />
        </svg>
    </Box>
);

const WelcomeEntry = () => (
    <Flex
        as="div"
        align="center"
        justify="center"
        direction="column"
        className="col-span-2 row-start-2 text-center "
    >
        <Heading
            as="h2"
            size="8"
            className="text-gray-100 tracking-wide"
            style={{
                fontSize: '2rem',
                textShadow: '2px 2px 3px rgba(0, 0, 0, 0.7)',
                letterSpacing: '0.1em',
            }}
        >
            Welcome to the Journey of Excellence
        </Heading>
        <Text
            as="p"
            size="5"
            className="text-gray-300 leading-relaxed pt-6 max-w-2xl"
            style={{
                fontSize: '1.25rem',
                lineHeight: '1.75',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
            }}
        >
            Explore the world of Chuy Vera, a dedicated football coach who has inspired countless players and teams throughout his illustrious career. Here, you'll find a showcase of his achievements, philosophy, and the impact he's made on the footballing world. Prepare to be inspired as you delve into the story of a coach whose passion and expertise have transcended borders.
        </Text>
        <Box as="div" className="absolute inset-x-0 bottom-0">
            <svg
                viewBox="0 0 1440 320"
                className="w-full h-22 fill-current  text-blue-900 opacity-30"
                preserveAspectRatio="none"
            >
                <path
                    d="M0,256L48,224C96,192,192,128,288,106.7C384,85,480,107,576,122.7C672,139,768,149,864,144C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
            </svg>
        </Box>
    </Flex>
);

function WelcomeSection() {
    useWaveAnimation();

    return (
        <section className="relative overflow-hidden">
            <Box as="div" className="absolute inset-0 bg-gradient-to-r from-black to-black via-blue-900  opacity-30" />
            <Grid
                as="div"
                columns="1fr 1fr"
                rows="1fr 1fr"
                className="relative overflow-hidden h-screen w-full"
            >
                <Flex
                    as="div"
                    justify="start"
                    align="start"
                    className="pt-5 pl-10 z-10 row-span-1"
                    direction="column"
                    gap="4"
                >
                    <WelcomeHeading />
                    <Subheading />
                    <Description />
                    <CallToAction />
                </Flex>

                <ImageSection />
                <WaveBackground />
                <WelcomeEntry />
            </Grid>
        </section>
    );
}

export default WelcomeSection;
