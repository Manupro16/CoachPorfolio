// app/story/edit/PlayerStory/[id]/page.tsx

import {Box, Flex, Heading, Text} from "@radix-ui/themes";
import React from "react";
import EditFormPage from "@/app/story/edit/EditForm";

interface EditPlayerStoryPageProps {
    params: {
        TeamId: string;
    };
}

function EditPlayerStoryPage({params}: EditPlayerStoryPageProps) {
    const {TeamId} = params;

    // Determine if we're in edit or create mode
    const isCreateMode = TeamId.toLowerCase() === "create";

    // Define the fetch and submit URLs based on the mode
    const fetchUrl = isCreateMode ? '/api/story/player-story' : `/api/story/player-story/${TeamId}`;
    const imageEndpoint = isCreateMode ? '' : `/api/story/player-story/${TeamId}/image`;

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
                        Edit Player Story
                    </Heading>
                    <Box className="mx-auto h-[3px] w-35 bg-primary mb-4"/>
                    <Text
                        as="p"
                        size="4"
                        className="text-gray-200 max-w-2xl"
                        style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}
                    >
                        Update the content of the Player Story section to provide insightful information about Coach
                        Chuy Vera's background as a player.
                    </Text>
                </Box>

                {/* Form Container */}
                <EditFormPage
                    APIEndpoint={fetchUrl}
                    APIEndpointImage={imageEndpoint}
                    TeamId={isCreateMode ? undefined : TeamId}  // Provide the TeamId as a parameter to fetch and submit data for the specific player
                    AddNewData={isCreateMode}  // Set AddNewData to true for creating a new player story
                />
            </Flex>
        </section>
    );
}

export default EditPlayerStoryPage;
