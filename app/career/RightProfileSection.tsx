import React from "react";
import {
    Box,
    Heading,
    Text,
    Separator,
} from "@radix-ui/themes";

function RightProfileSection() {
    return (
        <Box
            as="div"
            className="border-l border-white/30 text-white"
            pl="4"
            py="4"
        >
            {/* Heading */}
            <Box as="div" className="mb-2">
                <Heading size="5" className="font-bold mb-2">
                    Certifications & Education
                </Heading>

                {/* Short Explanation */}
                <Text className="text-gray-200 text-sm">
                    A solid educational background and professional licenses are
                    essential for guiding a team effectively. Below are some of
                    the certifications and academic achievements that have shaped
                    my coaching approach.
                </Text>
            </Box>

            <Separator size="4" color="blue" className="opacity-50 mb-4"/>

            {/* Licenses & Courses (Bullet List or DataList) */}
            <Heading size="4" className="font-bold mb-2">Licenses & Coaching Courses</Heading>
            <ul className="list-disc list-inside text-gray-200 mb-4 text-sm space-y-1">
                <li>UEFA Pro License (2012)</li>
                <li>USSF A License (2010)</li>
                <li>FIFA Coach Mentoring Program (2015)</li>
            </ul>

            <Separator size="4" color="blue" className="opacity-50 mb-4"/>

            {/* Academic Background */}
            <Box as="div" className="mb-2">
                <Heading size="4" className="font-bold mb-2">Academic Background</Heading>
                <ul className="list-disc list-inside text-gray-200 text-sm space-y-1">
                    <li>Bachelor’s Degree in Sports Management – <i>University of Sport Science</i></li>
                    <li>Masterclass in Leadership & Team Dynamics – <i>Online Program</i></li>
                </ul>
            </Box>

            <Separator size="4" color="blue" className="opacity-50 mb-4"/>

            {/* Additional Seminars / Workshops */}
            <Heading size="4" className="font-bold mb-2">Continuing Education</Heading>
            <ul className="list-disc list-inside text-gray-200 text-sm space-y-1 mb-4">
                <li>Annual Sports Science Conference (2018, 2019, 2022)</li>
                <li>Mentorship & Player Development Workshop (2020)</li>
            </ul>
        </Box>
    );
}

export default RightProfileSection;
