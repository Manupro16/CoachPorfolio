// app/story/edit/earlyLife/page.tsx

'use client'; // Ensure this component is treated as a client-side component

import React, {useCallback, useEffect, useRef, useState} from "react";
import {Box, Button, Flex, Heading, Switch, Text, TextField, AlertDialog } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import debounce from 'lodash.debounce';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import {
    BaseEarlyLifeData,
    earlyLifeSchema,
    fieldSchemas
} from '@/lib/validation/story/earlyLife';
import LoadingSkeleton from "@/components/LoadingSkeleton";
import RenderImagePreview from "./ImagePreview";



// Dynamically import the ReactMDEditor component to prevent SSR issues
const DynamicReactMDEditor = dynamic(() => import('@/components/DynamicReactMDEditor'), {
    ssr: false,
});



function EditEarlyLifePage() {

    const [colorMode, setColorMode] = useState<'light' | 'dark'>('dark');
    const [title, setTitle] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [titleError, setTitleError] = useState<string>('');
    const [imageError, setImageError] = useState<string>('');
    const [contentError, setContentError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [fetchError, setFetchError] = useState<string>('');
    const [formError, setFormError] = useState<string>('');
    const [useImageUrl, setUseImageUrl] = useState<boolean>(true);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');


    const router = useRouter();

    const previewUrlRef = useRef<string | null>(null);




    const validateField = (fieldName: keyof BaseEarlyLifeData, value: unknown): string => {
        try {
            const fieldSchema = fieldSchemas[fieldName];
            fieldSchema.parse(value);
            return '';
        } catch (error) {
            if (error instanceof z.ZodError && error.errors.length > 0) {
                return error.errors[0].message;
            }
            return 'Invalid value';
        }
    };

    useEffect(() => {
        // Remove the AbortController
        // const controller = new AbortController();

        const fetchData = async () => {
            try {
                // Remove the signal option
                const response = await axios.get('/api/story/early-life');
                if (response.status === 200) {
                    const data = response.data;
                    if (data) {
                        setTitle(data.title || '');
                        setContent(data.content || '');
                        setIsEditing(true);

                        if (data.image) {
                            setUseImageUrl(true);
                            setImageUrl(data.image);
                            setImagePreviewUrl(data.image);
                        } else if (data.imageData) {
                            setUseImageUrl(false);
                            setImagePreviewUrl('/api/story/early-life/image');
                        }
                    } else {
                        setIsEditing(false);
                    }
                }
            } catch (error) {
                console.error('Error fetching early life data:', error);
                setFetchError('No Data Available. Please create new data.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        // Remove the cleanup function
        // return () => {
        //   controller.abort();
        // };
    }, []);


    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setTitle(value);
        setTitleError(validateField('title', value));
    };

    const handleContentChange = (value: string | undefined): void => {
        const contentValue = value || '';
        setContent(contentValue);
        setContentError(validateField('content', contentValue));
    };

    const toggleColorMode = (): void => {
        setColorMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
    };

    // Debounced function to validate image loading
    const debouncedValidateImage = useCallback(
        debounce((url: string) => {
            if (validateField('image', url) === '') {
                const img = new Image();
                img.onload = () => setImageError('');
                img.onerror = () => setImageError('Failed to load image.');
                img.src = url;
            }
        }, 500),
        []
    );

    const handleUseImageUrlChange = (checked: boolean) => {
        setUseImageUrl(checked);

        if (checked) {
            // Reset image file-related state
            setImageFile(null);
            setImagePreviewUrl('');
        } else {
            // Reset image URL-related state
            setImageUrl('');
        }
    };

    const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0] || null;
        setImageFile(file);
        setImageError('');

        if (file) {
            // Revoke the previous object URL if it exists
            if (previewUrlRef.current) {
                URL.revokeObjectURL(previewUrlRef.current);
            }

            const previewUrl = URL.createObjectURL(file);
            previewUrlRef.current = previewUrl;
            setImagePreviewUrl(previewUrl);
        } else {
            // Revoke the previous object URL if it exists
            if (previewUrlRef.current) {
                URL.revokeObjectURL(previewUrlRef.current);
                previewUrlRef.current = null;
            }
            setImagePreviewUrl('');
        }
    };



    // Cleanup debounce on unmount
    useEffect(() => {
        return () => {
            debouncedValidateImage.cancel();
        };
    }, [debouncedValidateImage]);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        // Prepare fields for validation
        const fields: Partial<BaseEarlyLifeData> = {
            title,
            content,
        };

        if (useImageUrl) {
            fields.image = imageUrl;
        } else if (imageFile) {
            fields.imageData = true; // Indicate that an image file has been provided
        } else {
            setImageError('Please provide an image.');
            return;
        }

        // Validate the data using the updated schema
        try {
            earlyLifeSchema.parse(fields);
            setTitleError('');
            setImageError('');
            setContentError('');
            setFormError('');
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                setTitleError(fieldErrors.title ? fieldErrors.title[0] : '');
                setImageError(fieldErrors.image ? fieldErrors.image[0] : '');
                setContentError(fieldErrors.content ? fieldErrors.content[0] : '');
                return; // Prevent form submission if validation fails
            }
        }

        // Create FormData
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);

        if (useImageUrl) {
            formData.append('image', imageUrl);
        } else if (imageFile) {
            formData.append('image', imageFile);
        } else {
            setImageError('Please provide an image.');
            return;
        }

        // Proceed with form submission
        try {
            setIsSubmitting(true);
            let response;
            if (isEditing) {
                response = await axios.patch('/api/story/early-life', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                response = await axios.post('/api/story/early-life', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }

            if (response.status === 200 || response.status === 201) {
                router.push('/story');
            } else {
                console.error('Server Error:', response.data);
                setFormError('An error occurred while saving data.');
            }
        } catch (error) {
            console.error('Error:', error);
            setFormError('An unexpected error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };


    // Handler for the Cancel button
    const handleCancel = (): void => {
        router.back(); // Navigate back to the previous page
    };

    useEffect(() => {
        return () => {
            // Cleanup the object URL when the component unmounts
            if (previewUrlRef.current) {
                URL.revokeObjectURL(previewUrlRef.current);
            }
        };
    }, []);

    const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const url = e.target.value;
        setImageUrl(url);
        setImageError(validateField('image', url));
        debouncedValidateImage(url);
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
                {isLoading ? (
                    <LoadingSkeleton />
                ) : (
                    <Box className="shadow-md rounded-lg p-8 w-full max-w-3xl bg-gray-900">
                        {fetchError && (
                            <Text as="p" className="text-red-500 mb-4">
                                {fetchError}
                            </Text>
                        )}
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Title Field */}
                            <Box>
                                <Heading as="h1" size="4" className="text-4xl font-bold text-primary mb-4">
                                    Title
                                </Heading>
                                <TextField.Root
                                    id="title"
                                    name="title"
                                    type="text"
                                    placeholder="Enter title"
                                    value={title}
                                    onChange={handleTitleChange}
                                    className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-primary focus:border-primary transition-colors duration-300 ${
                                        colorMode === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'
                                    }`}

                                />

                                {titleError && (
                                    <Text as="p" className="text-red-500 mb-2">
                                        {titleError}
                                    </Text>
                                )}
                            </Box>

                            {/* Image Source Selection */}
                            <Box>
                                <Flex align="center" mb="4">
                                    <Text as="span" mr="2">
                                        Use Image URL
                                    </Text>
                                    <Switch
                                        checked={useImageUrl}
                                        onCheckedChange={handleUseImageUrlChange}
                                    />
                                    <Text as="span" ml="2">
                                        Upload Image
                                    </Text>
                                </Flex>
                            </Box>

                            {/* Conditionally render image input fields */}
                            {useImageUrl ? (
                                <Box>
                                    <Heading as="h1" size="4" className="font-bold text-primary mb-4">
                                        Image URL
                                    </Heading>
                                    <TextField.Root
                                        id="image"
                                        name="image"
                                        type="text"
                                        placeholder="Enter image URL"
                                        value={imageUrl}
                                        onChange={handleImageUrlChange}
                                        className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-primary focus:border-primary transition-colors duration-300 ${
                                            colorMode === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'
                                        }`}

                                    />
                                    {imageError && (
                                        <Text as="p" className="text-red-500 mb-2">
                                            {imageError}
                                        </Text>
                                    )}
                                </Box>
                            ) : (
                                <Box>
                                    <Heading as="h1" size="4" className="font-bold text-primary mb-4">
                                        Upload Image
                                    </Heading>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageFileChange}
                                        className="mt-1 block w-full text-white"
                                    />
                                    {imageError && (
                                        <Text as="p" className="text-red-500 mb-2">
                                            {imageError}
                                        </Text>
                                    )}
                                </Box>
                            )}

                            {/* Image Preview */}
                            <Box className="mt-4">
                                <RenderImagePreview imageUrl={imageUrl} imageError={imageError} imagePreviewUrl={imagePreviewUrl} />
                            </Box>

                            {/* Content Field */}
                            <Box>
                                {/* Switch and Labels */}
                                <Flex className="items-center mb-4" justify="between" align="center">
                                    <Heading as="h1" size="4" className="font-bold text-primary mb-2">
                                        Content
                                    </Heading>
                                    <Box>
                                        <Text as="span" className="mr-2 text-primary ">
                                            Light Mode
                                        </Text>
                                        <Switch
                                            id="color-mode-switch"
                                            checked={colorMode === 'dark'}
                                            onCheckedChange={toggleColorMode}
                                            className="items-center"
                                        ></Switch>
                                        <Text as="span" className="ml-2 text-primary ">
                                            Dark Mode
                                        </Text>
                                    </Box>
                                </Flex>
                                {/* Markdown Editor */}
                                <DynamicReactMDEditor
                                    value={content}
                                    onChange={handleContentChange}
                                    colorMode={colorMode}
                                />
                                {contentError && (
                                    <Text as="p" className="text-red-500 mb-2">
                                        {contentError}
                                    </Text>
                                )}
                            </Box>

                            {/* Form-Level Error Message */}
                            {formError && (
                                <Text as="p" className="text-red-500 mb-4">
                                    {formError}
                                </Text>
                            )}

                            {/* Action Buttons */}
                            <Flex className="justify-end space-x-4">
                                <AlertDialog.Root>
                                    <AlertDialog.Trigger>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className={`px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors duration-300 ${
                                                colorMode === 'dark'
                                                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            Cancel
                                        </Button>
                                    </AlertDialog.Trigger>
                                    <AlertDialog.Content maxWidth="450px">
                                        <AlertDialog.Title>Discard Changes</AlertDialog.Title>
                                        <AlertDialog.Description size="2">
                                            Are you sure you want to discard all changes? This action cannot be undone.
                                        </AlertDialog.Description>
                                        <Flex gap="3" mt="4" justify="end">
                                            <AlertDialog.Cancel>
                                                <Button variant="soft" color="gray">
                                                    Continue Editing
                                                </Button>
                                            </AlertDialog.Cancel>
                                            <AlertDialog.Action>
                                                <Button variant="solid" color="red" onClick={handleCancel}>
                                                    Discard Changes
                                                </Button>
                                            </AlertDialog.Action>
                                        </Flex>
                                    </AlertDialog.Content>
                                </AlertDialog.Root>
                                <Button
                                    type="submit"
                                    variant="solid"
                                    disabled={isSubmitting}
                                    className={`px-4 py-2 rounded-md text-white hover:bg-primaryDark transition-colors duration-300 ${
                                        colorMode === 'dark' ? 'bg-primary hover:bg-primaryDark' : 'bg-primary hover:bg-primaryDark'
                                    }`}
                                >
                                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </Flex>
                        </form>
                    </Box>
                )}
            </Flex>
        </section>
    );
}

export default EditEarlyLifePage;




