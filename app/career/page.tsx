import WebsiteBackgroundColor from "@/components/WebsiteBackgroundColor";
import {Grid} from "@radix-ui/themes";
import CareerProfile from "@/app/career/CareerProfile";


function careerPageSection() {
    return (
        <section style={{ width: "100vw", height: "100vh" }}>
            <WebsiteBackgroundColor />
            <Grid as="div" width="100%" height="auto" columns="1" rows={{ initial: "1fr 1fr 1fr" }}>
                 <CareerProfile/>
                <div>Hello Section</div>
                <div>Hello Section</div>
            </Grid>
        </section>
    )

}

export default careerPageSection;