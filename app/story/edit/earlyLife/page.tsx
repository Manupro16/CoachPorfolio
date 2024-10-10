// app/story/edit/earlyLife/page.tsx

'use client'; // Ensure this component is treated as a client-side component

import React, {useCallback, useEffect, useReducer, useRef} from "react";
import {Box, Button, Flex, Heading, Switch, Text, TextField, AlertDialog, RadioGroup  } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import debounce from 'lodash.debounce';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import {
    BaseEarlyLifeData,
    earlyLifeSchema,
} from '@/lib/validation/story/earlyLife';
import LoadingSkeleton from "@/components/LoadingSkeleton";
import RenderImagePreview from "./ImagePreview";



// Dynamically import the ReactMDEditor component to prevent SSR issues
const DynamicReactMDEditor = dynamic(() => import('@/components/DynamicReactMDEditor'), {
    ssr: false,
});

// Define the state interface
interface FormState {
    colorMode: 'light' | 'dark';
    title: string;
    imageUrl: string;
    content: string;
    isEditing: boolean;
    isSubmitting: boolean;
    isLoading: boolean;
    useImageUrl: boolean;
    imageFile: File | null;
    imagePreviewUrl: string;
    errors: {
        title: string;
        image: string;
        content: string;
        fetch: string;
        form: string;
    };
    fetchError: string;
    formError: string;
}

// Define the initial state
const initialState: FormState = {
    colorMode: 'dark',
    title: '',
    imageUrl: '',
    content: '',
    isEditing: false,
    isSubmitting: false,
    isLoading: true,
    useImageUrl: true,
    imageFile: null,
    imagePreviewUrl: '',
    errors: {
        title: '',
        image: '',
        content: '',
        fetch: '',
        form: '',
    },
    fetchError: '',
    formError: '',
};

// Define a generic SetFieldAction
type SetFieldAction<K extends keyof FormState> = {
    type: 'SET_FIELD';
    field: K;
    value: FormState[K];
};

// Define the complete Action type
type Action =
    | SetFieldAction<keyof FormState>
    | { type: 'SET_ERROR'; field: keyof FormState['errors']; value: string }
    | { type: 'SET_STATE'; payload: Partial<FormState> }
    | { type: 'RESET_FORM' };

// Reducer function
function formReducer(state: FormState, action: Action): FormState {
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, [action.field]: action.value };
        case 'SET_ERROR':
            return { ...state, errors: { ...state.errors, [action.field]: action.value } };
        case 'SET_STATE':
            return { ...state, ...action.payload };
        case 'RESET_FORM':
            return initialState;
        default:
            return state;
    }
}



function EditEarlyLifePage() {

    const [state, dispatch] = useReducer(formReducer, initialState);


    const {
        colorMode,
        title,
        imageUrl,
        content,
        isSubmitting,
        isLoading,
        useImageUrl,
        imagePreviewUrl,
        errors,
        fetchError,
        formError,
    } = state;

    const router = useRouter();
    const previewUrlRef = useRef<string | null>(null);


    // Unified validation function
    const validateForm = (fields: Partial<BaseEarlyLifeData>): { [key: string]: string } => {
        try {
            earlyLifeSchema.parse(fields);
            return {};
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                const errors: { [key: string]: string } = {};
                for (const key in fieldErrors) {
                    if (fieldErrors[key]) {
                        errors[key] = fieldErrors[key]?.[0] || '';
                    }
                }
                return errors;
            }
            return {};
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        let isMounted = true;

        const fetchData = async () => {
            try {
                const response = await axios.get('/api/story/early-life', {
                    signal: controller.signal,
                });
                if (isMounted) {
                    if (response.status === 200) {
                        const data = response.data;
                        if (data) {
                            dispatch({
                                type: 'SET_STATE',
                                payload: {
                                    title: data.title || '',
                                    content: data.content || '',
                                    isEditing: true,
                                },
                            });

                            if (data.image) {
                                dispatch({
                                    type: 'SET_STATE',
                                    payload: {
                                        useImageUrl: true,
                                        imageUrl: data.image,
                                        imagePreviewUrl: data.image,
                                    },
                                });
                            } else if (data.imageData) {
                                dispatch({
                                    type: 'SET_STATE',
                                    payload: {
                                        useImageUrl: false,
                                        imagePreviewUrl: '/api/story/early-life/image',
                                    },
                                });
                            }
                        } else {
                            dispatch({ type: 'SET_FIELD', field: 'isEditing', value: false });
                        }
                    }
                }
            } catch (error) {
                if (isMounted) {
                    if (axios.isCancel(error)) {
                        console.log('Request canceled:', error.message);
                        // Do not set fetchError if the request was canceled
                    } else {
                        console.error('Error fetching early life data:', error);
                        dispatch({
                            type: 'SET_FIELD',
                            field: 'fetchError',
                            value: 'No Data Available. Please create new data.',
                        });
                    }
                }
            } finally {
                if (isMounted) {
                    dispatch({ type: 'SET_FIELD', field: 'isLoading', value: false });
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);




    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        dispatch({ type: 'SET_FIELD', field: 'title', value });
        const errors = validateForm({ title: value });
        dispatch({ type: 'SET_ERROR', field: 'title', value: errors.title || '' });
    };

    const handleContentChange = (value: string | undefined): void => {
        const contentValue = value || '';
        dispatch({ type: 'SET_FIELD', field: 'content', value: contentValue });
        const errors = validateForm({ content: contentValue });
        dispatch({ type: 'SET_ERROR', field: 'content', value: errors.content || '' });
    };

    const toggleColorMode = (): void => {
        dispatch({
            type: 'SET_FIELD',
            field: 'colorMode',
            value: colorMode === 'dark' ? 'light' : 'dark',
        });
    };

    // Debounced function to validate image loading
    const debouncedValidateImage = useCallback(
        debounce((url: string) => {
            const errors = validateForm({ image: url });
            if (!errors.image) {
                const img = new Image();
                img.onload = () => dispatch({ type: 'SET_ERROR', field: 'image', value: '' });
                img.onerror = () => dispatch({ type: 'SET_ERROR', field: 'image', value: 'Failed to load image.' });
                img.src = url;
            }
        }, 500),
        [],
    );

    const handleUseImageUrlChange = (useUrl: boolean) => {
        dispatch({ type: 'SET_FIELD', field: 'useImageUrl', value: useUrl });

        if (useUrl) {
            // Reset image file-related state
            dispatch({ type: 'SET_FIELD', field: 'imageFile', value: null });
            dispatch({ type: 'SET_FIELD', field: 'imagePreviewUrl', value: '' });
        } else {
            // Reset image URL-related state
            dispatch({ type: 'SET_FIELD', field: 'imageUrl', value: '' });
        }
    };

    const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const url = e.target.value;
        dispatch({ type: 'SET_FIELD', field: 'imageUrl', value: url });
        const errors = validateForm({ image: url });
        dispatch({ type: 'SET_ERROR', field: 'image', value: errors.image || '' });
        debouncedValidateImage(url);
    };



    const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0] || null;
        dispatch({ type: 'SET_FIELD', field: 'imageFile', value: file });
        dispatch({ type: 'SET_ERROR', field: 'image', value: '' });

        if (file) {
            // Revoke the previous object URL if it exists
            if (previewUrlRef.current) {
                URL.revokeObjectURL(previewUrlRef.current);
            }

            const previewUrl = URL.createObjectURL(file);
            previewUrlRef.current = previewUrl;
            dispatch({ type: 'SET_FIELD', field: 'imagePreviewUrl', value: previewUrl });
        } else {
            // Revoke the previous object URL if it exists
            if (previewUrlRef.current) {
                URL.revokeObjectURL(previewUrlRef.current);
                previewUrlRef.current = null;
            }
            dispatch({ type: 'SET_FIELD', field: 'imagePreviewUrl', value: '' });
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
            title: state.title,
            content: state.content,
            image: state.useImageUrl ? state.imageUrl : undefined,
            imageData: state.useImageUrl ? undefined : state.imageFile ? true : undefined,
        };

        // Validate the data using the unified validation function
        const errors = validateForm(fields);
        if (Object.keys(errors).length > 0) {
            // Update errors in state
            for (const key in errors) {
                dispatch({ type: 'SET_ERROR', field: key as keyof FormState['errors'], value: errors[key] });
            }
            return; // Prevent form submission if validation fails
        } else {
            // Clear errors
            dispatch({ type: 'SET_STATE', payload: { errors: initialState.errors } });
        }

        // Create FormData
        const formData = new FormData();
        formData.append('title', state.title);
        formData.append('content', state.content);

        if (state.useImageUrl) {
            formData.append('image', state.imageUrl);
        } else if (state.imageFile) {
            formData.append('image', state.imageFile);
        } else {
            dispatch({ type: 'SET_ERROR', field: 'image', value: 'Please provide an image.' });
            return;
        }

        // Proceed with form submission
        try {
            dispatch({ type: 'SET_FIELD', field: 'isSubmitting', value: true });
            let response;
            if (state.isEditing) {
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
                dispatch({ type: 'SET_ERROR', field: 'form', value: 'An error occurred while saving data.' });
            }
        } catch (error) {
            console.error('Error:', error);
            dispatch({ type: 'SET_ERROR', field: 'form', value: 'An unexpected error occurred. Please try again.' });
        } finally {
            dispatch({ type: 'SET_FIELD', field: 'isSubmitting', value: false });
        }
    };

    // Handler for the Cancel button
    const handleCancel = (): void => {
        router.back();
    };

    useEffect(() => {
        return () => {
            // Cleanup the object URL when the component unmounts
            if (previewUrlRef.current) {
                URL.revokeObjectURL(previewUrlRef.current);
            }
        };
    }, []);


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
                        Update the content of the Early Life section to provide insightful information about Coach Chuy Vera&#39;s background.
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

                                {errors.title && (
                                    <Text as="p" className="text-red-500 mb-2">
                                        {errors.title}
                                    </Text>
                                )}
                            </Box>

                            <Box>
                                <Heading as="h1" size="4" className="font-bold text-primary mb-4">
                                    Select Image Source
                                </Heading>
                                <RadioGroup.Root
                                    defaultValue={useImageUrl ? 'url' : 'upload'}
                                    onValueChange={(value) => handleUseImageUrlChange(value === 'url')}
                                    aria-label="Image Source"
                                >
                                    <Flex direction="row" gap="4">
                                        <Flex align="center">
                                            <RadioGroup.Item value="url" id="image-url-option" />
                                            <label htmlFor="image-url-option" className="ml-2 text-gray-200">
                                                Use Image URL
                                            </label>
                                        </Flex>
                                        <Flex align="center">
                                            <RadioGroup.Item value="upload" id="image-upload-option" />
                                            <label htmlFor="image-upload-option" className="ml-2 text-gray-200">
                                                Upload Image
                                            </label>
                                        </Flex>
                                    </Flex>
                                </RadioGroup.Root>
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
                                    {errors.image && (
                                        <Text as="p" className="text-red-500 mb-2">
                                            {errors.image}
                                        </Text>
                                    )}
                                </Box>
                            ) : (
                                <Box>
                                    <Heading as="h1" size="4" className="font-bold text-primary mb-4">
                                        Upload Image
                                    </Heading>
                                    <label htmlFor="imageFile" className="block text-sm font-medium text-gray-200">
                                        Choose an image to upload
                                    </label>
                                    <input
                                        id="imageFile"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageFileChange}
                                        className="mt-1 block w-full text-white"
                                    />
                                    {errors.image && (
                                        <Text as="p" className="text-red-500 mb-2">
                                            {errors.image}
                                        </Text>
                                    )}
                                </Box>
                            )}

                            {/* Image Preview */}
                            <Box className="mt-4">
                                <RenderImagePreview imageUrl={imageUrl} imageError={errors.image} imagePreviewUrl={imagePreviewUrl} />
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
                                {errors.content && (
                                    <Text as="p" className="text-red-500 mb-2">
                                        {errors.content}
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




