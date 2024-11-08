import React from 'react';
import {  Flex, Text } from '@radix-ui/themes';

interface ClosingSectionProps {
    text: string;
}

const ClosingSection: React.FC<ClosingSectionProps> = ({ text }) => {
    return (
        <Flex aria-label="Closing Section" justify="center" className="relative mt-8 mb-4">
            <Text as="p" size="3" className="text-white leading-relaxed max-w-xl text-center" >
                {text}
            </Text>
        </Flex>
);
};

export default ClosingSection;
