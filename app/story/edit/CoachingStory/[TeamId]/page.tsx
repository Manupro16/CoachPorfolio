import {Box, Flex, Heading, Text} from "@radix-ui/themes";
import React from "react";
import EditFormPage from "@/app/story/edit/EditForm";


interface EditPlayerStoryPageProps {
    params: {
        TeamId: string;
    };
}


function EditCoachingStoryPage({params}: EditPlayerStoryPageProps) {
    const {TeamId} = params;

    // Determine if we're in edit or create mode
    const isCreateMode = TeamId.toLowerCase() === "create";

    const fetchUrl = isCreateMode ? '/api/story/coaching-story' : `/api/story/coaching-story/${TeamId}`;
    const imageEndpoint = isCreateMode ? '' : `/api/story/coaching-story/${TeamId}/image`;

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
                        Update the content of the Coaching Story section to provide insightful information about Coach
                        Chuy Vera's background as a Coach.
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

    )


}


export default EditCoachingStoryPage;