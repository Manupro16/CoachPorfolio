import WebsiteBackgroundColor from "@/components/WebsiteBackgroundColor";
import {Grid} from "@radix-ui/themes";
import CareerProfile from "@/app/career/CareerProfile";


function careerPageSection() {
    return (
       <section className="w-screen h-screen">
           <WebsiteBackgroundColor />
           <Grid as="div" columns="1fr" rows="1fr 1fr 1fr" className=" w-screen h-screen ">
                <CareerProfile/>
               <div>Hello Section</div>
               <div>Hello Section</div>
           </Grid>
       </section>
    )

}

export default careerPageSection;