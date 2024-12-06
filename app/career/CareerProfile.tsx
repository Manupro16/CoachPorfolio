import {
    Grid,
} from "@radix-ui/themes";
import LeftProfileSection from "@/app/career/LeftProfileSection";

function CareerProfile() {
    const coachData = {
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

    return (
        <Grid as="div" columns="0.5fr 1fr" rows="1fr" className="inset-0 bg-gradient-to-r from-black via-blue-950 opacity-90 to-black">
            <LeftProfileSection coachData={coachData}  />
        </Grid>
    );
}

export default CareerProfile;
