//story/edit/EditForm

import LoadingSkeleton from "@/components/LoadingSkeleton";
import {AlertDialog, Box, Button, Flex, Heading, RadioGroup, Switch, Text, TextField} from "@radix-ui/themes";
import React, { useEffect, useReducer} from "react";
import RenderImagePreview from "@/app/story/edit/ImagePreview";
import dynamic from "next/dynamic";
import { ZodSchema} from "zod";
import axios, {AxiosResponse} from "axios";
import {CoachingCareer, EarlyLife, PlayerCareer} from "@prisma/client";

 // Adjust the import path as necessary



const DynamicReactMDEditor = dynamic(() => import('@/components/DynamicReactMDEditor'), {
    ssr: false,
});

// Define a union type for all models
type CareerModel = EarlyLife | PlayerCareer | CoachingCareer;

// Extend the error type to include form-level errors
type FormErrors = Partial<CareerModel> & {
    form?: string; // Allow form-level errors
};

// Define FormState interface
interface FormState {
    Data: Partial<CareerModel>;
    errors: FormErrors;
    isSubmitting: boolean;
    isLoading: boolean;
    editMode: boolean; // Indicates if the form is in edit mode
    useImageUrl: boolean;
    imagePreviewUrl?: string; // For showing the preview of uploaded images
    ApiResponse: Partial<AxiosResponse>;
    colorMode: 'light' | 'dark';
}

// Define Actions type
type Actions =
    | { type: 'SET_FIELD'; field: keyof CareerModel; value: CareerModel[keyof CareerModel] }
    | { type: 'SET_ERROR'; field: keyof FormErrors; value: string }
    | { type: 'TOGGLE_EDIT_MODE'; value: boolean }
    | { type: 'SET_API_RESPONSE'; value: Partial<AxiosResponse> }
    | { type: 'SET_SUBMITTING'; value: boolean }
    | { type: 'SET_LOADING'; value: boolean }
    | { type: 'SET_COLOR_MODE'; value: 'light' | 'dark' }
    | { type: 'RESET_FORM' };


const formReducer = (state: FormState, action: Actions): FormState => {
    switch (action.type) {
        case 'SET_FIELD':
            return {
                ...state,
                Data: {
                    ...state.Data,
                    [action.field]: action.value
                },
                errors: {
                    ...state.errors,
                    [action.field]: undefined, // Clear error on field update
                },
            };

        case 'SET_ERROR':
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.field]: action.value, // Set error for specific field or global form error
                },
            };

        case 'TOGGLE_EDIT_MODE':
            return {
                ...state,
                editMode: action.value,
            };

        case 'SET_API_RESPONSE':
            return {
                ...state,
                ApiResponse: action.value,
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

        case 'SET_COLOR_MODE':
            return {
                ...state,
                colorMode: action.value,
            };

        case 'RESET_FORM':
            return {
                Data: {
                    title: '',
                    content: '',
                    image: '',
                    imageType: '',
                    imageData: undefined,
                    imageSource: 'URL',
                    date: ''
                    // Reset additional fields if any
                },
                errors: {},
                isSubmitting: false,
                isLoading: false,
                editMode: false,
                imagePreviewUrl: undefined,
                useImageUrl: true,
                ApiResponse: {},
                colorMode: 'light', // Reset colorMode separately
            };

        default:
            return state;
    }
};


const initialState: FormState = {
    Data: {
        title: '',
        content: '',
        image: '',
        imageType: '',
        imageData: undefined,
        imageSource: 'URL',
        date: ''
    },
    errors: {},
    isSubmitting: false,
    isLoading: true,
    editMode: false,
    useImageUrl: true,
    imagePreviewUrl: undefined,
    ApiResponse: {},
    colorMode: "light",
};


// Define Form Props
interface EditFormProps<T> {
    createValidationSchema: ZodSchema<T>;
    editValidationSchema?: ZodSchema<T>;
    APIEndpoint: string;
    APIEndpointImage: string;
    AdditionalFields?: Partial<T>[];
    TeamId? : number
}


function EditFormPage<T>({ createValidationSchema, editValidationSchema, APIEndpoint, APIEndpointImage, AdditionalFields, TeamId }: EditFormProps<T>) {

    const [state, dispatch] = useReducer(formReducer, initialState);
    const { Data, errors, isSubmitting, isLoading, editMode, ApiResponse, colorMode, useImageUrl, imagePreviewUrl } = state;

    // Log whenever isLoading changes
    useEffect(() => {
        console.log('isLoading status changed:', isLoading);
    }, [isLoading]);



    useEffect(() => {
        async function fetchData() {
            try {

                dispatch({ type: "SET_LOADING", value: true })


                const getEndpoint = () => {
                    return TeamId ? `${APIEndpoint}/${TeamId}` : `${APIEndpoint}`
                }

                const endpoint = getEndpoint()
                const response = await axios.get<Partial<CareerModel>>(endpoint)
                const fetchedData = response.data

                if (response.status!== 204 || !fetchedData) {
                    dispatch({ type: 'SET_ERROR', field: 'form', value: 'No data available. Please create the entry.' });
                    dispatch({ type: 'SET_LOADING', value: false });
                    return;
                }

                dispatch({ type: 'SET_FIELD', field: 'title', value: fetchedData.title ?? '' });
                dispatch({ type: 'SET_FIELD', field: 'content', value: fetchedData.content ?? '' });
                dispatch({ type: 'SET_FIELD', field: 'date', value: fetchedData.date ?? '' });
                dispatch({ type: 'SET_FIELD', field: 'imageSource', value: fetchedData.imageSource ?? 'URL' });

                if (fetchedData.imageSource === 'URL') {
                    dispatch({ type: 'SET_FIELD', field: 'image', value: fetchedData.image ?? '' });
                } else if (fetchedData.imageSource === 'UPLOAD' && fetchedData.imageType) {
                    // Fetch the image using the dynamic APIEndpointImage
                    const imageResponse = await axios.get(APIEndpointImage, {
                        responseType: 'blob',
                    });
                    const imageBlob = imageResponse.data;
                    dispatch({ type: 'SET_FIELD', field: 'imageData', value: imageBlob });
                    dispatch({ type: 'SET_FIELD', field: 'imageType', value: fetchedData.imageType });
                }

                dispatch({ type: 'SET_LOADING', value: false });

            } catch (error) {
                console.error('Error fetching data: ', error);
                dispatch({ type: 'SET_ERROR', field: 'form', value: 'Failed to fetch data. Please try again later.' });
                dispatch({ type: 'SET_LOADING', value: false });
            }
            
        }
        fetchData()
    }, [APIEndpoint, APIEndpointImage, TeamId])




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
                    <form className="space-y-6" onSubmit={() => {}}>
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
                                value={Data.title}
                                onChange={() => {}}
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
                                value={Data.date || ''}
                                onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'date', value: e.target.value })}
                                className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-primary focus:border-primary transition-colors duration-300 ${
                                    colorMode === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'
                                }`}
                            />
                            {errors.date && (
                                <Text as="p" className="text-red-500 mb-2">
                                    {errors.date}
                                </Text>
                            )}
                        </Box>

                        {/* Image Source Selection */}
                        <Box>
                            <Heading as="h1" size="4" className="font-bold text-primary mb-4">
                                Select Image Source
                            </Heading>
                            <RadioGroup.Root
                                value={useImageUrl ? 'url' : 'upload'}
                                onValueChange={() => {}}
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
                        {useImageUrl ? (
                            <Box>
                                <Heading as="h1" size="4" className="font-bold text-primary mb-4">
                                    Image URL
                                </Heading>
                                <TextField.Root
                                    id="imageUrl"
                                    name="imageUrl"
                                    type="text"
                                    placeholder="Enter image URL"
                                    value={Data.image || ''}
                                    onChange={() => {}}
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
                                    onChange={() => {}}
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
                            <RenderImagePreview
                                imageUrl={useImageUrl ? Data.image : undefined}
                                imageError={errors.image}
                                imagePreviewUrl={imagePreviewUrl}
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
                                        onCheckedChange={() => {}}
                                        className="items-center"
                                    />
                                    <Text as="span" className="ml-2 text-primary">
                                        Dark Mode
                                    </Text>
                                </Box>
                            </Flex>
                            {/* Markdown Editor */}
                            <DynamicReactMDEditor
                                value={Data.content || ''}
                                onChange={() => {}}
                                colorMode={colorMode}
                            />
                            {errors.content && (
                                <Text as="p" className="text-red-500 mb-2">
                                    {errors.content}
                                </Text>
                            )}
                        </Box>

                        {/* Form-Level Error Message */}
                        {errors.form && (
                            <Text as="p" className="text-red-500 mb-4">
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
                                            <Button variant="solid" color="red" onClick={() => {}}>
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

export default EditFormPage