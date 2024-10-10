// story/StoryPage.tsx

import React from 'react';
import {Box, Grid,} from '@radix-ui/themes';
import IntroductionSection from "@/app/story/IntroductionSection";
import ClosingSection from "@/app/story/ClosingSection";
import NoDataWarning from "@/app/story/NoDataWarning";
import { prisma } from "@/lib/prisma";
import EarlyLifeSection from "@/app/story/EarlyLifeSection";
import CareerSection from './CareerSection';

async function StoryPage() {

    // Fetch data in parallel
    const [earlyLife, playerCareers, coachingCareers] = await Promise.all([
        prisma.earlyLife.findUnique({ where: { id: 1 } }),
        prisma.playerCareer.findMany({ orderBy: { id: 'asc' } }),
        prisma.coachingCareer.findMany( { orderBy: { id: 'asc' } }),
    ]);

    // Determine the image source for EarlyLifeSection
    let imageSrc = '';
    if (earlyLife) {
        if (earlyLife.image) {
            imageSrc = earlyLife.image;
        } else if (earlyLife.imageData) {
            imageSrc = '/api/story/early-life/image';
        }
    }


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
            {/* Main Content */}
            <Grid as="div" columns="1fr" rows="auto">
                <IntroductionSection playerStatus="Retired" coachStatus="Active"/>
                {earlyLife ? <EarlyLifeSection
                    imageSrc={imageSrc}
                    imageAlt="Early Life"
                    title={earlyLife.title}
                    content={earlyLife.content}
                /> : <NoDataWarning ChildrenComponentName="earlyLife"/>}
                {playerCareers.length > 0 ? (
                    <CareerSection
                        title="Playing Career"
                        headerImage="/pic/chuyVeraSeleccion_2.jpg"
                        ObjectPosition="top"
                        subtitle="Discover the journey of Coach Vera as a professional soccer player."
                        teams={playerCareers.map((career) => ({
                            name: career.team,
                            image: career.image,
                            dates: career.dates,
                            description: career.description,
                        }))}
                    />
                ) : (
                    <NoDataWarning ChildrenComponentName="PlayerCareer" />
                )}
                {coachingCareers.length > 0 ? (
                    <CareerSection
                        title="Coaching Career"
                        subtitle="Explore the impactful coaching journey of Coach Vera."
                        headerImage="/pic/Chuy-Vera1.webp"
                        ObjectPosition="center"
                        teams={coachingCareers.map((career) => ({
                            name: career.team,
                            image: career.image,
                            dates: career.dates,
                            description: career.description,
                        }))}
                    />
                ) : (
                    <NoDataWarning ChildrenComponentName="CoachingCareer" />
                )}
                <ClosingSection
                    text="Coach Chuy Vera's dedication to soccer has left an indelible mark on the sport. His journey continues to inspire players and coaches around the world."
                />
            </Grid>
            {/* Bottom SVG Wave */}
            <Box
                as="div"
                className="absolute inset-x-0 bottom-0 w-full h-[5%]"
            >
                <svg
                    viewBox="0 0 1440 320"
                    className="w-full h-full fill-current text-primaryDark opacity-30"
                    preserveAspectRatio="none"
                >
                    <path
                        id="wavePathBottom"
                        d="M0,256L48,224C96,192,192,128,288,106.7C384,85,480,107,576,122.7C672,139,768,149,864,144C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    />
                </svg>
            </Box>
        </section>
    );
}

export default StoryPage;


