import {
    Grid,
} from "@radix-ui/themes";
import LeftProfileSection from "@/app/career/LeftProfileSection";
import MiddleProfileSection from "@/app/career/MiddleProfileSection";
import RightProfileSection from "@/app/career/RightProfileSection";

function CareerProfile() {
    const coachDataLeft = {
        name: "Chuy Vera",
        tagline: "Leading the team to victory",
        nationality: "Venezuela",
        age: 55,
        profilePicture: "/pic/chuyVeraPic.webp",
        yearsOfExperiencePlayer: 20,
        yearsOfExperienceCoach: 15,
        playerStatus: "Inactive",
        CoachStatus: "Active",
    };

    const coachDataRight = {
        totalMatches: 1000,
        totalWins: 600,
        totalDraws: 300,
        totalLosses: 100,
        ratio: 1.2,
        totalTeams: 5,




    }

    return (
        <Grid as="div" columns={{ initial: "1fr", md: "3" }} gapX="4" height="auto" width="100%" className="inset-0 bg-gradient-to-r from-black via-blue-950 opacity-90 to-black">
            <LeftProfileSection coachDataLeft={coachDataLeft}  />
            <MiddleProfileSection coachDataRight={coachDataRight} />
            <RightProfileSection  />
        </Grid>
    );
}

export default CareerProfile;
