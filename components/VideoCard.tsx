// components/VideoCard.tsx

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flex, Heading, Text, Card, Box, Badge } from '@radix-ui/themes';

interface VideoCardProps {
    team: string;
    season: string;
    videoSrc: string;
    description: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
                                                 team,
                                                 season,
                                                 videoSrc,
                                                 description,
                                             }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <Card className="bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-md border border-gray-700 rounded-xl shadow-xl overflow-hidden transform transition-transform duration-300">
            <Flex
                direction="column"
                align="center"
                justify="center"
                className="p-6 h-full"
            >
                <Heading
                    size="4"
                    className="text-gray-100 mb-2 font-sans text-center"
                >
                    {team}
                </Heading>
                <Badge className="bg-blue-600 text-white mb-4">{season}</Badge>
                <Box className="w-full mb-4 flex justify-center">
                    <video
                        src={videoSrc}
                        controls
                        className="rounded-lg w-full max-w-full"
                        poster="/images/video-placeholder.jpg"
                        aria-label={`Video highlights of ${team} during the ${season}`}
                    />
                </Box>
                <Text
                    size="3"
                    className="text-gray-300 text-center font-sans leading-relaxed"
                >
                    {description}
                </Text>
            </Flex>
        </Card>
    </motion.div>
);

export default VideoCard;
