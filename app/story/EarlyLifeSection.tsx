//story/EarlyLifeSection.tsx

import React from 'react';
import { AspectRatio, Box, Button, Flex, Grid, Heading, Link, Text } from '@radix-ui/themes';
import Image from 'next/image';

interface EarlyLifeSectionProps {
    imageSrc: string;
    imageAlt: string;
    title: string;
    content: string;
}

const EarlyLifeSection: React.FC<EarlyLifeSectionProps> = ({
                                                               imageSrc,
                                                               imageAlt,
                                                               title,
                                                               content,
                                                           }) => {
    const textThreshold = 1650; // Number of characters before splitting
    const isTextLong = content.length > textThreshold;
    const firstPart = isTextLong ? content.substring(0, textThreshold) : content;
    const secondPart = isTextLong ? content.substring(textThreshold) : '';


    return (
        <Box className="relative w-full mb-16 pt-10 px-4 sm:px-6 lg:px-8">
            <Grid
                columns={{ initial: '1fr', md: '1fr 1fr' }}
                gapX="5"
                gapY="3"
                align="start"
            >
                {/* Image Section */}
                <Box>
                    <AspectRatio ratio={4 / 3}>
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            title={imageAlt}
                            style={{ objectFit: 'cover' }}
                            fill
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
                    <Flex gap="4" align="center">
                        <Heading as="h2" size="7" className="font-bold text-primary">
                            {title}
                        </Heading>
                        <Link href="/story/edit/earlyLife" >
                            <Button variant="solid" size="1">
                                Edit Early Life
                            </Button>
                        </Link>
                    </Flex>
                    <Box
                        as="span"
                        className="block h-[3px] w-1/2 bg-primary mt-2 mb-4"
                    />
                    <Text
                        as="p"
                        size="3"
                        className="text-gray-300 leading-relaxed max-w-prose"
                    >
                        {firstPart}
                    </Text>
                </Flex>
                {/* Overflow Text Section */}
                {isTextLong && secondPart && (
                    <Box className="col-span-2">
                        <Text
                            as="p"
                            size="3"
                            className="text-gray-300 leading-relaxed mt-4"
                        >
                            {secondPart}
                        </Text>
                    </Box>
                )}
            </Grid>
        </Box>
    );
};

export default EarlyLifeSection;
