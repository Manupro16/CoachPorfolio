//  story/edit/earlyLife/imagePreview


import { Box, Text } from "@radix-ui/themes";
import React from "react";

interface ImagePreviewProps {
    imageUrl?: string | null ;
    imageError?: string | null;
    imagePreviewUrl?: string; // Optional prop for pre-rendering images
    colorMode: 'light' | 'dark';
}

const RenderImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, imageError, imagePreviewUrl, colorMode }) => {

    let previewUrl = '';

    // console.log('Image URL:', imageUrl);
    // console.log('Image Preview URL:', imagePreviewUrl);

    if (imageUrl) {
        previewUrl = imageUrl;
    } else if (imagePreviewUrl) {
        previewUrl = imagePreviewUrl;
    }

    if (!previewUrl) {
        return (
            <Box className={`w-full max-w-md h-48 flex items-center justify-center rounded-md shadow-sm ${colorMode == "dark" ? "bg-gray-600" : "bg-gray-200"}`}>
                <Text as="p" className="text-gray-500">
                    Enter an image URL to preview.
                </Text>
            </Box>
        );
    }

    if (imageError) {
        return (
            <Box className="w-full max-w-md h-48 flex flex-col items-center justify-center rounded-md shadow-sm bg-red-100 p-4">
                <Text as="p" className="text-red-500 mb-2">
                    {imageError}
                </Text>
            </Box>
        );
    }

    return (
        <img
            src={previewUrl}
            alt="Image Preview"
            className="w-full max-w-md h-auto rounded-md shadow-sm object-cover"
        />
    );
};

export default RenderImagePreview;

