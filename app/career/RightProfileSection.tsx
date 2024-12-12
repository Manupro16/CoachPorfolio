import React from 'react';
import { Avatar, Blockquote, Box, Flex, Heading, Quote, Separator, DataList } from "@radix-ui/themes";
import { FaFutbol, FaHandshake, FaMedal, FaPercent, FaTimesCircle, FaUsers } from "react-icons/fa";

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

const RightProfileSection: React.FC<Props> = ({ coachDataRight }) => {
  const stats = [
    { label: "Total Matches", value: coachDataRight.totalMatches, icon: <FaFutbol /> },
    { label: "Total Wins", value: coachDataRight.totalWins, icon: <FaMedal /> },
    { label: "Total Draws", value: coachDataRight.totalDraws, icon: <FaHandshake /> },
    { label: "Total Losses", value: coachDataRight.totalLosses, icon: <FaTimesCircle /> },
    { label: "Total Teams", value: coachDataRight.totalTeams, icon: <FaUsers /> },
    { label: "Winning Ratio", value: `${(coachDataRight.ratio * 100).toFixed(2)}%`, icon: <FaPercent /> },
  ];

  return (
    <Box
      as="div"
      className="border-l border-white/30 text-white"
      pl="4"
      py="4" // Add some vertical padding to the whole right section
    >
      {/* Section: Heading and Description */}
      <Flex direction={{ initial: "column", xl: "column", lg: "row" }} gap="2" align="start" mb="4">
        <Heading size="6" className="font-bold">
          Professional Coaching Career Statistics
        </Heading>
        <Blockquote className="text-gray-200 text-sm">
          Take a look at <Quote>Chuy Vera</Quote>&#39;s professional career stats as
          a head coach of a professional club.
        </Blockquote>
      </Flex>

      <Separator size="4" color="blue" mb="4" className="opacity-50" />

      {/* Section: Total Combined Stats */}
      <Box mb="4">
        <Heading size="4" className="font-bold" mb="2">
          Total Combined Stats of Career
        </Heading>
        <DataList.Root
          orientation={{initial: "horizontal", xl: "horizontal", lg: "vertical"}}
          size="2"
          className="text-sm w-full"
        >
          {stats.map((stat, index) => (
            <DataList.Item key={index} align="center">
              <DataList.Label minWidth={{ initial: "auto", xl: "120px", lg: "auto" }}>
                {stat.icon && <span className="inline-block mr-2">{stat.icon}</span>}
                {stat.label}
              </DataList.Label>
              <DataList.Value>{stat.value}</DataList.Value>
            </DataList.Item>
          ))}
        </DataList.Root>
      </Box>

      <Separator size="4" color="blue"  mb="4" className="opacity-50"/>

      {/* Section: Teams Coached */}
      <Box>
        <Heading size="4" className="font-bold" mb="2">
          Teams Coached as Head Coach
        </Heading>
        <Flex direction={{ initial: "column", md: "row" }} gap="4" align="start" justify="start">
          <Box as="div" >
            <Avatar
              src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
              fallback="A"
            />
            <Avatar fallback="A" />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default RightProfileSection;
