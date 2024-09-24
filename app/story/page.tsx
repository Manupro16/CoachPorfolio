// components/StoryPage.tsx

import React from 'react';
import {
    AspectRatio,
    Badge,
    Box,
    Flex,
    Grid,
    Heading,
    Text,
} from '@radix-ui/themes';
import Image from 'next/image';

function StoryPage() {
    // Teams he played for
    const playingTeams = [
        { name: 'Estudiantes de Merida', image: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80', dates: '1985 - 1988' },
        // { name: 'Marítimo SC', image: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80', dates: '1988 - 1990' },
        // { name: 'Universidad de los Andes (ULA)', image: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80', dates: '1990 - 1992' },
        // { name: 'Deportivo Tachira', image: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80', dates: '1992 - 1995' },
        // { name: 'Union Atletico Maracaibo (UAM)', image: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80', dates: '1995 - 1998' },
        // { name: 'Once Caldas de Manizales (Colombia)', image: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80', dates: '1998 - 2000' },
        // { name: 'Santa Fe de Bogota (Colombia)', image: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80', dates: '2000 - 2002' },
    ];

    // Teams he coached
    const coachingTeams = [
        { name: 'Deportivo Tachira FC', image: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80', dates: '2005 - 2008' },
        // { name: 'Deportivo Zamora FC', image: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80', dates: '2008 - 2010' },
        // { name: 'Estudiantes de Merida FC', image: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80', dates: '2010 - 2012' },
        // { name: 'Mineros de Guayana FC', image: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80', dates: '2012 - 2014' },
        // { name: 'FC Dallas Academy', image: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80', dates: '2015 - 2018' },
        // { name: 'Estudiantes de Merida FC', image: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80', dates: '2018 - 2020' },
    ];

    return (
        <section title="story" className="w-screen h-auto relative">
            {/* Background Gradient */}
            <Box
                as="div"
                className="absolute inset-0 bg-gradient-to-r from-black via-primaryDark to-black opacity-30 pointer-events-none z-0"
            />

            {/* Main Content */}
            <Box className="relative z-10 px-4 sm:px-6 lg:px-8 py-5">
                {/* Introduction */}
                <Flex direction="column" align="start" className="text-center mb-16">
                    <Heading
                        as="h1"
                        size="8"
                        weight="bold"
                        className="text-textLight leading-tight"
                        style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)' }}
                    >
                        Jose de Jesus Vera
                    </Heading>
                    <Box as="span" className="block h-[3px] w-1/3 bg-primary mt-2 mb-4" />
                    <Text
                        as="p"
                        size="4"
                        className="text-textMuted max-w-2xl"
                        style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}
                    >
                        The remarkable journey of Coach Chuy Vera as a player and coach.
                    </Text>
                    <Text as="p" size="3" className="text-gray-300 mt-2">
                        Career status: <Badge color="red">Retired</Badge>
                    </Text>
                </Flex>

                {/* Early Life */}
                <Box className="relative  text-center mb-16 pt-10">
                    <Flex align="center" justify="center" gap="2" direction="column">
                        <Heading as="h2" size="7" className="font-bold text-primary">
                            Early Life
                        </Heading>
                        <Box as="span" className="block h-[3px] w-1/2 bg-primary mt-2 mb-4" />
                        <Text as="p" size="3" className="text-gray-300 leading-relaxed">
                            {/* Placeholder text for Early Life */}
                            Lorem ipsum odor amet, consectetuer adipiscing elit. Risus sit gravida magna tincidunt tempor commodo auctor. Nascetur aenean odio porta elementum lobortis lectus. Luctus mi ipsum blandit hac facilisi erat. Dui et feugiat vulputate hac platea diam dictum feugiat. Odio nunc eget penatibus litora fringilla conubia. Arcu elit purus tincidunt, massa porta condimentum eget maecenas. Commodo dictum molestie sociosqu cursus sociosqu fermentum integer.

                            Cubilia sapien gravida penatibus, ultrices quisque ornare. Sodales quisque a sagittis purus placerat dui ex. Feugiat pretium habitant interdum tincidunt inceptos arcu ligula adipiscing. Mi nostra aenean arcu in tortor litora. Platea penatibus ante semper platea ante. Nec cursus integer erat faucibus rhoncus eros efficitur. Faucibus quisque curae ullamcorper curae, dui nostra ligula semper conubia.

                            Ullamcorper posuere hac conubia magna; vestibulum natoque habitasse erat. Bibendum integer aenean risus vivamus pellentesque facilisi. Nibh sit blandit montes habitasse nostra dictumst. Imperdiet nulla tellus curae dictum nam ad blandit. Fermentum pulvinar mi justo nascetur eleifend. Curabitur ultricies maecenas habitasse torquent sollicitudin ullamcorper. Curabitur lobortis dolor semper litora interdum leo. Conubia posuere nostra sed elementum quisque ultrices montes facilisi fusce. Rutrum vitae pulvinar sollicitudin adipiscing turpis elementum ornare.
                        </Text>
                    </Flex>
                </Box>

                {/* Playing Career */}
                <Box className="mb-16">
                    {/* Enhanced Section Header */}
                    <Box className="relative mb-8">
                        <AspectRatio ratio={16 / 2}>
                            <Box className="absolute inset-0 bg-black bg-opacity-50 rounded-lg" />
                            <Flex
                                direction="column"
                                align="center"
                                justify="center"
                                className="absolute inset-0 text-center text-white"
                            >
                                <Heading as="h2" size="7" className="font-bold text-primary ">
                                    Playing Career
                                </Heading>
                                <Text as="p" size="4" className="mt-2 max-w-md">
                                    Discover the journey of Coach Vera as a professional soccer player.
                                </Text>
                            </Flex>
                        </AspectRatio>
                    </Box>
            </Box>

                {playingTeams.map((team, index) => (
                    <Box key={index} className="mb-12">
                        {/* Team Section */}
                        <Grid
                            columns={{ initial: '1fr', md: '1fr 1fr' }}
                            gap="8"
                            className="items-center"
                        >
                            <AspectRatio ratio={16 / 9}>
                                <Image
                                    src={team.image}
                                    alt={team.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </AspectRatio>
                            <Box>
                                <Flex align="center" gap="2">
                                    <Heading
                                        as="h3"
                                        size="5"
                                        className="text-primary"
                                    >
                                        {team.name}
                                    </Heading>
                                    <Badge color="blue">{team.dates}</Badge>
                                </Flex>
                                <Text
                                    as="p"
                                    size="3"
                                    className="text-gray-300 leading-relaxed mt-2"
                                >
                                    {/* Placeholder text */}
                                    Lorem ipsum
                                </Text>
                            </Box>
                        </Grid>
                        {/*<Separator my="3" size="4" color="blue" />*/}
                        <Box as="span" className="block h-[3px] w-full bg-primary mt-6" />
                    </Box>
                ))}



                {/* Coaching Career */}
                <Box className="mb-16">
                    {/* Enhanced Section Header */}
                    <Box className="relative mb-8">
                        <AspectRatio ratio={16 / 2}>
                            <Box className="absolute inset-0 bg-black bg-opacity-50 rounded-lg" />
                            <Flex
                                direction="column"
                                align="center"
                                justify="center"
                                className="absolute inset-0 text-center text-white"
                            >
                                <Heading as="h2" size="7" className="font-bold text-primary">
                                    Coaching Career
                                </Heading>
                                <Text as="p" size="4" className="mt-2 max-w-md">
                                    Explore the impactful coaching journey of Coach Vera.
                                </Text>
                            </Flex>
                        </AspectRatio>
                    </Box>

                    {coachingTeams.map((team, index) => (
                        <Box key={index} className="mb-12">
                            {/* Team Section */}
                            <Grid
                                columns={{ initial: '1fr', md: '1fr 1fr' }}
                                gap="8"
                                className="items-center"
                            >
                                <AspectRatio ratio={16 / 9}>
                                    <Image
                                        src={team.image}
                                        alt={team.name}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-lg"
                                    />
                                </AspectRatio>
                                <Box>
                                    <Flex align="center" gap="2">
                                        <Heading
                                            as="h3"
                                            size="5"
                                            className="text-primary"
                                        >
                                            {team.name}
                                        </Heading>
                                        <Badge color="blue">{team.dates}</Badge>
                                    </Flex>
                                    <Text
                                        as="p"
                                        size="3"
                                        className="text-gray-300 leading-relaxed mt-2"
                                    >
                                        {/* Placeholder text */}
                                        Lorem ipsum
                                    </Text>
                                </Box>
                            </Grid>
                            {/*<Separator my="3" size="4" color="blue" />*/}
                            <Box as="span" className="block h-[3px] w-full bg-primary mt-6" />
                        </Box>
                    ))}
                </Box>

                {/* Closing Section */}
                <Flex justify="center" className="mt-8">
                    <Text
                        as="p"
                        size="3"
                        className="text-gray-300 leading-relaxed max-w-xl text-center"
                    >
                        Coach Chuy Vera's dedication to soccer has left an indelible mark on
                        the sport. His journey continues to inspire players and coaches
                        around the world.
                    </Text>
                </Flex>
            </Box>
        </section>
    );
}

export default StoryPage;



