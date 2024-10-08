// app/story/edit/earlyLife/page.tsx

'use client'; // Ensure this component is treated as a client-side component

import React, {useCallback, useEffect, useState} from "react";
import {Box, Button, Flex, Heading, Switch, Text, TextField, AlertDialog } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import debounce from 'lodash.debounce';
import axios from "axios";
import { useRouter } from 'next/navigation';


// Dynamically import the ReactMDEditor component to prevent SSR issues
const DynamicReactMDEditor = dynamic(() => import('@/components/DynamicReactMDEditor'), {
    ssr: false,
});



function EditEarlyLifePage() {

    const [colorMode, setColorMode] = useState<'light' | 'dark'>('dark');
    const [title, setTitle] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [isValidImage, setIsValidImage] = useState<boolean>(true);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const router = useRouter();




    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/story/early-life');
                if (response.status === 200) {
                    const data = response.data;
                    if (data) {
                        setTitle(data.title || '');
                        setImageUrl(data.image || '');
                        setContent(data.content || '');
                        setIsEditing(true);
                    } else {
                        setIsEditing(false);
                    }
                }
            } catch (error) {
                console.error('Error fetching early life data:', error);
                setIsEditing(false);
            }
        };

        fetchData();
    }, []);

    // Custom handler to ensure content is always a string
    const handleContentChange = (value: string | undefined) => {
        setContent(value || '');
    };

    const toggleColorMode = () => {
        setColorMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
    };

    // Debounced handler for Image URL input changes
    const debouncedSetImageUrl = useCallback(
        debounce((url: string) => {
            setImageUrl(url);
            setIsValidImage(true); // Reset validity; will be updated based on image load
        }, 500),
        []
    );

    // Handler for Image URL input changes
    const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        debouncedSetImageUrl(url);
    };

    // Cleanup debounce on unmount
    useEffect(() => {
        return () => {
            debouncedSetImageUrl.cancel();
        };
    }, [debouncedSetImageUrl]);

    // Handler when image loads successfully
    const handleImageLoad = () => {
        setIsValidImage(true);
    };

    // Handler when image fails to load
    const handleImageError = () => {
        setIsValidImage(false);
    };

    // Function to validate URL format
    const isValidUrl = (url: string): boolean => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    // Form submission handler
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Client-side validation
        if (!title.trim()) {
            alert('Title is required.');
            return;
        }
        if (!content.trim()) {
            alert('Content is required.');
            return;
        }

        const data = {
            title,
            image: imageUrl,
            content,
        };

        try {
            setIsSubmitting(true);
            let response;
            if (isEditing) {
                // If editing existing data, make a PATCH request
                response = await axios.patch('/api/story/early-life', data);
            } else {
                // If creating new data, make a POST request
                response = await axios.post('/api/story/early-life', data);

            }

            if (response.status === 200 || response.status === 201) {
                // Redirect to the success page
                router.push('/story');

            } else {
                // Handle server errors
                console.error('Server Error:', response.data);
            }
        } catch (error) {
            // Handle network errors or other errors
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handler for the Cancel button
    const handleCancel = () => {
        // Reset form fields
        setTitle('');
        setImageUrl('');
        setContent('');
        setIsValidImage(true);
        router.back(); // Navigate back to the previous page
    };



    return (
        <section className="w-screen h-auto relative">
             {/*Background Gradient Overlay */}
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
                       <Text as="p" size="4" className="text-gray-200 max-w-2xl" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}>
                           Update the content of the Early Life section to provide insightful information about Coach Chuy Vera&#39;s background.
                       </Text>
                   </Box>

                   {/* Form Container */}
                   <Box className="shadow-md rounded-lg p-8 w-full max-w-3xl bg-gray-900">
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
                                   onChange={e => setTitle(e.target.value)}
                                   className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-primary focus:border-primary transition-colors duration-300 ${colorMode === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'}`}
                               />
                           </Box>

                           {/* Image URL Field with Live Preview */}
                           <Box>
                               <Heading as="h1" size="4" className=" font-bold text-primary mb-4">
                                   Image URL
                               </Heading>
                               <TextField.Root
                                   id="image"
                                   name="image"
                                   type="text"
                                   placeholder="Enter image URL"
                                   value={imageUrl}
                                   onChange={handleImageUrlChange}
                                   className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-primary focus:border-primary transition-colors duration-300 ${colorMode === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'}`}
                               />
                               {/* Image Preview */}
                               <Box className="mt-4">
                                   {imageUrl ? (
                                       isValidUrl(imageUrl) ? (
                                           isValidImage ? (
                                               <img
                                                   src={imageUrl}
                                                   alt="Image Preview"
                                                   onLoad={handleImageLoad}
                                                   onError={handleImageError}
                                                   className="w-full max-w-md h-auto rounded-md shadow-sm object-cover"
                                               />
                                           ) : (
                                               <Box className="w-full max-w-md h-48 flex flex-col items-center justify-center rounded-md shadow-sm bg-red-100 p-4">
                                                   <Text as="p" className="text-red-500 mb-2">
                                                       Image URL is invalid.
                                                   </Text>
                                                   <Text as="p" className="text-red-400 text-sm">
                                                       Please enter a valid image URL (e.g., JPEG, PNG).
                                                   </Text>
                                               </Box>
                                           )
                                       ) : (
                                           <Box className="w-full max-w-md h-48 flex items-center justify-center rounded-md shadow-sm bg-gray-200">
                                               <Text as="p" className="text-gray-500">
                                                   Please enter a valid URL (starting with http:// or https://).
                                               </Text>
                                           </Box>
                                       )
                                   ) : (
                                       <Box className="w-full max-w-md h-48 flex items-center justify-center rounded-md shadow-sm bg-gray-200">
                                           <Text as="p" className="text-gray-500">
                                               Enter an image URL to preview.
                                           </Text>
                                       </Box>
                                   )}
                               </Box>
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
                                       >
                                       </Switch>
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
                           </Box>

                           {/* Action Buttons */}
                           <Flex className="justify-end space-x-4">
                               <AlertDialog.Root>
                                   <AlertDialog.Trigger >
                                       <Button
                                           type="button"
                                           variant="outline"
                                           className={`px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors duration-300 ${
                                               colorMode === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
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
                                           <AlertDialog.Cancel >
                                               <Button variant="soft" color="gray">
                                                   Continue Editing
                                               </Button>
                                           </AlertDialog.Cancel>
                                           <AlertDialog.Action >
                                               <Button
                                                   variant="solid"
                                                   color="red"
                                                   onClick={() => {
                                                       handleCancel();
                                                   }}
                                               >
                                                   Discard Changes
                                               </Button>
                                           </AlertDialog.Action>
                                       </Flex>
                                   </AlertDialog.Content>
                               </AlertDialog.Root>
                               <Button
                                   type="submit"
                                   variant="solid"
                                   className={`px-4 py-2 rounded-md text-white hover:bg-primaryDark transition-colors duration-300 ${colorMode === 'dark' ? 'bg-primary hover:bg-primaryDark' : 'bg-primary hover:bg-primaryDark'}`}
                               >
                                   Save Changes
                               </Button>
                           </Flex>
                       </form>
                   </Box>
               </Flex>
        </section>
    )
}

export default EditEarlyLifePage;




