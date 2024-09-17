import {Box, Flex, Grid, Text, Heading} from "@radix-ui/themes";
import Link from "next/link";
import { InstagramLogoIcon, TwitterLogoIcon, FontFamilyIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";'@radix-ui/react-icons'

function FooterSection () {
    return (
        <footer className=" h-40 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-700 px-10 py-4 shadow-lg">
            <Grid as="div" columns="1fr 1fr 1fr" rows="1fr" className="h-full w-full" >
                <Flex as="div" direction="column" gap="2" align="start" justify="start"  >
                   <Heading>
                       Chuy Vera
                   </Heading>
                    <Text>
                        Professional Football Coach
                    </Text>
                    <Text size="3" >© 2024 Chuy Vera. All rights reserved.</Text>
                </Flex>
                <Box as="div">
                    <Flex as="div" direction="column" gap="2" align="center" justify="start"  >
                        <Heading>
                            Social Media
                        </Heading>
                    </Flex>
                    <Flex  as="div" direction="row" gap="5" align="center" justify="center" className="pt-5">
                        <Link href="/instagram">
                            <InstagramLogoIcon className="h-6 w-6" />
                        </Link>
                        <Link href="/twitter">
                            <TwitterLogoIcon className="h-6 w-6" />
                        </Link>
                        <Link href="/facebook">
                            <FontFamilyIcon className="h-6 w-6" />
                        </Link>
                    </Flex>
                </Box>
                <Box as="div">
                    <Flex as="div" direction="column" align="center" justify="start"  >
                        <Heading>
                            Contact Information
                        </Heading>
                    </Flex>
                    <Flex as="div" direction="row" align="start" justify="start" >
                        <Text size="3" >
                            <a href="verajesus15@hotmail.com" className="relative" > <EnvelopeClosedIcon /> verajesus15@hotmail.com</a>
                        </Text>
                    </Flex>
                </Box>
            </Grid>
        </footer>
    );
}

export default FooterSection;
