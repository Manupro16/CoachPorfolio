//story/edit/EditForm
import { storyCreateSchema, storyEditSchema } from '@/lib/validation/story/clientStorySchema';

import dynamic from "next/dynamic";
import React, {useEffect, useReducer} from "react";
import {useRouter} from "next/navigation";
import {ZodError} from "zod";
import axios from "axios";
import LoadingSkeleton from '@/components/LoadingSkeleton';
import {AlertDialog, Box, Button, Flex, Heading, RadioGroup, Switch, Text, TextField} from "@radix-ui/themes";
import RenderImagePreview from './ImagePreview';

const DynamicReactMDEditor = dynamic(() => import('@/components/DynamicReactMDEditor'), {
    ssr: false,
});

// Define ImageData interface to encapsulate image-related data
interface ImageData {
    source: 'URL' | 'UPLOAD';
    url?: string;      // Image URL if source is 'URL'
    file?: File;       // Image file if source is 'UPLOAD'
    previewUrl?: string; // For displaying image previews
}

// Define CareerFields interface for shared data fields
interface CareerFields {
    id?: number;
    title: string;
    content: string;
    date?: string;
    image: ImageData;
}

// Define ImageErrors interface
interface ImageErrors {
    source?: string;
    url?: string;
    file?: string;
    previewUrl?: string;
}

// Define FormErrors interface
interface FormErrors {
    id?: string;
    title?: string;
    content?: string;
    date?: string;
    image?: ImageErrors;
    form?: string;
}


// Define FormState interface
interface FormState {
    data: CareerFields;
    errors: FormErrors;
    isSubmitting: boolean;
    isLoading: boolean;
    editMode: boolean;
    colorMode: 'light' | 'dark';
}

// Initialize form state
const initialState: FormState = {
    data: {
        title: '',
        content: '',
        date: '',
        image: {
            source: 'URL',
            url: '',
            file: undefined,
            previewUrl: '',
        },
    },
    errors: {},
    isSubmitting: false,
    isLoading: true,
    editMode: false,
    colorMode: 'light',
};

// Define Action Types
type Actions =
    | { type: 'SET_FIELD'; field: keyof CareerFields; value: unknown }
    | { type: 'SET_IMAGE_FIELD'; field: keyof ImageData; value: unknown }
    | { type: 'SET_ERROR'; field: keyof Omit<FormErrors, 'image'>; value: string | undefined }
    | { type: 'SET_IMAGE_ERROR'; field: keyof ImageErrors; value: string | undefined }
    | { type: 'CLEAR_ERRORS' }
    | { type: 'SET_SUBMITTING'; value: boolean }
    | { type: 'SET_LOADING'; value: boolean }
    | { type: 'SET_EDIT_MODE'; value: boolean }
    | { type: 'SET_COLOR_MODE'; value: 'light' | 'dark' }
    | { type: 'RESET_FORM' };


// Define the reducer function
const formReducer = (state: FormState, action: Actions): FormState => {
    switch (action.type) {
        case 'SET_FIELD':
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.field]: action.value,
                },
                errors: {
                    ...state.errors,
                    [action.field]: undefined, // Clear the error for the field
                },
            };
        case 'SET_IMAGE_FIELD':
            return {
                ...state,
                data: {
                    ...state.data,
                    image: {
                        ...state.data.image,
                        [action.field]: action.value,
                    },
                },
                errors: {
                    ...state.errors,
                    image: undefined, // Clear image errors
                },
            };
        case 'SET_ERROR':
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.field]: action.value,
                },
            };
        case 'SET_IMAGE_ERROR':
            return {
                ...state,
                errors: {
                    ...state.errors,
                    image: {
                        ...state.errors.image,
                        [action.field]: action.value,
                    },
                },
            };

        case 'CLEAR_ERRORS':
            return {
                ...state,
                errors: {},
            };

        case 'SET_SUBMITTING':
            return {
                ...state,
                isSubmitting: action.value,
            };
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.value,
            };
        case 'SET_EDIT_MODE':
            return {
                ...state,
                editMode: action.value,
            };
        case 'SET_COLOR_MODE':
            return {
                ...state,
                colorMode: action.value,
            };
        case 'RESET_FORM':
            return initialState;
        default:
            return state;
    }
};

interface EditFormProps {
    APIEndpoint: string;
    APIEndpointImage: string;
    TeamId?: number;
}

function EditFormPage({ APIEndpoint, APIEndpointImage, TeamId }: EditFormProps) {


    const [state, dispatch] = useReducer(formReducer, initialState);
    const { data, errors, isSubmitting, isLoading, editMode, colorMode } = state;
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            try {
                dispatch({ type: 'SET_LOADING', value: true });

                const endpoint = TeamId ? `${APIEndpoint}/${TeamId}` : APIEndpoint;

                console.log('Fetching data from: ', endpoint);

                const response = await axios.get<CareerFields>(endpoint);
                const fetchedData = response.data;
                console.log('Fetched data: ', fetchedData);

                if (response.status === 204 || !fetchedData) {

                    // No data available -> Create mode
                    dispatch({ type: 'SET_EDIT_MODE', value: false });
                    dispatch({ type: 'SET_ERROR', field: 'form', value: 'No data available. Please create the entry.' });
                    dispatch({ type: 'SET_LOADING', value: false });
                    return;
                } else {
                    // Data available -> Edit mode
                    dispatch({ type: 'SET_EDIT_MODE', value: true });
                }

                // Update the form state with fetched data
                dispatch({ type: 'SET_FIELD', field: 'title', value: fetchedData.title ?? '' });
                dispatch({ type: 'SET_FIELD', field: 'content', value: fetchedData.content ?? '' });
                dispatch({ type: 'SET_FIELD', field: 'date', value: fetchedData.date ?? '' });

                // Handle image data based on imageSource
                // Handle image data based on imageSource
                if (fetchedData.image.url === 'URL') {
                    dispatch({ type: 'SET_IMAGE_FIELD', field: 'source', value: 'URL' });
                    dispatch({ type: 'SET_IMAGE_FIELD', field: 'url', value: fetchedData.image ?? '' });
                } else if (fetchedData.image.url === 'UPLOAD') {
                    dispatch({ type: 'SET_IMAGE_FIELD', field: 'source', value: 'UPLOAD' });
                    // Fetch the image blob from the server
                    const imageResponse = await axios.get(APIEndpointImage, {
                        responseType: 'blob',
                    });
                    const imageBlob = imageResponse.data;
                    // Create a File object from the blob
                    const file = new File([imageBlob], 'uploaded-image', { type: imageBlob.type });
                    dispatch({ type: 'SET_IMAGE_FIELD', field: 'file', value: file });
                    // Generate a preview URL
                    const previewUrl = URL.createObjectURL(imageBlob);
                    dispatch({ type: 'SET_IMAGE_FIELD', field: 'previewUrl', value: previewUrl });
                }



                dispatch({ type: 'SET_LOADING', value: false });
            } catch (error) {
                dispatch({ type: 'SET_EDIT_MODE', value: false });
                console.error('Error fetching data: ', error);
                dispatch({ type: 'SET_ERROR', field: 'form', value: 'Failed to fetch data. Please try again later.' });
                dispatch({ type: 'SET_LOADING', value: false });
            }
        }
        fetchData();
    }, [APIEndpoint, APIEndpointImage, TeamId]);






    // Updates the image source in the state when the user selects between URL and UPLOAD.
    const handleImageSourceChange = (value: string) => {
        dispatch({ type: 'SET_IMAGE_FIELD', field: 'source', value: value === 'url' ? 'URL' : 'UPLOAD' });
    };

    // Updates the image URL in the state when the user types in the URL input.
    const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        dispatch({ type: 'SET_IMAGE_FIELD', field: 'url', value: url });
    };

    // Updates the image file and preview URL in the state when the user uploads a file.
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const previewUrl = reader.result as string;
                dispatch({ type: 'SET_IMAGE_FIELD', field: 'file', value: file });
                dispatch({ type: 'SET_IMAGE_FIELD', field: 'previewUrl', value: previewUrl });
                dispatch({ type: 'SET_IMAGE_ERROR', field: 'file', value: '' }); // Clear any existing image errors
            };
            reader.readAsDataURL(file);
        } else {
            console.log('No file selected');
        }
    };

    // Validates the form data and returns an object containing any errors.
    const validateFormData = (formData: CareerFields): FormErrors => {
        const errors: FormErrors = {};

        // Validate image fields
        if (formData.image.source === 'URL' && !formData.image.url) {
            errors.image = { url: 'Please provide a valid image URL.' };
        } else if (formData.image.source === 'UPLOAD' && !formData.image.file) {
            errors.image = { file: 'Please upload an image file.' };
        }

        // Validate other fields using Zod schema
        try {
            const schema = editMode ? storyEditSchema : storyCreateSchema;
            schema.parse(formData);
        } catch (error) {
            if (error instanceof ZodError) {
                const zodErrors = error.flatten().fieldErrors;
                for (const key in zodErrors) {
                    const errorMessage = zodErrors[key]?.[0] || 'Invalid input.';
                    if (key === 'image') {
                        errors.image = { source: errorMessage };
                    } else {
                        errors[key as keyof FormErrors] = errorMessage;
                    }
                }
            }
        }

        return errors;
    };




    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Submitting form data:');
        dispatch({ type: 'SET_SUBMITTING', value: true });

        // Validate form data
        const validationErrors = validateFormData(data);
        if (Object.keys(validationErrors).length > 0) {
            dispatch({ type: 'SET_ERROR', field: 'form', value: 'Please correct the errors below.' });

            // Clear existing errors
            dispatch({ type: 'CLEAR_ERRORS' });

            // Dispatch individual errors
            for (const key in validationErrors) {
                console.log('Dispatching error for field:', key);
                if (key === 'image') {
                    const imageErrors = validationErrors.image!;
                    for (const imageKey in imageErrors) {
                        dispatch({
                            type: 'SET_IMAGE_ERROR',
                            field: imageKey as keyof ImageErrors,
                            value: imageErrors[imageKey as keyof ImageErrors],
                        });
                    }
                } else {
                    dispatch({
                        type: 'SET_ERROR',
                        field: key as keyof Omit<FormErrors, 'image'>,
                        value: validationErrors[key as keyof typeof validationErrors],
                    });
                }
            }
            dispatch({ type: 'SET_SUBMITTING', value: false });
            return;
        }

        // Prepare data for submission
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('date', data.date || '');
        formData.append('imageSource', data.image.source);

        if (data.image.source === 'URL' && data.image.url) {
            formData.append('imageUrl', data.image.url);
        } else if (data.image.source === 'UPLOAD' && data.image.file) {
            formData.append('imageFile', data.image.file);
        }

        // Log the FormData entries
        console.log('FormData entries:');
        for (let [ key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            console.log('Submitting data to API...');
            const endpoint = TeamId ? `${APIEndpoint}/${TeamId}` : APIEndpoint;
            const response = editMode
                ? await axios.patch(endpoint, formData)
                : await axios.post(endpoint, formData);

            if (response.status === 200 || response.status === 201) {
                console.log('Data saved successfully');
                // for (const [key, value] of Object.entries(response.data)) {
                //     console.log(`${key}:`, value);
                // }
                router.push('/story'); // Redirect upon success
            } else {
                dispatch({ type: 'SET_ERROR', field: 'form', value: 'An error occurred while saving data.' });
            }
        } catch (error) {
            console.error('Submission Error:', error);
            dispatch({ type: 'SET_ERROR', field: 'form', value: 'An unexpected error occurred.' });
        } finally {
            console.log("formData: " + formData)
            dispatch({ type: 'SET_SUBMITTING', value: false });
        }
    };

    const handleDiscardChanges = () => {
        dispatch({ type: 'RESET_FORM' }); // Reset the form state
        router.back(); // Redirect to the previous page
    };

    const handleFieldChange = (field: keyof CareerFields, value: unknown) => {
        dispatch({ type: 'SET_FIELD', field, value });

        // Validate the field after updating it
        const formData: CareerFields = { ...data, [field]: value };
        const validationErrors = validateFormData(formData);

        if (validationErrors && validationErrors[field]) {
            dispatch({ type: 'SET_ERROR', field, value: validationErrors[field] });
        } else {
            dispatch({ type: 'SET_ERROR', field, value: '' });
        }
    };

    const handleContentChange = (value: string | undefined) => {
        handleFieldChange('content', value || '');
    };


    return (
        <>
            {/* Form Container */}
            {isLoading ? (
                <LoadingSkeleton/>
            ) : (
                <Box className="shadow-md rounded-lg p-8 w-full max-w-3xl bg-gray-900">
                    {errors.form && (
                        <Text as="p" className="text-red-500 mb-4">
                            {errors.form}
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
                                value={data.title}
                                onChange={(e) => handleFieldChange('title', e.target.value)}
                                className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-primary focus:border-primary transition-colors duration-300 ${
                                    colorMode === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'
                                }`}
                            />

                            {errors.title && (
                                <Text as="p" className="text-red-500 mt-2">
                                    {errors.title }
                                </Text>
                            )}
                        </Box>

                        {/* Date Field */}
                        <Box>
                            <Heading as="h1" size="4" className="text-4xl font-bold text-primary mb-4">
                                Date
                            </Heading>
                            <TextField.Root
                                id="date"
                                name="date"
                                type="text"
                                placeholder="Enter date"
                                value={data.date || ''}
                                onChange={(e) => handleFieldChange('date', e.target.value)}
                                className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-primary focus:border-primary transition-colors duration-300 ${
                                    colorMode === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'
                                }`}
                            />
                            {errors.date && (
                                <Text as="p" className="text-red-500 mt-2">
                                    {errors.date }
                                </Text>
                            )}
                        </Box>

                        {/* Image Source Selection */}
                        <Box>
                            <Heading as="h1" size="4" className="font-bold text-primary mb-4">
                                Select Image Source
                            </Heading>
                            <RadioGroup.Root
                                value={data.image.source === 'URL' ? 'url' : 'upload'}
                                onValueChange={handleImageSourceChange}
                                aria-label="Image Source"
                                className="flex flex-row gap-4"
                            >
                                <Flex align="center">
                                    <RadioGroup.Item value="url" id="image-url-option"/>
                                    <label htmlFor="image-url-option" className="ml-2 text-gray-200 cursor-pointer">
                                        Use Image URL
                                    </label>
                                </Flex>
                                <Flex align="center">
                                    <RadioGroup.Item value="upload" id="image-upload-option"/>
                                    <label htmlFor="image-upload-option" className="ml-2 text-gray-200 cursor-pointer">
                                        Upload Image
                                    </label>
                                </Flex>
                            </RadioGroup.Root>
                        </Box>

                        {/* Conditionally Render Image Input Fields */}
                        {data.image.source === 'URL' ? (
                            <Box>
                                <Heading as="h1" size="4" className="font-bold text-primary mb-4">
                                    Image URL
                                </Heading>
                                <TextField.Root
                                    id="imageUrl"
                                    name="imageUrl"
                                    type="text"
                                    placeholder="Enter image URL"
                                    value={data.image.url || ''}
                                    onChange={handleImageUrlChange}
                                    className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-primary focus:border-primary transition-colors duration-300 ${
                                        colorMode === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'
                                    }`}
                                />
                                {errors.image && (
                                    <Text as="p" className="text-red-500 mt-2">
                                        {errors.image.url}
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
                                    onChange={handleImageUpload}
                                    className="mt-1 block w-full text-white"
                                />
                                {errors.image && (
                                    <Text as="p" className="text-red-500 mt-2">
                                        {errors.image.file}
                                    </Text>
                                )}
                            </Box>
                        )}

                        {/* Image Preview */}
                        <Box className="mt-4">
                            <RenderImagePreview
                                imageSource={data.image.source}
                                imageUrl={data.image.url}
                                imagePreviewUrl={data.image.previewUrl}
                                imageError={errors.image?.url || errors.image?.file}
                                colorMode={colorMode}
                            />
                        </Box>

                        {/* Content Field */}
                        <Box>
                            {/* Switch and Labels */}
                            <Flex className="items-center mb-4" justify="between" align="center">
                                <Heading as="h1" size="4" className="font-bold text-primary mb-2">
                                    Content
                                </Heading>
                                <Box className="flex items-center">
                                    <Text as="span" className="mr-2 text-primary">
                                        Light Mode
                                    </Text>
                                    <Switch
                                        id="color-mode-switch"
                                        checked={colorMode === 'dark'}
                                        onCheckedChange={() => dispatch({ type: 'SET_COLOR_MODE', value: colorMode === 'light' ? 'dark' : 'light' })}
                                        className="items-center"
                                    />
                                    <Text as="span" className="ml-2 text-primary">
                                        Dark Mode
                                    </Text>
                                </Box>
                            </Flex>
                            {/* Markdown Editor */}
                            <DynamicReactMDEditor
                                value={data.content || ''}
                                onChange={handleContentChange}
                                colorMode={colorMode}
                            />
                            {errors.content && (
                                <Text as="p" className="text-red-500 mt-2">
                                    {errors.content}
                                </Text>
                            )}
                        </Box>

                        {/* Form-Level Error Message */}
                        {errors.form && (
                            <Text as="p" className="text-red-500 mt-4">
                                {errors.form}
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
                                            <Button variant="solid" color="red" onClick={handleDiscardChanges}>
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
        </>
    )






}

export default EditFormPage;

