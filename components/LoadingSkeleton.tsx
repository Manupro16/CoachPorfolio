// components/LoadingSkeleton.tsx

import React from 'react';
import { Box, Flex, Skeleton } from '@radix-ui/themes';

const LoadingSkeleton = () => {
    return (
        <Box className="shadow-md rounded-lg p-8 w-full max-w-3xl bg-gray-900 space-y-6">
            {/* Skeleton for Title Field */}
            <Box>
                <Skeleton width="150px" height="32px" className="mb-4" />
                <Skeleton width="100%" height="40px" className="mb-2" />
            </Box>

            {/* Skeleton for Image URL Field */}
            <Box>
                <Skeleton width="150px" height="32px" className="mb-4" />
                <Skeleton width="100%" height="40px" className="mb-4" />
                {/* Skeleton for Image Preview */}
                <Skeleton width="100%" height="200px" className="mb-4" />
            </Box>

            {/* Skeleton for Content Field */}
            <Box>
                {/* Skeleton for Content Heading and Switch */}
                <Flex className="items-center mb-4" justify="between" align="center">
                    <Skeleton width="150px" height="32px" className="mb-2" />
                    <Skeleton width="100px" height="24px" className="mb-2" />
                </Flex>
                {/* Skeleton for Markdown Editor */}
                <Skeleton width="100%" height="300px" className="mb-4" />
            </Box>

            {/* Skeleton for Action Buttons */}
            <Flex className="justify-end space-x-4">
                <Skeleton width="100px" height="40px" />
                <Skeleton width="100px" height="40px" />
            </Flex>
        </Box>
    );
};

export default LoadingSkeleton;
