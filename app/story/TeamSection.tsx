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

interface Team {
    id: number;
    name: string;
    image: string;
    dates: string;
    description: string;
}

interface TeamSectionProps {
    team: Team;
}

const TeamSection: React.FC<TeamSectionProps> = ({ team }) => {

    const textThreshold = 1900; // Adjust as needed

    const isTextLong = team.description.length > textThreshold;

    function splitTextAtWord(text: string, limit: number): [string, string] {
        if (text.length <= limit) return [text, ''];
        const index = text.lastIndexOf(' ', limit);
        if (index === -1) return [text, '']; // No space found, don't split
        return [text.substring(0, index), text.substring(index + 1)];
    }

    // Use the function to get better splits
    const [firstPartAdjusted, secondPartAdjusted] = splitTextAtWord(
        team.description,
        textThreshold
    );

    return (
        <Grid
            columns={{ initial: '1fr', md: '1fr 1fr' }}
            gapX="5"
            gapY="1"
            align="start"
            className="mb-12"
        >
            <Box
                as="span"
                className="block h-[3px] w-full bg-primary mt-2 mb-4 col-span-2"
            />
            {/* Image Section */}
            <Box>
                <AspectRatio
                    ratio={16 / 9}
                    className="transform transition-transform duration-200 hover:scale-105"
                >
                    <Box className="relative w-full h-full">
                        <Image
                            src={team.image}
                            alt={team.name}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-lg"
                            priority
                        />
                    </Box>
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
                    <Text
                        as="p"
                        size="3"
                        className="text-gray-300 leading-relaxed"
                    >
                        {firstPartAdjusted}
                    </Text>
                </Flex>
            </Box>

            {/* Overflow Text Section */}
            {isTextLong && secondPartAdjusted && (
                <Box className="md:col-span-2">
                    <Text
                        as="p"
                        size="3"
                        className="text-gray-300 leading-relaxed mt-4"
                    >
                        {secondPartAdjusted}
                    </Text>
                </Box>
            )}
            <Box
                as="span"
                className="block h-[3px] w-full bg-primary mt-2 mb-4 col-span-2"
            />
        </Grid>
    );
};

export default TeamSection;

