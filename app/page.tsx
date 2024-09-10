import WelcomeSection from "@/app/WelcomeSection";
import {Grid} from "@radix-ui/themes";

function Home() {
    return (
        <Grid as='div' columns='1' rows='1fr 1fr 1fr'>
            <WelcomeSection />
            <div>Content goes here</div>
            <div>Footer goes here</div>
        </Grid>
    );
}


export default Home;
