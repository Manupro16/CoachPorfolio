import { Box, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";

function WelcomeSection() {
    return (
        <Grid
            as="div"
            columns="1fr 1fr"
            rows="1fr 1fr"
            className="overflow-hidden h-screen w-full bg-gradient-to-r from-black via-black/75 to-transparent"
        >
            {/* Text Section with Fade-in Effect */}
            <Flex
                as="div"
                justify="start"
                align="start"
                className="pt-5 pl-10 row-span-2 animate-fadeIn"
                direction="column"
                gap="4"
            >
                <Heading
                    as="h1"
                    size="8"
                    weight="bold"
                    className="text-gray-100 leading-tight"
                >
                    El Chuy Vera
                </Heading>
                <Text
                    as="p"
                    size="4"
                    className="text-gray-300 leading-tight"
                >
                    Professional Football Coach
                </Text>
                <Box
                    as="div"
                    className="mt-5 max-w-xl"
                >
                    <Heading
                        as="h2"
                        size="6"
                        weight="medium"
                        className="text-gray-100"
                    >
                        Chuy's Professional Portfolio and Showcase of Achievements and Career.
                    </Heading>
                    <Text
                        as="p"
                        size="4"
                        className="text-gray-300 leading-relaxed pt-1"
                    >
                        As a dedicated football coach, Chuy Vera has spent decades shaping the future of Venezuelan
                        football. His journey has seen him lead top teams like Estudiantes de Mérida, Zamora FC, and
                        Deportivo Táchira to success, while his international experience, including a pivotal role at FC
                        Dallas in the MLS, highlights his expertise in player development and strategic coaching. Chuy's
                        leadership and passion continue to inspire players and teams across the footballing world.
                    </Text>
                </Box>
            </Flex>

            {/* Image Section with Border and Hover Effect */}
            <Flex
                as="div"
                align="center"
                justify="center"
                className="relative h-full"
            >
                <Box
                    as="div"
                    className="relative w-[90%] h-[90%] border border-gray-700 rounded-lg shadow-lg overflow-hidden"
                >
                    <Image
                        src="/pic/chuyVeraDallasCup.jpg"
                        alt="Coach Chuy Vera at Dallas Cup"
                        fill
                        className="object-cover filter brightness-90 contrast-105 transition-transform duration-500 hover:scale-105"
                        quality={100}
                        priority
                    />
                </Box>
            </Flex>
        </Grid>
    );
}

export default WelcomeSection;
