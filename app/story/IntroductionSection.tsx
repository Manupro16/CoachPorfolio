import React from 'react';
import {Badge, Box, Flex, Heading, Quote, Text,} from '@radix-ui/themes';
import {LightningBoltIcon, MagicWandIcon,} from '@radix-ui/react-icons'


interface IntroductionSectionProps {
    playerStatus: string;
    coachStatus: string;
}

const IntroductionSection: React.FC<IntroductionSectionProps> = ({playerStatus, coachStatus}) => {
    return (
        <Flex
            as="div"
            direction="column"
            align="center"
            py="4"
            className="text-center mb-16 px-4 sm:px-6 lg:px-8 relative"
        >
            <Heading
                as="h1"
                size={{initial: '8', sm: '8', md: '8'}}
                weight="bold"
                className="text-textLight leading-tight "
                style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'}}
            >
                Jose de Jesus Vera
            </Heading>
            <Box as="span" className="block h-[3px] w-1/3 bg-primary mt-2 mb-4"/>
            <Text as="p"
                  size={{initial: '4', sm: '5'}}
                  className="text-gray-200 max-w-2xl"
                  style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}
            >
                The remarkable journey of Jose De Jesus Vera, most known as{' '}
                <Quote>El Chuy Vera</Quote>, as a player and coach. In this section, we
                highlight his time playing for and coaching various teams, tracing his
                long journey from a young age to becoming a legendary athlete and coach.
            </Text>
            <Flex gap="4" className="mt-6 flex-wrap justify-center">
                <Badge
                    color="red"
                    variant="surface"
                    size="2"

                >
                    <LightningBoltIcon className="mr-2"/> Player Career: {playerStatus}
                </Badge>
                <Badge
                    color="green"
                    variant="surface"
                    size="2"
                >
                    <MagicWandIcon className="mr-2"/> Coaching Career: {coachStatus}
                </Badge>
            </Flex>
        </Flex>

    );
};

export default IntroductionSection;
