// components/StoryPage.tsx

import React from 'react';
import {
    AspectRatio,
    Badge,
    Box,
    Flex,
    Grid,
    Heading,
    Quote,
    Text,
} from '@radix-ui/themes';
import Image from 'next/image';

function StoryPage() {
    // Teams he played for
    const playingTeams = [
        { name: 'Estudiantes de Merida', image: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80', dates: '1985 - 1988' },
        { name: 'Marítimo SC', image: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80', dates: '1988 - 1990' },
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
                <Flex
                    direction="column"
                    align="center"
                    className="text-center mb-16 px-4 sm:px-6 lg:px-8"
                >
                    <Heading
                        as="h1"
                        size="8"
                        weight="bold"
                        className="text-white leading-tight"
                        style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)' }}
                    >
                        Jose de Jesus Vera
                    </Heading>
                    <Box as="span" className="block h-[3px] w-1/3 bg-primary mt-2 mb-4" />
                    <Text
                        as="p"
                        size="4"
                        className="text-gray-200 max-w-2xl"
                        style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}
                    >
                        The remarkable journey of Jose De Jesus Vera, most known as <Quote>El Chuy Vera</Quote>, as a player and coach. In this section, we highlight his time playing for and coaching various teams, tracing his long journey from a young age to becoming a legendary athlete and coach.
                    </Text>
                    <Text as="p" size="3" className="text-gray-300 mt-2">
                        Player Career status: <Badge color="red">Retired</Badge>
                    </Text>
                    <Text as="p" size="3" className="text-gray-300 mt-2">
                        Coaching Career status: <Badge color="green">Active</Badge>
                    </Text>
                </Flex>
                {/* Early Life */}
                <Box className="relative w-full mb-16 pt-10 px-4 sm:px-6 lg:px-8">
                    <Grid
                        columns={{ initial: '1fr', md: '1fr 1fr' }}
                        gap="8"
                        align="start"
                    >
                        {/* Image Section */}
                        <Box>
                            <AspectRatio ratio={4 / 3}>
                                <Image
                                    src="https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80"
                                    alt="Jose de Jesus Vera in his early years"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </AspectRatio>
                        </Box>

                        {/* Text Section */}
                        <Flex
                            direction="column"
                            align={{ initial: 'center', md: 'start' }}
                            className="text-center md:text-left"
                        >
                            <Heading as="h2" size="7" className="font-bold text-primary">
                                Early Life
                            </Heading>
                            <Box as="span" className="block h-[3px] w-1/2 bg-primary mt-2 mb-4" />
                            <Text
                                as="p"
                                size="3"
                                className="text-gray-300 leading-relaxed max-w-prose"
                            >
                                {/* Replace with actual content */}
                                Lorem ipsum odor amet, consectetuer adipiscing elit. Vivamus cursus maecenas dui elit rhoncus aenean. Integer pellentesque auctor facilisis; nibh vivamus montes. Finibus inceptos magnis suscipit ipsum ut condimentum id eget. Ut senectus porta id et bibendum. Ante senectus nunc egestas sollicitudin inceptos condimentum tempus. Torquent nisl potenti aptent dapibus aliquet metus dictum. Est lacinia pellentesque mauris; blandit maximus inceptos. Justo ornare sem facilisis, sed tristique volutpat. Fringilla tempus mus consequat lorem potenti nisi.

                                Quisque gravida ut tincidunt odio pulvinar congue nunc. Aptent etiam sit urna fames consectetur mollis. Litora fames turpis tincidunt mus sapien. Natoque sociosqu fringilla tempus vehicula molestie. Habitasse scelerisque consequat sodales neque efficitur rhoncus. Ut egestas tellus nec feugiat commodo cras dui eu. Gravida phasellus suspendisse; parturient fermentum ut nostra leo. Vitae magnis eleifend in sagittis bibendum ullamcorper sollicitudin. Cursus tempor tincidunt lacus ante vulputate, posuere dignissim torquent. Proin class turpis montes dictum inceptos netus ex.

                                Lacinia arcu facilisi phasellus viverra litora varius malesuada. Avehicula vitae curae lacus hendrerit. Arcu sem interdum venenatis odio integer fames ipsum consectetur suscipit. Eu laoreet nec rutrum ex, fringilla torquent. Congue molestie libero inceptos mattis sagittis. Libero ornare interdum integer taciti torquent duis convallis ante. Etiam lectus sodales platea eros purus convallis penatibus.

                                Aliquet inceptos convallis nec vitae accumsan eros venenatis viverra. Integer montes facilisi sagittis taciti habitant. Interdum risus aptent proin porttitor taciti. Himenaeos id eget consequat malesuada ridiculus tincidunt convallis magna. Ullamcorper inceptos purus conubia euismod vehicula. Arcu ut taciti venenatis imperdiet conubia mus ligula. Pretium nunc dictum leo ullamcorper adipiscing suscipit.

                                Duis facilisis tincidunt facilisis rhoncus proin. Eros odio egestas congue, tortor sed feugiat. Feugiat libero convallis vel orci egestas accumsan sit. Congue egestas ornare facilisi commodo fermentum varius quam. Porta metus laoreet interdum ultrices maecenas tempus nunc pretium. Himenaeos phasellus habitant interdum urna blandit sociosqu praesent integer. Nec lobortis finibus arcu proin semper congue tempus dictum urna? Vulputate ipsum lobortis platea iaculis volutpat cursus mi a. Ex finibus lorem phasellus sociosqu ultrices.

                            </Text>
                        </Flex>
                    </Grid>
                </Box>

                {/* Playing Career */}
                <Box className="mb-16">
                    {/* Enhanced Section Header */}
                    <Box className="relative">
                        <AspectRatio ratio={16 / 4}>
                            <Image
                                src="/pic/chuyVeraSeleccion_2.jpg"
                                alt="Playing Career"
                                layout="fill"
                                objectFit="cover"
                                objectPosition="top" // Move the image context to the top
                                className="rounded-lg"
                                style={{ filter: 'brightness(0.75) opacity(0.9)' }}  // Combine brightness and opacity
                            />
                            <Box className="absolute inset-0 bg-black bg-opacity-50 rounded-lg" />
                            <Flex
                                direction="column"
                                align="center"
                                justify="center"
                                className="absolute inset-0 text-center text-white px-4"
                            >
                                <Heading as="h2" size="7" className="font-bold text-primary">
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
                    <Grid
                        key={index}
                        as="div"
                        columns={{ initial: '1fr', md: '1fr 1fr' }}
                        gap="8"
                        align="start"
                        className="mb-12"
                    >
                        {/* Image Section */}
                        <Box>
                            <AspectRatio
                                ratio={16 / 9}
                                className="transform transition-transform duration-200 hover:scale-105"
                            >
                                <Image
                                    src={team.image}
                                    alt={team.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                    priority
                                />
                            </AspectRatio>
                        </Box>
                        {/* Text Section */}
                        <Box>
                            <Flex direction="column" gap="2">
                                <Flex align="center" gap="2">
                                    <Heading as="h3" size="5" className="text-primary">
                                        {team.name}
                                    </Heading>
                                    <Badge color="blue">{team.dates}</Badge>
                                </Flex>
                                <Text as="p" size="3" className="text-gray-300 leading-relaxed">
                                    {/* Replace with actual content */}
                                    Lorem ipsum odor amet, consectetuer adipiscing elit. Nec dignissim velit penatibus feugiat accumsan varius. Finibus rutrum mollis suscipit suspendisse sodales feugiat mattis. Quam sapien tellus aliquet viverra, mauris viverra tristique cras. Turpis dictum vulputate cubilia parturient netus tristique mi. Libero maecenas augue aliquam accumsan mattis luctus tortor tortor. Pellentesque neque netus placerat quam eros eleifend. Accumsan ipsum taciti ultrices pulvinar scelerisque potenti ridiculus erat. Consequat tellus volutpat aliquet, vitae quisque leo cubilia quisque. Interdum eros tempor, leo ex integer varius.

                                    Lectus praesent suspendisse adipiscing habitasse vitae, faucibus dictumst eleifend. Mollis eget aenean accumsan rutrum lobortis laoreet nisl. Sem orci vitae amet viverra et orci condimentum. Facilisis nostra non diam vestibulum nulla consequat curae donec. Cursus primis himenaeos class; habitasse gravida elementum ex arcu. Porta senectus sodales facilisi tincidunt porta mattis vel consectetur. Natoque dignissim molestie netus fermentum; habitant morbi mauris. Dapibus per pellentesque habitant ullamcorper convallis praesent eget id donec. Luctus gravida facilisis curabitur ultrices praesent lacus.

                                    Pellentesque nisi elementum taciti purus mauris. Interdum et velit nunc erat interdum ante et? Libero elit congue commodo eros metus; semper ut. Torquent vehicula consequat fusce dui; vitae conubia. Nec at fermentum sodales arcu varius habitasse dapibus nam. Rutrum ex erat lacus placerat; commodo orci lectus non ridiculus. Eleifend aliquet convallis nascetur sem risus gravida sit. Erat ultrices sodales sagittis venenatis viverra metus varius dolor dolor. Ultrices pulvinar fusce lacinia placerat; rhoncus nisl eleifend.

                                    Dictum dictum commodo, libero ridiculus aptent vel neque augue. Viverra vivamus sit eget dis faucibus ligula. Torquent dictumst consectetur semper ex eget laoreet aliquam consequat quisque. Curae parturient massa tristique luctus rutrum. Lacus consectetur dolor facilisis curabitur dis nostra. In litora vel penatibus dignissim fringilla pulvinar nec potenti viverra.

                                    Nec neque iaculis rutrum risus ex tempus pharetra. Lacinia potenti vel elementum pretium lobortis at magnis dignissim donec. Id ornare lectus tortor nostra aptent hac. Nostra primis ante dapibus mauris feugiat. Mollis molestie orci fringilla molestie per semper pulvinar phasellus. Urna non congue integer ullamcorper luctus. Vel hendrerit tortor consectetur tempus odio litora litora sociosqu sapien.
                                </Text>
                            </Flex>
                        </Box>
                    </Grid>
                ))}


                {/* Coaching Career */}
                <Box className="mb-16">
                    {/* Enhanced Section Header */}
                    <Box className="relative mb-8">
                        <AspectRatio ratio={16 / 4}>
                            <Image
                                src="/pic/Chuy-Vera1.webp"
                                alt="Coaching Career"
                                layout="fill"
                                objectFit="cover"
                                objectPosition="center" // Move the image context to the top
                                className="rounded-lg"
                            />
                            <Box className="absolute inset-0 bg-black bg-opacity-50 rounded-lg" />
                            <Flex
                                direction="column"
                                align="center"
                                justify="center"
                                className="absolute inset-0 text-center text-white px-4"
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





