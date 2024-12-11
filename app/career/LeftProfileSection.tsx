import {
  Box,
  Flex,
  Heading,
  Text,
  Quote,
  Grid,
  Badge,
  Separator,
} from "@radix-ui/themes";
import Image from "next/image";
import { FaBirthdayCake } from "react-icons/fa";
import { GiVenezuela, GiSoccerKick, GiSoccerField } from "react-icons/gi";
import StatDisplay from "./StatDisplay"; // The new component we created

interface Props {
  coachDataLeft: {
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

function LeftProfileSection({ coachDataLeft }: Props) {
  const stats = [
    {
      label: "Nationality:",
      value: coachDataLeft.nationality,
      icon: <GiVenezuela className="text-base" />,
    },
    {
      label: "Age:",
      value: coachDataLeft.age,
      icon: <FaBirthdayCake className="text-base" />,
    },
    {
      label: "Coaching Experience (Years):",
      value: coachDataLeft.yearsOfExperienceCoach,
      icon: <GiSoccerKick className="text-base" />,
    },
    {
      label: "Playing Experience (Years):",
      value: coachDataLeft.yearsOfExperiencePlayer,
      icon: <GiSoccerField className="text-base" />,
    },
    {
      label: "Coach Status:",
      value:
        coachDataLeft.CoachStatus === "Active" ? (
          <Badge color="green">Active</Badge>
        ) : (
          <Badge color="red">Inactive</Badge>
        ),
    },
    {
      label: "Player Status:",
      value:
        coachDataLeft.playerStatus === "Active" ? (
          <Badge color="green">Active</Badge>
        ) : (
          <Badge color="red">Inactive</Badge>
        ),
    },
  ];

  return (
    <Grid
      as="div"
      columns="0.8fr 1fr"
      rows="1fr"
      className="ml-5 mt-5"
      gap="4"
    >
      {/* Left Column: Basic Info */}
      <Flex direction="column" gap="4" align="center" justify="start" className="mr-10 mb-5 md:mb-0">
        <div className="space-y-1">
          <Heading size="6" className="text-white font-bold">
            {coachDataLeft.name}
          </Heading>
          <Text className="text-gray-200 italic text-sm leading-snug">
            <Quote>{coachDataLeft.tagline}</Quote>
          </Text>
        </div>

        <Box className="relative w-48 h-48">
          <Image
            src={coachDataLeft.profilePicture}
            alt={`Profile picture of coach ${coachDataLeft.name}`}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </Box>
      </Flex>

      {/* Right Column: About and Stats */}
      <Flex
        direction="column"
        align="start"
        justify="start"
        className="border-l border-white/30 pl-2 space-y-4"
      >
        <Heading size="6" className="text-white">
          About The Coach
        </Heading>

        <Separator size="4" color="blue" className="w-full opacity-50" />
           <Grid
                gap="4"
                className="text-white text-sm w-full"

            >
                {stats.map((stat, idx) => (
                    <StatDisplay
                        key={idx}
                        label={stat.label}
                        value={stat.value}
                        icon={stat.icon}
                    />
                ))}

           </Grid>
      </Flex>
    </Grid>
  );
}

export default LeftProfileSection;
