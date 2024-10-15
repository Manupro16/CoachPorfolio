import React from 'react';
import {
    AspectRatio,
    Box,
    Flex,
    Heading,
    Text,
} from '@radix-ui/themes';
import Image from 'next/image';
import TeamSection from './TeamSection';

interface Team {
    name: string;
    image: string | null;
    imageSource: 'URL' | 'UPLOAD'; // New field to determine image source
    dates: string;
    description: string;
}

interface CareerSectionProps {
    title: string;
    subtitle: string;
    headerImage: string;
    ObjectPosition: string;
    teams: Team[];
}

const CareerSection: React.FC<CareerSectionProps> = ({
                                                         title,
                                                         subtitle,
                                                         headerImage,
                                                         ObjectPosition,
                                                         teams,
                                                     }) => {

    // Determine image source based on whether it's a URL or an uploaded file
    const getImageSrc = (team: Team) => {
        if (team.imageSource === 'URL' && team.image) {
            return team.image; // Use image URL from the database
        } else if (team.imageSource === 'UPLOAD') {
            return `/api/story/career/image/${team.name}`; // Use API endpoint for uploaded image
        }
        return '/default-placeholder-image.jpg'; // Fallback image in case of no image
    };



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
                        style={{ filter: 'brightness(0.75) opacity(0.9)', objectFit: 'cover', objectPosition: ObjectPosition,   }}
                    />
                    <Box className="absolute inset-0 bg-black bg-opacity-50 rounded-lg" />
                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        className="absolute inset-0 text-center text-white px-4"
                    >
                        <Heading as="h2" size="7" className="font-bold text-primary">
                            {title}
                        </Heading>
                        <Text as="p" size="4" className="mt-2 max-w-md">
                            {subtitle}
                        </Text>
                    </Flex>
                </AspectRatio>
            </Box>

            {/* Teams */}
            {teams.map((team, index) => (
                <TeamSection key={index} team={{ ...team, image: getImageSrc(team) }} />
            ))}
        </Box>
    );
};

export default CareerSection;
