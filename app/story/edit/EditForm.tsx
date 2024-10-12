import LoadingSkeleton from "@/components/LoadingSkeleton";
import { AlertDialog, Box, Button, Flex, Heading, RadioGroup, Switch, Text, TextField } from "@radix-ui/themes";
import RenderImagePreview from "@/app/story/edit/ImagePreview";
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useReducer, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ZodError, ZodSchema } from "zod";
import axios, { AxiosResponse } from "axios";
import debounce from "lodash.debounce";

// Dynamically import the ReactMDEditor component to prevent SSR issues
const DynamicReactMDEditor = dynamic(() => import('@/components/DynamicReactMDEditor'), {
    ssr: false,
});

// Define the form's props interface using generics
interface EditFormProps<T extends { imageUrl?: string; content: string; title: string }> {
    validationSchema: ZodSchema<T>; // Zod validation schema for type T
    fetchUrl: string; // API endpoint to fetch initial data
    submitUrl: string; // API endpoint to submit form data
    onSuccess?: () => void; // Callback on successful submission
}

interface FormState<T extends { imageUrl?: string; content: string; title: string }> {
    data: T; // Holds the form data
    errors: Partial<Record<keyof T | 'image', string>>; // Field-specific and general errors
    isSubmitting: boolean;
    isLoading: boolean;
    useImageUrl: boolean; // Specific to image handling
    imageFile: File | null; // For file uploads
    imagePreviewUrl: string; // For image previews
    colorMode: 'light' | 'dark';
    formError: string; // Form-level error
}

type Action<T extends { imageUrl?: string; content: string; title: string }> =
    | { type: 'SET_FIELD'; field: keyof T; value: T[keyof T] }
    | { type: 'SET_ERROR'; field: keyof FormState<T>['errors']; value: string }
    | { type: 'SET_FORM_ERROR'; value: string }
    | { type: 'SET_SUBMITTING'; value: boolean }
    | { type: 'SET_LOADING'; value: boolean }
    | { type: 'SET_IMAGE_FILE'; file: File | null }
    | { type: 'SET_USE_IMAGE_URL'; useImageUrl: boolean }
    | { type: 'SET_IMAGE_PREVIEW_URL'; url: string }
    | { type: 'RESET_FORM'; initialData: T }
    | { type: 'SET_COLOR_MODE'; mode: 'light' | 'dark' };

function formReducer<T extends { imageUrl?: string; content: string; title: string }>(
    state: FormState<T>,
    action: Action<T>
): FormState<T> {
    switch (action.type) {
        case 'SET_FIELD':
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.field]: action.value,
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
        case 'SET_FORM_ERROR':
            return {
                ...state,
                formError: action.value,
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
        case 'SET_IMAGE_FILE':
            return {
                ...state,
                imageFile: action.file,
            };
        case 'SET_USE_IMAGE_URL':
            return {
                ...state,
                useImageUrl: action.useImageUrl,
            };
        case 'SET_IMAGE_PREVIEW_URL':
            return {
                ...state,
                imagePreviewUrl: action.url,
            };

        case 'SET_COLOR_MODE':
            return {
                ...state,
                colorMode: action.mode,
            };
        case 'RESET_FORM':
            return getInitialState(action.initialData);
        default:
            return state;
    }
}

function getInitialState<T extends { imageUrl?: string; content: string; title: string }>(initialData: T): FormState<T> {
    return {
        data: initialData,
        errors: {},
        isSubmitting: false,
        isLoading: false,
        useImageUrl: Boolean(initialData.imageUrl),
        imageFile: null,
        imagePreviewUrl: initialData.imageUrl || '',
        colorMode: 'dark',
        formError: '',
    };
}

function EditFormPage<T extends { imageUrl?: string; content: string; title: string }>({
                                                                                           validationSchema,
                                                                                           fetchUrl,
                                                                                           submitUrl,
                                                                                           onSuccess,
                                                                                       }: EditFormProps<T>) {

    const [state, dispatch] = useReducer(formReducer<T>, getInitialState({} as T));

    const {
        data,
        errors,
        isSubmitting,
        isLoading,
        useImageUrl,
        imagePreviewUrl,
        colorMode,
        formError,
    } = state;

    const router = useRouter();
    const previewUrlRef = useRef<string | null>(null);

    // Unified validation function
    const validateForm = (formData: Partial<T>): Partial<Record<keyof T | 'image', string>> => {
        try {
            validationSchema.parse(formData);
            return {};
        } catch (error) {
            if (error instanceof ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                const formattedErrors: Partial<Record<keyof T | 'image', string>> = {};

                for (const key in fieldErrors) {
                    if (fieldErrors[key] && fieldErrors[key].length > 0) {
                        formattedErrors[key as keyof T] = fieldErrors[key][0];
                    }
                }

                return formattedErrors;
            }
            return {};
        }
    };

    // Fetch initial data
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchData = async () => {
            dispatch({ type: 'SET_LOADING', value: true });
            try {
                const response: AxiosResponse<T> = await axios.get(fetchUrl, {
                    signal: controller.signal,
                });

                if (isMounted && response.status === 200 && response.data) {
                    console.log('Fetched Data:', response.data); // Debugging line
                    dispatch({ type: 'RESET_FORM', initialData: response.data });

                    if (response.data.imageUrl) {
                        dispatch({
                            type: 'SET_IMAGE_PREVIEW_URL',
                            url: response.data.imageUrl,
                        });
                    } else {
                        // If imageUrl is absent, set imagePreviewUrl to the image endpoint
                        dispatch({
                            type: 'SET_IMAGE_PREVIEW_URL',
                            url: '/api/story/early-life/image',
                        });
                    }
                }
            } catch (error) {
                if (isMounted) {
                    if (axios.isCancel(error)) {
                        console.log('Request canceled:', error.message);
                    } else {
                        console.error('Error fetching data:', error);
                        dispatch({
                            type: 'SET_FORM_ERROR',
                            value: 'Failed to load data. Please try again.',
                        });
                    }
                }
            } finally {
                if (isMounted) {
                    dispatch({ type: 'SET_LOADING', value: false });
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [fetchUrl, validationSchema]);

    // Debounced function to validate image loading
    const debouncedValidateImage = useCallback(
        debounce((url: string) => {
            const imageErrors = validateForm({imageUrl: url} as Partial<T>);
            if (!imageErrors.imageUrl) {
                const img = new Image();
                img.onload = () => dispatch({type: 'SET_ERROR', field: 'image', value: ''});
                img.onerror = () => dispatch({type: 'SET_ERROR', field: 'image', value: 'Failed to load image.'});
                img.src = url;
            }
        }, 500),
        [validationSchema],
    );

    // Handle field changes
    const handleFieldChange = <K extends keyof T>(field: K, value: T[K]) => {
        dispatch({type: 'SET_FIELD', field, value});

        const validationErrors = validateForm({[field]: value} as unknown as Partial<T>);

        if (validationErrors[field]) {
            dispatch({
                type: 'SET_ERROR',
                field: field as keyof FormState<T>['errors'],
                value: validationErrors[field],
            });
        } else {
            dispatch({
                type: 'SET_ERROR',
                field: field as keyof FormState<T>['errors'],
                value: '',
            });
        }
    };

    // Handle Image URL change
    const handleImageUrlChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const url = e.target.value;
        handleFieldChange('imageUrl', url);
        debouncedValidateImage(url);
    };

    // Handle Image File change
    const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0] || null;
        dispatch({type: 'SET_IMAGE_FILE', file});
        dispatch({type: 'SET_ERROR', field: 'image', value: ''});

        if (file) {
            // Revoke the previous object URL if it exists
            if (previewUrlRef.current) {
                URL.revokeObjectURL(previewUrlRef.current);
            }

            const previewUrl = URL.createObjectURL(file);
            previewUrlRef.current = previewUrl;
            dispatch({type: 'SET_IMAGE_PREVIEW_URL', url: previewUrl});
        } else {
            // Revoke the previous object URL if it exists
            if (previewUrlRef.current) {
                URL.revokeObjectURL(previewUrlRef.current);
                previewUrlRef.current = null;
            }
            dispatch({type: 'SET_IMAGE_PREVIEW_URL', url: ''});
        }
    };

    // Handle Image Source Selection
    const handleUseImageUrlChange = (useUrl: boolean) => {
        dispatch({type: 'SET_USE_IMAGE_URL', useImageUrl: useUrl});

        if (useUrl) {
            // Reset image file-related state
            dispatch({type: 'SET_IMAGE_FILE', file: null});
            dispatch({type: 'SET_IMAGE_PREVIEW_URL', url: ''});
        } else {
            // Reset image URL-related state
            handleFieldChange('imageUrl', '');
            dispatch({type: 'SET_IMAGE_PREVIEW_URL', url: ''});
        }
    };

    // Cleanup debounce and object URLs on unmount
    useEffect(() => {
        return () => {
            debouncedValidateImage.cancel();
            if (previewUrlRef.current) {
                URL.revokeObjectURL(previewUrlRef.current);
            }
        };
    }, [debouncedValidateImage]);

    // Handle form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        // Prepare data for validation
        const formData: Partial<T> = {
            ...data,
        };

        // Validate the data using the unified validation function
        const validationErrors = validateForm(formData);

        if (Object.keys(validationErrors).length > 0) {
            // Update errors in state
            for (const key in validationErrors) {
                const typedKey = key as keyof T | 'image';
                const errorMessage = validationErrors[typedKey];
                if (errorMessage) {
                    dispatch({
                        type: 'SET_ERROR',
                        field: typedKey,
                        value: errorMessage,
                    });
                }
            }
            return; // Prevent form submission if validation fails
        } else {
            // Clear form-level errors
            dispatch({type: 'SET_FORM_ERROR', value: ''});
        }

        // Create FormData for submission
        const submissionData = new FormData();
        Object.keys(data).forEach((key) => {
            const typedKey = key as keyof T;
            const value = data[typedKey];
            if (value !== undefined && value !== null) {
                submissionData.append(key, value as string | Blob);
            }
        });

        if (useImageUrl) {
            if (typeof data.imageUrl === 'string') {
                submissionData.append('imageUrl', data.imageUrl);
            }
        } else if (state.imageFile) {
            submissionData.append('imageFile', state.imageFile);
        } else {
            dispatch({type: 'SET_ERROR', field: 'image', value: 'Please provide an image.'});
            return;
        }

        try {
            dispatch({type: 'SET_SUBMITTING', value: true});

            const response: AxiosResponse = await axios.post(submitUrl, submissionData, {
                headers: {'Content-Type': 'multipart/form-data'},
            });

            if (response.status === 200 || response.status === 201) {
                if (onSuccess) onSuccess();
                else router.push('/story');
            } else {
                console.error('Server Error:', response.data);
                dispatch({
                    type: 'SET_FORM_ERROR',
                    value: 'An error occurred while saving data.',
                });
            }
        } catch (error) {
            console.error('Submission Error:', error);
            dispatch({
                type: 'SET_FORM_ERROR',
                value: 'An unexpected error occurred. Please try again.',
            });
        } finally {
            dispatch({type: 'SET_SUBMITTING', value: false});
        }
    };

    const handleColorModeChange = (mode: 'light' | 'dark') => {
        dispatch({ type: 'SET_COLOR_MODE', mode });
    };


    // Handler for the Cancel button
    const handleCancel = (): void => {
        router.back();
    };

    return (
        <>
            {/* Form Container */}
            {isLoading ? (
                <LoadingSkeleton/>
            ) : (
                <Box className="shadow-md rounded-lg p-8 w-full max-w-3xl bg-gray-900">
                    {formError && (
                        <Text as="p" className="text-red-500 mb-4">
                            {formError}
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
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleFieldChange('title', e.target.value)}
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

                        {/* Image Source Selection */}
                        <Box>
                            <Heading as="h1" size="4" className="font-bold text-primary mb-4">
                                Select Image Source
                            </Heading>
                            <RadioGroup.Root
                                value={useImageUrl ? 'url' : 'upload'}
                                onValueChange={(value: string) => handleUseImageUrlChange(value === 'url')}
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
                                    value={data.imageUrl || ''}
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
                            <RenderImagePreview
                                imageUrl={data.imageUrl || ''}
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
                                        onCheckedChange={(checked: boolean) => handleColorModeChange(checked ? 'dark' : 'light')}
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
                                onChange={(value: string | undefined) => handleFieldChange('content', value || '')}
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
        </>
    );
}

export default EditFormPage;
