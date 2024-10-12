// app/story/edit/earlyLife/page.tsx

'use client'; // Ensure this component is treated as a client-side component

import React from "react";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { useRouter } from 'next/navigation';
import { earlyLifeSchema, BaseEarlyLifeData } from '@/lib/validation/story/earlyLife';
import EditFormPage from '../EditForm'; // Adjust the path as necessary


function EditEarlyLifePage() {
    const router = useRouter();

    // Define the fetch and submit URLs
    const fetchUrl = '/api/story/early-life'; // Adjust as necessary
    const submitUrl = '/api/story/early-life'; // Adjust as necessary

    // Define the onSuccess callback
    const handleSuccess = () => {
        router.push('/story'); // Navigate to the story page upon successful submission
    };

    return (
        <section className="w-screen h-auto relative">
            {/* Background Gradient Overlay */}
            <Box
                as="div"
                className="absolute inset-0 bg-gradient-to-r from-black via-primaryDark to-black opacity-30 pointer-events-none z-0"
            />

            {/* Main Container */}
            <Flex
                as="div"
                direction="column"
                align="center"
                justify="center"
                className="relative z-10 px-4 py-12 sm:px-6 lg:px-8"
            >
                {/* Header Section */}
                <Box className="max-w-2xl w-full text-center mb-12">
                    <Heading as="h2" size="7" className="font-bold text-primary mb-8">
                        Edit Early Life
                    </Heading>
                    <Box className="mx-auto h-[3px] w-35 bg-primary mb-4" />
                    <Text
                        as="p"
                        size="4"
                        className="text-gray-200 max-w-2xl"
                        style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}
                    >
                        Update the content of the Early Life section to provide insightful information about Coach Chuy Vera's background.
                    </Text>
                </Box>

                {/* Form Container */}
                <EditFormPage<BaseEarlyLifeData>
                    validationSchema={earlyLifeSchema}
                    fetchUrl={fetchUrl}
                    submitUrl={submitUrl}
                    onSuccess={handleSuccess}
                />
            </Flex>
        </section>
    );
}

export default EditEarlyLifePage;
