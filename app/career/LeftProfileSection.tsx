// LeftProfileSection.tsx

import {
  Box,
  Flex,
  Heading,
  Text,
  DataList,
  Quote,
  Grid,
  Badge,
  Separator,
} from "@radix-ui/themes";
import Image from "next/image";
import { FaBirthdayCake } from "react-icons/fa";
import { GiVenezuela, GiSoccerKick, GiSoccerField } from "react-icons/gi";
import StatItem from "./StatItem";

interface Props {
  coachData: {
    name: string;
    tagline: string;
    profilePicture: string;
    nationality: string;
    age: number;
    yearsOfExperiencePlayer: number;
    yearsOfExperienceCoach: number;
    playerStatus: string;
    CoachStatus: string;
  };
}

function LeftProfileSection({ coachData }: Props) {
  return (
    <Grid
      as="div"
      columns="0.8fr 1fr"
      rows="1fr"
      className="ml-5 mt-5"
      gap="4"
    >
      {/* Left Column: Basic Info */}
      <Flex as="div" direction="column" gapY="4" align="center" justify="start" className="mr-10 mb-5 md:mb-0">
        <div className="space-y-1">
          <Heading size="6" className="text-white font-bold">
            {coachData.name}
          </Heading>
          <Text className="text-gray-200 italic text-sm leading-snug">
            <Quote>{coachData.tagline}</Quote>
          </Text>
        </div>

        <Box className="relative w-48 h-48">
          <Image
            src={coachData.profilePicture}
            alt={`Profile picture of coach ${coachData.name}`}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </Box>
      </Flex>

      {/* Right Column: About and Stats */}
      <Flex
        as="div"
        direction="column"
        align="start"
        justify="start"
        className="border-l border-white/30 pl-2 space-y-4"
      >
        <Heading size="6" className="text-white">
          About The Coach
        </Heading>

        {/* Horizontal Separator below the heading */}
        <Separator size="4" color="blue" className="w-full opacity-50" />

        <DataList.Root className="text-white space-y-2 text-sm">
          <StatItem
            label="Nationality"
            value={coachData.nationality}
            icon={<GiVenezuela className="text-base" />}
          />
          <StatItem
            label="Age"
            value={coachData.age}
            icon={<FaBirthdayCake className="text-base" />}
          />
          <StatItem
            label="Coaching Experience (Years)"
            value={coachData.yearsOfExperienceCoach}
            icon={<GiSoccerKick className="text-base" />}
          />
          <StatItem
            label="Playing Experience (Years)"
            value={coachData.yearsOfExperiencePlayer}
            icon={<GiSoccerField className="text-base" />}
          />
          <StatItem
            label="Coach Status"
            value={
              coachData.CoachStatus === "Active" ? (
                <Badge color="green">Active</Badge>
              ) : (
                <Badge color="red">Inactive</Badge>
              )
            }
          />
          <StatItem
            label="Player Status"
            value={
              coachData.playerStatus === "Active" ? (
                <Badge color="green">Active</Badge>
              ) : (
                <Badge color="red">Inactive</Badge>
              )
            }
          />
        </DataList.Root>
      </Flex>
    </Grid>
  );
}

export default LeftProfileSection;
