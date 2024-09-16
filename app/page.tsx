import WelcomeSection from "@/app/WelcomeSection";
import {Grid} from "@radix-ui/themes";
import ShowcaseSection from "@/app/ShowcaseSection";

function Home() {
    return (
        <Grid as='div' columns='1' rows='1fr 1fr '>
            <WelcomeSection/>
            <ShowcaseSection/>
            <div>Footer goes here</div>
        </Grid>
    );
}


export default Home;
