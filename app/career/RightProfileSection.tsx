import React from 'react';
import {Avatar, Blockquote, Box, Flex, Grid, Heading, Quote, Separator, Text,} from "@radix-ui/themes";

// Import icons
import {FaFutbol, FaHandshake, FaMedal, FaPercent, FaTimesCircle, FaUsers} from "react-icons/fa";

interface Props {
    coachDataRight: {
        totalMatches: number;
        totalWins: number;
        totalDraws: number;
        totalLosses: number;
        ratio: number;
        totalTeams: number;
    }
}


const MyComponent: React.FC<Props> = ({coachDataRight}) => {

    const stats = [
        {label: "Total Matches", value: coachDataRight.totalMatches, icon: <FaFutbol/>},
        {label: "Total Wins", value: coachDataRight.totalWins, icon: <FaMedal/>},
        {label: "Total Draws", value: coachDataRight.totalDraws, icon: <FaHandshake/>},
        {label: "Total Losses", value: coachDataRight.totalLosses, icon: <FaTimesCircle/>},
        {label: "Total Teams", value: coachDataRight.totalTeams, icon: <FaUsers/>},
        {label: "Winning Ratio", value: `${(coachDataRight.ratio * 100).toFixed(2)}%`, icon: <FaPercent/>},
    ];


    return (
        <Box
            as="div"
            className="border-l border-white/30 pl-4 space-y-6 mt-5 text-white"
        >
            {/* Heading and Description */}
            <Flex direction={{lg: 'column', md: "row"}} align="start" className="space-y-2">
                <Heading size="6" className="font-bold">
                    Professional Coaching Career Statistics
                </Heading>
                <Blockquote className="text-gray-200 text-sm">
                    Take a look at <Quote>Chuy Vera</Quote>'s professional career stats as
                    a head coach of a professional club.
                </Blockquote>
            </Flex>

            <Separator size="4" color="blue" className="opacity-50 w-full"/>

            {/* Total Combined Stats */}
            <Heading size="4" className="font-bold">
                Total Combined Stats of Career
            </Heading>

            <Grid
                gap="4"
                className="text-white text-sm"
                columns={{initial: "2", sm: "3", md: "3"}}
            >
                {stats.map((stat, index) => (
                    <Flex key={index} className="items-center gap-2 whitespace-normal break-words">
                        <span className="text-xl">{stat.icon}</span>
                        <Text className="font-bold">{stat.label}</Text>
                        <Text>{stat.value}</Text>
                    </Flex>
                ))}
            </Grid>

            <Separator size="4" color="blue" className="opacity-50 w-full"/>

            {/* Teams Coached */}
            <Heading size="4" className="font-bold">
                Teams Coached as Head Coach
            </Heading>
            <Flex direction={{lg: 'row', md: "column"}} justify="start">
                <Box as="div" className="mb-5">
                    <Avatar
                        src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                        fallback="A"
                    />
                    <Avatar fallback="A"/>
                </Box>
            </Flex>
        </Box>
    );
};

export default MyComponent;
