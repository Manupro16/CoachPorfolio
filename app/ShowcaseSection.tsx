import {Box, Flex, Grid, Heading, Text} from "@radix-ui/themes";
import VideoCard from "@/components/VideoCard";

function ShowcaseSection() {

    const showcases = [
        {
            team: 'Zamora FC Venezuela',
            season: '2010/2011',
            videoSrc: '/videos/zamora_2010.mp4',
            description: 'Highlights from the 2010/2011 season.',
        },
        {
            team: 'Estudiantes de Mérida',
            season: '2012/2013',
            videoSrc: '/videos/estudiantes_2012.mp4',
            description: 'Key moments from the 2012/2013 season.',
        },
        {
            team: 'Deportivo Táchira',
            season: '2014/2015',
            videoSrc: '/videos/tachira_2014.mp4',
            description: 'Memorable plays from the 2014/2015 season.',
        },
    ];


    return (
        <section className="relative overflow-hidden">
            <Grid as="div" columns="1fr 1fr 1fr"  rows="0.3fr 1fr" className='w-full h-full'>
                {/* Background Gradient */}
                <Box as="div" className="absolute inset-0 bg-gradient-to-r from-black via-blue-900 to-black opacity-90"></Box>
                <Box as="div" className="absolute inset-x-0 top-0">
                    <svg
                        viewBox="0 0 1440 320"
                        className="w-full h-32 sm:h-48 md:h-64 lg:h-80"
                        preserveAspectRatio="none"
                    >
                        <path
                            fill="#1E40AF"
                            fillOpacity="1"
                            d="M0,160L48,170.7C96,181,192,203,288,218.7C384,235,480,245,576,240C672,235,768,213,864,208C960,203,1056,213,1152,224C1248,235,1344,245,1392,250.7L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                        ></path>
                    </svg>
                </Box>
                {/*Content */}

                <Flex as="div" direction="column" align="center" className=" text-center relative z-10 py-16 px-4 sm:px-6 lg:px-8 col-span-3">
                        <Heading size="8" className="text-gray-100 mb-4">
                            No Matter Where He Goes, His Philosophies and Style Remain the Same
                        </Heading>
                        <Text size="4" className="text-gray-300 max-w-2xl">
                            An introduction to the history of Chuy Vera's amazing soccer career.
                            This showcase provides you with clips of his teams in each season and his impact on the club.
                        </Text>
                </Flex>
                {/* Video Cards */}
                <Flex as="div" className="col-span-3 z-10 py-16 px-4 sm:px-6 lg:px-8" align="start" justify="center" >
                    <Grid
                        columns={{initial: "1", sm: "1", md: "2", lg: "3"}}
                        gap="6"
                        className="  mt-12"
                    >
                        {showcases.map((item, index) => (
                            <VideoCard key={index} {...item} />
                        ))}
                    </Grid>
                </Flex>

                <Box as="div" className="absolute inset-x-0 bottom-0">
                    <svg
                        viewBox="0 0 1440 320"
                        className="w-full h-32 sm:h-48 md:h-64 lg:h-80"
                        preserveAspectRatio="none"
                    >
                        <path
                            fill="#1E40AF"
                            fillOpacity="1"
                            d="M0,256L48,224C96,192,192,128,288,106.7C384,85,480,107,576,122.7C672,139,768,149,864,144C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        ></path>
                    </svg>
                </Box>
            </Grid>
        </section>
    );
}

export default ShowcaseSection;





