import React from 'react';
import {  Flex, Text } from '@radix-ui/themes';

interface ClosingSectionProps {
    text: string;
}

const ClosingSection: React.FC<ClosingSectionProps> = ({ text }) => {
    return (
        <Flex justify="center" className="mt-8">
    <Text
        as="p"
    size="3"
    className="text-gray-300 leading-relaxed max-w-xl text-center"
        >
        {text}
        </Text>
        </Flex>
);
};

export default ClosingSection;
