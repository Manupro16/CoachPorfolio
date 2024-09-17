import WelcomeSection from "@/app/WelcomeSection";
import {Grid} from "@radix-ui/themes";
import ShowcaseSection from "@/app/ShowcaseSection";
import FooterSection from "@/app/FooterSection";

function Home() {
    return (
        <Grid as='div' columns='1' rows='1fr 1fr'>
            <WelcomeSection />
            <ShowcaseSection />
        </Grid>
    );
}


export default Home;
