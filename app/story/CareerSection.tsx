import React from 'react';
import {
    AspectRatio,
    Box, Button,
    Flex,
    Heading, Link,
    Text,
} from '@radix-ui/themes';
import Image from 'next/image';
import TeamSection from './TeamSection';

interface Team {
    id: number;
    name: string;
    image: string
    dates: string;
    description: string;
}

interface CareerSectionProps {
    title: string;
    subtitle: string;
    headerImage: string;
    ObjectPosition: string;
    editEndpoint: string;
    teams: Team[];
}

const CareerSection: React.FC<CareerSectionProps> = ({
                                                         title,
                                                         subtitle,
                                                         headerImage,
                                                         ObjectPosition,
                                                         teams,
                                                         editEndpoint
                                                     }) => {


    return (
        <Box className=" relative mb-16  w-full h-full">
            {/* Section Header */}
            <Box className="relative mb-8">
                <AspectRatio ratio={16 / 4}>
                    <Image
                        src={headerImage}
                        alt={title}
                        fill
                        className="rounded-lg"
                        style={{
                            filter: 'brightness(0.75) opacity(0.9)',
                            objectFit: 'cover',
                            objectPosition: ObjectPosition,
                        }}
                    />
                    <Box className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"/>
                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        className="absolute inset-0 text-center text-white px-4"
                        gapY="2"
                    >
                        <Heading as="h2" size="7" className="font-bold text-primary">
                            {title}
                        </Heading>
                        <Text as="p" size="4" className="mt-2 max-w-md">
                            {subtitle}
                        </Text>
                        <Link href={`${editEndpoint}/create`}>
                            <Button variant="solid" size="1">
                                Add Team
                            </Button>
                        </Link>
                    </Flex>
                </AspectRatio>

            </Box>

            {/* Teams */}
            {teams.map((team, index) => (
                <TeamSection key={index} team={team} editEndpoint={editEndpoint}/>
            ))}
        </Box>
    );
};

export default CareerSection;
