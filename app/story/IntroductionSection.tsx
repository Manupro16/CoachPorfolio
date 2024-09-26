import React from 'react';
import {Badge, Box, Flex, Heading, Quote, Text} from '@radix-ui/themes';


interface IntroductionSectionProps {
    playerStatus: string;
    coachStatus: string;
}

const IntroductionSection: React.FC<IntroductionSectionProps> = ({ playerStatus, coachStatus }) => {
    return (
        <Flex
            as="div"
            direction="column"
            align="center"
            className="text-center mb-16 px-4 sm:px-6 lg:px-8 relative"
        >
            <Heading
                as="h1"
                size="8"
                weight="bold"
                className="text-textLight leading-tight "
                style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)' }}
            >
                Jose de Jesus Vera
            </Heading>
            <Box as="span" className="block h-[3px] w-1/3 bg-primary mt-2 mb-4" />
            <Text as="p"
                    size="4" className="text-gray-200 max-w-2xl"
                    style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}
            >
                The remarkable journey of Jose De Jesus Vera, most known as{' '}
                <Quote>El Chuy Vera</Quote>, as a player and coach. In this section, we
                highlight his time playing for and coaching various teams, tracing his
                long journey from a young age to becoming a legendary athlete and coach.
            </Text>
            <Text as="p" size="3" className="text-gray-300 mt-2">
                Player Career status: <Badge color="red">{playerStatus}</Badge>
            </Text>
            <Text as="p" size="3" className="text-gray-300 mt-2">
                Coaching Career status: <Badge color="green">{coachStatus}</Badge>
            </Text>
        </Flex>

    );
};

export default IntroductionSection;
