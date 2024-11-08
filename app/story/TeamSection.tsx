'use client'

import React, {useState} from 'react';
import {
    AspectRatio,
    Badge,
    Box,
    Button,
    Card,
    Flex,
    Grid,
    Heading,
    Link,
    Text,
} from '@radix-ui/themes';
import Image from 'next/image';
import { ArrowDownIcon, ArrowUpIcon} from '@radix-ui/react-icons'

interface Team {
    id: number;
    name: string;
    image: string;
    dates: string;
    description: string;
}

interface TeamSectionProps {
    team: Team;
    editEndpoint: string; // Endpoint to edit the player's story
}

const TeamSection: React.FC<TeamSectionProps> = ({team, editEndpoint}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const textThreshold = 1490; // Adjust as needed

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

    const endpoint = `${editEndpoint}/${team.id}`;

    return (
        <Grid columns="1fr" gapX="5" gapY="1" align="start" className="mb-12">
            <Card
                size="2"
                className="inset-0 bg-gradient-to-r from-black via-blue-950  to-black opacity-90"
            >
                <Grid
                    columns={{initial: '1fr', md: '1fr 1fr'}}
                    gapX="5"
                    gapY="1"
                    align="start"
                >
                    {/* Image Section */}
                    <Box>
                        <AspectRatio
                            ratio={4 / 3}
                            className="transform transition-transform duration-200 hover:scale-105"
                        >
                            <Box className="relative w-full h-full">
                                <Image
                                    src={team.image}
                                    alt={team.name}
                                    fill
                                    style={{objectFit: 'cover'}}
                                    className="rounded-lg"
                                    priority
                                />
                            </Box>
                        </AspectRatio>
                    </Box>

                    {/* Text Section */}
                    <Box>
                        <Flex direction="column" gap="2">
                            <Flex
                                justify="between"
                                align="center"
                                gap="4"
                                direction="row"
                                className="pr-6"
                            >
                                <Flex as="div" align="center" gap="2">
                                    <Heading as="h3" size="5" className="text-white">
                                        {team.name}
                                    </Heading>
                                    <Badge color="blue">{team.dates}</Badge>
                                </Flex>

                                <Link href={endpoint}>
                                    <Button variant="solid" size="1" className="flex items-center">
                                        Edit Team
                                    </Button>
                                </Link>
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
                    {/* Read More Button */}
                    {isTextLong && !isExpanded && (
                        <Flex justify="center" align="center" gap="2" className="col-span-2 mt-5 ">

                            <Button
                                variant="ghost"
                                size="2"
                                onClick={() => setIsExpanded(true)}
                                className="self-start  "
                                aria-expanded={isExpanded}
                            >
                                <ArrowDownIcon className="w-4 h-4" /> Read More
                            </Button>
                        </Flex>
                    )}
                </Grid>
                {/* Overflow Text Section */}
                {isExpanded && secondPartAdjusted && (
                    <Box className="mt-4">
                        <Text
                            as="p"
                            size="3"
                            className="text-gray-300 leading-relaxed"
                        >
                            {secondPartAdjusted}
                        </Text>
                        <Flex justify="center" align="center" gap="2" className="mt-8">
                            {/* Read Less Button */}
                            <Button
                                variant="ghost"
                                size="2"
                                onClick={() => setIsExpanded(false)}
                                className="mt-2 self-start"
                                aria-expanded={isExpanded}
                            >
                                <ArrowUpIcon className="w-4 h-4" /> Read Less
                            </Button>
                        </Flex>
                    </Box>
                )}
            </Card>
        </Grid>
    );
};

export default TeamSection;
