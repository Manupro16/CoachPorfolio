'use client'

// EditFormPage.tsx
import {AlertDialog, Box, Button, Flex, Heading, RadioGroup, Switch, Text, TextField,} from '@radix-ui/themes';
import RenderImagePreview from './ImagePreview';
import LoadingSkeleton from "@/components/LoadingSkeleton";
import dynamic from "next/dynamic";
import {Controller, useForm} from "react-hook-form";
import {useCallback, useEffect, useState} from "react";
import axios from 'axios';
import {yupResolver} from "@hookform/resolvers/yup";
import createConditionalSchema from "@/app/story/edit/validationSchemas/validationSchema";
import {CareerFields,} from "@/app/story/edit/types";
import {useRouter} from 'next/navigation';

import {EarlyLife} from '@prisma/client'


const DynamicReactMDEditor = dynamic(() => import('@/components/DynamicReactMDEditor'), {
    ssr: false,
});


interface EditFormPageProps {
    APIEndpoint: string;
    APIEndpointImage: string;
    TeamId?: string | undefined;
    AddNewData?: boolean;
}

function EditFormPage({APIEndpoint, APIEndpointImage, TeamId, AddNewData}: EditFormPageProps) {

    const [isLoading, setIsLoading] = useState(true);
    const [formError, setFormError] = useState<string | null>(null);
    const [formSuccess, setFormSuccess] = useState<string | null>(null);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [colorMode, setColorMode] = useState<"light" | "dark">('dark');
    const router = useRouter();


    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: {errors, isSubmitting},
        watch,
        reset,
    } = useForm<CareerFields>({
        resolver: yupResolver(createConditionalSchema(isEditMode)),
        defaultValues: {
            title: '',
            date: '',
            content: '',
            image: {
                source: 'URL',
                url: '',
                file: [],
                previewUrl: '',
            },
        },

    });


    const imageSource = watch('image.source');

    const toggleColorMode = useCallback(() => {
        setColorMode(prev => prev === 'light' ? 'dark' : 'light');
    }, []);

    // Watch the imageSource field to conditionally clear other fields
    useEffect(() => {
        if (imageSource === 'UPLOAD') {
            setValue('image.url', '');
        } else if (imageSource === 'URL') {
            setValue('image.file', undefined);
        }
    }, [imageSource, setValue]);


    // Fetch data on component mount or when APIEndpoint/TeamId changes
    useEffect(() => {
        const fetchData = async () => {
            setFormError(null);

            try {


                if (!AddNewData) {
                    console.log(APIEndpoint);

                    const response = await axios.get<EarlyLife>(APIEndpoint);


                    if (response.status === 200 && response.data) {
                        const data = response.data;
                        // console.log('Fetched data:', data);
                        // Populate the form with fetched data
                        setValue("title", data.title);
                        setValue("date", data.date || '');
                        setValue("content", data.content);
                        setValue("image.source", data.imageSource);
                        setValue("image.url", data.imageUrl || '');

                        setIsEditMode(true);

                        // Handle image preview based on source
                        if (data.imageSource === 'UPLOAD') {
                            // Fetch image blob from APIEndpointImage
                            const imageResponse = await axios.get(APIEndpointImage, {
                                responseType: 'blob',
                            });

                            if (imageResponse.status === 200) {
                                const blob = imageResponse.data;
                                const previewUrl = URL.createObjectURL(blob);
                                setValue('image.previewUrl', previewUrl);
                            } else {
                                setFormError('Failed to fetch uploaded image.');
                            }
                        }
                    } else {
                        // No data found; set to create mode
                        setIsEditMode(false);
                        setIsLoading(false);
                    }

                } else {
                    // No APIEndpoint provided; set to create mode
                    setIsEditMode(false);
                    setIsLoading(false);
                }

            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    if (error.response && error.response.status === 404) {
                        // Data not found; set to create mode
                        setIsEditMode(false);
                    } else {
                        // Other Axios errors
                        setFormError(error.response?.data?.message || 'Failed to fetch data');
                        setIsEditMode(false);
                    }
                } else if (error instanceof Error) {
                    // Non-Axios errors that are instances of Error
                    setFormError(error.message || 'An unexpected error occurred');
                    setIsEditMode(false);
                } else {
                    // Errors that are not AxiosErrors or Error instances
                    setFormError('Something went wrong while fetching data');
                    setIsEditMode(false);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

    }, [APIEndpoint, setValue, APIEndpointImage, AddNewData]);

    // Clean up blob URLs to prevent memory leaks
    const files = watch('image.file');

    useEffect(() => {
        let previewUrl: string | undefined;

        if (files && files[0]) {
            previewUrl = URL.createObjectURL(files[0]);
            setValue('image.previewUrl', previewUrl);
        }

        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [files, setValue]);

    const previewUrl = watch('image.previewUrl');

    useEffect(() => {
        return () => {
            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);


  const onSubmit = useCallback(
    async (data: CareerFields) => {

        try {
            const formData = new FormData();
            const method = isEditMode ? 'patch' : 'post';

            formData.append('title', data.title);
            formData.append('date', data.date);
            formData.append('content', data.content);
            formData.append('imageSource', data.image.source);

            // Debug: Check the image file details before appending
            if (data.image.source === 'UPLOAD') {
                if (data.image.file && data.image.file.length > 0) {
                    const file = data.image.file[0];

                    if (file instanceof File) {
                        formData.append('imageFile', file, file.name);
                    }
                } else if (isEditMode) {
                    // Handle the case where no file is selected
                    formData.delete('imageSource');
                }
            } else if (data.image.source === 'URL') {
                if (data.image.url) {
                    formData.append('imageUrl', data.image.url);
                } else if (isEditMode) {
                    // Handle the case where no URL is provided
                    formData.delete('imageSource');
                }
            }

            // Proceed to send the formData to the backend
            const response = await axios({
                method,
                url: APIEndpoint,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // Handle the response
            if (response.status === 200 || response.status === 201) {
                setFormSuccess('Form submitted successfully!');
                router.push('/story');
            } else {
                setFormError('Failed to submit form. Please try again.');
            }

        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setFormError(error.response?.data?.message || 'Failed to submit form.');
            } else if (error instanceof Error) {
                setFormError(error.message || 'An unexpected error occurred.');
            } else {
                setFormError('Something went wrong while submitting the form.');
            }
        }
    },
    [APIEndpoint, isEditMode, router]
);

    const deleteData = useCallback(async () => {
        try {
            const response = await axios.delete(APIEndpoint);

            // Handle the response
            if (response.status === 204) {
                setFormSuccess('Data deleted successfully!');
                router.back()
                // Optionally, reset the form or redirect the user
            } else {
                setFormError('Failed to delete data. Please try again.');
            }

        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setFormError(error.response?.data?.message || 'Failed to delete data.');
            } else if (error instanceof Error) {
                setFormError(error.message || 'An unexpected error occurred.');
            } else {
                setFormError('Something went wrong while deleting the data.');
            }
        }
    }, [APIEndpoint, router]);


    return (
        <>
            {/* Form Container */}
            {isLoading ? (
                <LoadingSkeleton/>
            ) : (
                <Box
                    className={`shadow-md rounded-lg p-8 w-full max-w-3xl ${colorMode === 'dark' ? 'bg-gray-900' : 'bg-gray-700'}`}>
                    {/* Form Mode Indicator */}
                    <Flex as="div" justify="between">
                        {isEditMode ? (
                            <>
                                <Heading as="h2" size="4" className="text-2xl font-semibold text-green-500 mb-4">
                                    Edit Career Entry
                                </Heading>
                                {TeamId && (
                                    <AlertDialog.Root>
                                        <AlertDialog.Trigger>
                                            <Button color="red">Delete Data</Button>
                                        </AlertDialog.Trigger>
                                        <AlertDialog.Content maxWidth="450px">
                                            <AlertDialog.Title>Delete Data</AlertDialog.Title>
                                            <AlertDialog.Description size="2">
                                                Are you sure? This information will no longer be accessible and any
                                                existing information will be deleted.
                                            </AlertDialog.Description>

                                            <Flex gap="3" mt="4" justify="end">
                                                <AlertDialog.Cancel>
                                                    <Button variant="soft" color="gray">
                                                        Cancel
                                                    </Button>
                                                </AlertDialog.Cancel>
                                                <AlertDialog.Action>
                                                    <Button variant="solid" color="red" onClick={deleteData}>
                                                        Delete Data
                                                    </Button>
                                                </AlertDialog.Action>
                                            </Flex>
                                        </AlertDialog.Content>
                                    </AlertDialog.Root>
                                )}
                            </>
                        ) : (
                            <Heading as="h2" size="4" className="text-2xl font-semibold text-blue-500 mb-4">
                                Create New Career Entry
                            </Heading>
                        )}
                    </Flex>

                    {/* Display Form Error or Success Message */}

                    {formSuccess && (
                        <Text as="p" className='mb-4  text-green-500'>
                            {formSuccess}
                        </Text>
                    )}
                    {formError && (
                        <Text as="p" className='mb-4 text-red-500'>
                            {formError}
                        </Text>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
                        {/* Title Field */}
                        <Box>
                            <Heading as="h3" size="4" className="text-4xl font-bold text-primary mb-4">
                                Title
                            </Heading>
                            <TextField.Root
                                id="title"
                                type="text"
                                placeholder="Enter title"
                                {...register("title")}
                                className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-primary focus:border-primary transition-colors duration-300 ${
                                    colorMode === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'
                                }`}
                            />
                            {errors.title && (
                                <Text as="p" className="text-red-500 mt-2">
                                    {errors.title.message}
                                </Text>
                            )}
                        </Box>

                        {/* Date Field */}
                        <Box>
                            <Heading as="h3" size="4" className="text-4xl font-bold text-primary mb-4">
                                Date
                            </Heading>
                            <TextField.Root
                                id="date"
                                type="date"
                                placeholder="Enter date"
                                {...register('date')}
                                className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-primary focus:border-primary transition-colors duration-300 ${
                                    colorMode === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'
                                }`}
                            />
                            {errors.date && (
                                <Text as="p" className="text-red-500 mt-2">
                                    {errors.date.message}
                                </Text>
                            )}
                        </Box>

                        {/* Image Source Selection */}
                        <Box>
                            <Heading as="h3" size="4" className="font-bold text-primary mb-4">
                                Select Image Source
                            </Heading>
                            <Controller
                                control={control}
                                name="image.source"
                                defaultValue="URL" // Set a default value to ensure it's defined
                                render={({field}) => (
                                    <RadioGroup.Root
                                        value={field.value}
                                        onValueChange={(value: 'URL' | 'UPLOAD') => {
                                            field.onChange(value);
                                            // Update any other states or side effects here if necessary
                                        }}
                                        aria-label="Image Source"
                                        className="flex flex-row gap-4"
                                    >
                                        <Flex align="center">
                                            <RadioGroup.Item value="URL" id="image-url-option"/>
                                            <label htmlFor="image-url-option"
                                                   className="ml-2 text-gray-200 cursor-pointer">
                                                Use Image URL
                                            </label>
                                        </Flex>
                                        <Flex align="center">
                                            <RadioGroup.Item value="UPLOAD" id="image-upload-option"/>
                                            <label htmlFor="image-upload-option"
                                                   className="ml-2 text-gray-200 cursor-pointer">
                                                Upload Image
                                            </label>
                                        </Flex>
                                    </RadioGroup.Root>
                                )}
                            />
                            {errors.image?.source && (
                                <Text as="p" className="text-red-500 mt-2">
                                    {errors.image.source.message}
                                </Text>
                            )}
                        </Box>

                        {/* Conditionally Render Image Input Fields */}
                        {imageSource === 'URL' ? (
                            <Box>
                                <Heading as="h3" size="4" className="font-bold text-primary mb-4">
                                    Image URL
                                </Heading>
                                <TextField.Root
                                    id="imageUrl"
                                    type="text"
                                    {...register("image.url")}
                                    placeholder="Enter image URL"
                                    className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-primary focus:border-primary transition-colors duration-300 ${
                                        colorMode === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'
                                    }`}
                                />
                                {errors.image?.url && (
                                    <Text as="p" className="text-red-500 mt-2">
                                        {errors.image.url.message}
                                    </Text>
                                )}
                            </Box>
                        ) : (
                            <Box>
                                <Heading as="h3" size="4" className="font-bold text-primary mb-4">
                                    Upload Image
                                </Heading>
                                <label htmlFor="imageFile" className="block text-sm font-medium text-gray-200">
                                    Choose an image to upload
                                </label>
                                <Controller
                                    control={control}
                                    name="image.file"
                                    render={({field}) => (
                                        <>
                                            <input
                                                id="imageFile"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    // Convert FileList to an array
                                                    const files = e.target.files ? Array.from(e.target.files) : [];
                                                    field.onChange(files); // Pass the array to the form state

                                                    // Generate a preview URL
                                                    if (files && files[0]) {
                                                        const previewUrl = URL.createObjectURL(files[0]);
                                                        setValue('image.previewUrl', previewUrl);
                                                    }
                                                }}
                                                className={`mt-1 block w-full ${
                                                    colorMode === 'dark' ? 'text-white' : 'text-gray-700'
                                                }`}
                                            />
                                            {errors.image?.file && (
                                                <Text as="p" id="image-file-error" className="text-red-500 mt-2">
                                                    {errors.image.file.message}
                                                </Text>
                                            )}
                                        </>
                                    )}
                                />
                            </Box>
                        )}

                        {/* Image Preview */}
                        <Box className="mt-4">
                            <RenderImagePreview
                                imageSource={imageSource}
                                imageUrl={watch('image.url')}
                                imagePreviewUrl={watch('image.previewUrl')}
                                imageError={errors.image?.url?.message || errors.image?.file?.message}
                                colorMode={colorMode}
                            />
                        </Box>

                        {/* Content Field */}
                        <Box>
                            {/* Switch and Labels */}
                            <Flex className="items-center mb-4" justify="between" align="center">
                                <Heading as="h3" size="4" className="font-bold text-primary mb-2">
                                    Content
                                </Heading>
                                <Box className="flex items-center">
                                    <Text as="span" className="mr-2 text-primary">
                                        Light Mode
                                    </Text>
                                    <Switch
                                        id="color-mode-switch"
                                        checked={colorMode === 'dark'}
                                        onCheckedChange={toggleColorMode}
                                        className="items-center"
                                    />
                                    <Text as="span" className="ml-2 text-primary">
                                        Dark Mode
                                    </Text>
                                </Box>
                            </Flex>
                            {/* Markdown Editor */}
                            <Controller
                                control={control}
                                name="content"
                                render={({field}) => (
                                    <DynamicReactMDEditor
                                        {...field}
                                        colorMode={colorMode}
                                        onChange={(value) => field.onChange(value)}
                                    />
                                )}
                            />
                            {errors.content && (
                                <Text as="p" className="text-red-500 mt-2">
                                    {errors.content.message}
                                </Text>
                            )}
                        </Box>

                        {/* Form-Level Error Message */}
                        {formError && (
                            <Text as="p"
                                  className={`mt-4 ${formError === "Form submitted successfully!" ? 'text-green-500' : 'text-red-500'}`}>
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
                                            <Button variant="solid" color="red" onClick={() => {
                                                reset();
                                                router.back()
                                            }}>
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

