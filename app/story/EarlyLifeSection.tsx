//story/EarlyLifeSection.tsx

import React from 'react';
import { Section, AspectRatio, Box, Button, Flex, Grid, Heading, Link } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';

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
    const textThreshold = 1020; // Number of characters before splitting
    const isTextLong = content.length > textThreshold;
    const firstPart = isTextLong ? content.substring(0, textThreshold) : content;
    const secondPart = isTextLong ? content.substring(textThreshold) : '';



    return (
        <Section pt="9" px={{ initial: '4', sm: '6', lg: '8' }} aria-labelledby="early-life-title" className="relative w-full mb-16">
            <Grid
                columns={{ initial: '1fr', md: '1fr 1fr' }}
                gapX={{ initial: '4', md: '6' }}
                gapY="3"
                align="start"
            >
                {/* Image Section */}
                <Box>
                    <AspectRatio ratio={4 / 3}>
                        <img
                            src={imageSrc}
                            alt={imageAlt}
                            title={imageAlt}
                            className="w-full h-full object-cover rounded-lg"
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
                    <Box
                        className="text-gray-300 leading-relaxed max-w-prose"
                    >
                        <ReactMarkdown>{firstPart}</ReactMarkdown>
                    </Box>
                </Flex>
                {/* Overflow Text Section */}
                {isTextLong && secondPart && (
                    <Box className="col-span-2">
                        <Box
                            className="text-gray-300 leading-relaxed "
                        >
                            <ReactMarkdown>{secondPart}</ReactMarkdown>
                        </Box>
                    </Box>
                )}
            </Grid>
        </Section>
    );
};

export default EarlyLifeSection;
