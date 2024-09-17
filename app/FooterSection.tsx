import {  Flex, Grid, Text, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { InstagramLogoIcon, TwitterLogoIcon, FontFamilyIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";

function FooterSection() {
    return (
        <footer className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-t border-gray-700 px-10 py-8 shadow-lg">
            <Grid as="div" columns="repeat(auto-fit, minmax(240px, 1fr))" gap="6" className="w-full">
                {/* Brand Information */}
                <Flex as="div" direction="column" gap="2" align="start">
                    <Heading size="6" className="text-primary">
                        Chuy Vera
                    </Heading>
                    <Text size="4" className="text-textMuted">
                        Professional Football Coach
                    </Text>
                    <Text size="3" className="text-gray-500">
                        © 2024 Chuy Vera. All rights reserved.
                    </Text>
                </Flex>

                {/* Social Media Links */}
                <Flex as="div" direction="column" gap="2" align="center">
                    <Heading size="6" className="text-primary">
                        Social Media
                    </Heading>
                    <Flex direction="row" gap="5" className="pt-4">
                        <Link href="https://instagram.com">
                            <InstagramLogoIcon className="h-6 w-6 text-primary hover:text-primaryDark" />
                        </Link>
                        <Link href="https://twitter.com">
                            <TwitterLogoIcon className="h-6 w-6 text-primary hover:text-primaryDark" />
                        </Link>
                        <Link href="https://facebook.com">
                            <FontFamilyIcon className="h-6 w-6 text-primary hover:text-primaryDark" />
                        </Link>
                    </Flex>
                </Flex>

                {/* Contact Information */}
                <Flex as="div" direction="column" align="center">
                    <Heading size="6" className="text-primary">
                        Contact Information
                    </Heading>
                    <Flex direction="row" align="center" className="pt-4">
                        <EnvelopeClosedIcon className="mr-2 text-primary" />
                        <Text size="4" className="text-textMuted">
                            <a href="mailto:verajesus15@hotmail.com" className="hover:text-primaryDark">
                                verajesus15@hotmail.com
                            </a>
                        </Text>
                    </Flex>
                </Flex>
            </Grid>
        </footer>
    );
}

export default FooterSection;
