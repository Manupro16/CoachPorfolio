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
    name: string;
    image: string;
    dates: string;
    description: string;
}

interface TeamSectionProps {
    team: Team;
}

const TeamSection: React.FC<TeamSectionProps> = ({ team }) => {
    return (
        <Grid
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
                    <Text
                        as="p"
                        size="3"
                        className="text-gray-300 leading-relaxed"
                    >
                        {team.description}
                    </Text>
                </Flex>
            </Box>
        </Grid>
    );
};

export default TeamSection;
