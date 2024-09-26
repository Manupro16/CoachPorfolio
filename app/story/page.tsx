// components/StoryPage.tsx

import React from 'react';
import {Box, Grid,} from '@radix-ui/themes';
import IntroductionSection from "@/app/story/IntroductionSection";
import EarlyLifeSection from "@/app/story/EarlyLifeSection";
import CareerSection from "@/app/story/CareerSection";
import ClosingSection from "@/app/story/ClosingSection";

function StoryPage() {
    // Teams he played for
    const playingTeams = [
        { name: 'Estudiantes de Merida', image: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80', dates: '1985 - 1988', description: "Estudiantes de merida" },
        { name: 'Marítimo SC', image: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80', dates: '1988 - 1990', description: "Marítimo SC" },
        // { name: 'Universidad de los Andes (ULA)', image: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80', dates: '1990 - 1992' },
        // { name: 'Deportivo Tachira', image: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80', dates: '1992 - 1995' },
        // { name: 'Union Atletico Maracaibo (UAM)', image: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80', dates: '1995 - 1998' },
        // { name: 'Once Caldas de Manizales (Colombia)', image: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80', dates: '1998 - 2000' },
        // { name: 'Santa Fe de Bogota (Colombia)', image: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80', dates: '2000 - 2002' },
    ];

    // Teams he coached
    const coachingTeams = [
        { name: 'Deportivo Tachira FC', image: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80', dates: '2005 - 2008', description: 'Deportivo Tachira FC' },
        // { name: 'Deportivo Zamora FC', image: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80', dates: '2008 - 2010' },
        // { name: 'Estudiantes de Merida FC', image: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80', dates: '2010 - 2012' },
        // { name: 'Mineros de Guayana FC', image: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80', dates: '2012 - 2014' },
        // { name: 'FC Dallas Academy', image: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80', dates: '2015 - 2018' },
        // { name: 'Estudiantes de Merida FC', image: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80', dates: '2018 - 2020' },
    ];

    const fullText = `Lorem ipsum odor amet, consectetuer adipiscing elit. Vivamus cursus maecenas dui elit rhoncus aenean. Integer pellentesque auctor facilisis; nibh vivamus montes. Finibus inceptos magnis suscipit ipsum ut condimentum id eget. Ut senectus porta id et bibendum. Ante senectus nunc egestas sollicitudin inceptos condimentum tempus. Torquent nisl potenti aptent dapibus aliquet metus dictum. Est lacinia pellentesque mauris; blandit maximus inceptos. Justo ornare sem facilisis, sed tristique volutpat. Fringilla tempus mus consequat lorem potenti nisi.

Quisque gravida ut tincidunt odio pulvinar congue nunc. Aptent etiam sit urna fames consectetur mollis. Litora fames turpis tincidunt mus sapien. Natoque sociosqu fringilla tempus vehicula molestie. Habitasse scelerisque consequat sodales neque efficitur rhoncus. Ut egestas tellus nec feugiat commodo cras dui eu. Gravida phasellus suspendisse; parturient fermentum ut nostra leo. Vitae magnis eleifend in sagittis bibendum ullamcorper sollicitudin. Cursus tempor tincidunt lacus ante vulputate, posuere dignissim torquent. Proin class turpis montes dictum inceptos netus ex.

Lacinia arcu facilisi phasellus viverra litora varius malesuada. Avehicula vitae curae lacus hendrerit. Arcu sem interdum venenatis odio integer fames ipsum consectetur suscipit. Eu laoreet nec rutrum ex, fringilla torquent. Congue molestie libero inceptos mattis sagittis. Libero ornare interdum integer taciti torquent duis convallis ante. Etiam lectus sodales platea eros purus convallis penatibus.

Aliquet inceptos convallis nec vitae accumsan eros venenatis viverra. Integer montes facilisi sagittis taciti habitant. Interdum risus aptent proin porttitor taciti. Himenaeos id eget consequat malesuada ridiculus tincidunt convallis magna. Ullamcorper inceptos purus conubia euismod vehicula. Arcu ut taciti venenatis imperdiet conubia mus ligula. Pretium nunc dictum leo ullamcorper adipiscing suscipit.

Duis facilisis tincidunt facilisis rhoncus proin. Eros odio egestas congue, tortor sed feugiat. Feugiat libero convallis vel orci egestas accumsan sit. Congue egestas ornare facilisi commodo fermentum varius quam. Porta metus laoreet interdum ultrices maecenas tempus nunc pretium. Himenaeos phasellus habitant interdum urna blandit sociosqu praesent integer. Nec lobortis finibus arcu proin semper congue tempus dictum urna? Vulputate ipsum lobortis platea iaculis volutpat cursus mi a. Ex finibus lorem phasellus sociosqu ultrices.`; // Replace with your actual content


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
                        id="showcaseWavePathTop" // Add ID for GSAP animation
                        d="M0,192 C144,160,288,128,432,133.3 C576,138.7,720,170.7 864,165.3 C1008,160,1152,117,1296,101.3 C1440,85.3,1584,96,1728,106.7 L1728,0 L0,0 Z"
                    ></path>
                </svg>
            </Box>
            {/* Main Content */}
            <Grid as="div" columns="1fr" rows="auto"  >
                <IntroductionSection playerStatus="Retired" coachStatus="Active" />
                <EarlyLifeSection imageSrc="https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80" imageAlt="Early Life" title="Early Life" content={fullText}  />

                <CareerSection   title="Playing Career"
                                     subtitle="Discover the journey of Coach Vera as a professional soccer player."
                                     headerImage="/pic/chuyVeraSeleccion_2.jpg"
                                     ObjectPosition="top"
                                     teams={playingTeams}
                />
                {/* Coaching Career */}
                <CareerSection
                    title="Coaching Career"
                    subtitle="Explore the impactful coaching journey of Coach Vera."
                    headerImage="/pic/Chuy-Vera1.webp"
                    ObjectPosition="center"
                    teams={coachingTeams}
                />
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





            {/*<Box className="relative z-10 px-4 sm:px-6 lg:px-8 py-5">*/}









            {/*    /!* Closing Section *!/*/}

            {/*</Box>*/}
