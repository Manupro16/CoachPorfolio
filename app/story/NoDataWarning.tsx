import {Box, Flex, Grid, Heading} from "@radix-ui/themes";
import IntroductionSection from "@/app/story/IntroductionSection";
import React from "react";

function NoDataWarning() {
    return (
        <section title="story" className="w-screen h-auto relative">
            {/* Background Gradient */}
            <Box
                as="div"
                className="absolute inset-0 bg-gradient-to-r from-black via-primaryDark to-black opacity-30 pointer-events-none z-0"
            />
            {/* Top SVG Wave */}
            <Box
                as="div"
                className="absolute inset-x-0 top-0 w-full h-[15%] pointer-events-none z-0 overflow-hidden"
            >
                <svg
                    viewBox="0 0 1728 320"
                    className="w-full h-full fill-current text-primaryDark opacity-30"
                    preserveAspectRatio="none"
                >
                    <path
                        id="showcaseWavePathTop"
                        d="M0,192 C144,160,288,128,432,133.3 C576,138.7,720,170.7 864,165.3 C1008,160,1152,117,1296,101.3 C1440,85.3,1584,96,1728,106.7 L1728,0 L0,0 Z"
                    ></path>
                </svg>
            </Box>
            <Grid as="div" columns="1fr" rows="auto">
                <IntroductionSection playerStatus="Retired" coachStatus="Active"/>
                <Flex as="div" align="start" justify="center" className="w-screen h-screen ">
                    <Heading
                        as="h1"
                        size="5"
                        weight="bold"
                        className="text-textLight leading-tight "
                        style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)'}}
                    >
                        No story data available
                    </Heading>
                </Flex>
            </Grid>
        </section>
    );
}


export default NoDataWarning;
