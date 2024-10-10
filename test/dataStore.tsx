import {AlertDialog, Box, Button, Flex, Heading, Switch, Text, TextField} from "@radix-ui/themes";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import RenderImagePreview from "@/app/story/edit/earlyLife/ImagePreview";
import React from "react";

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
{isLoading ? (
    <LoadingSkeleton />
) : (
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
    onChange={handleTitleChange}
    className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-primary focus:border-primary transition-colors duration-300 ${colorMode === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'}`}
    />
    {titleError && (
        <Text as="p" className="text-red-500 mb-2">
        {titleError}
        </Text>
    )}
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
    {imageError && (
        <Text color="red" size="2">
        {imageError}
        </Text>
    )}
    {/* Image Preview */}
    <Box className="mt-4">
    <RenderImagePreview imageUrl={imageUrl} imageError={imageError} />
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
    {fetchError && (
        <Text color="red" size="2">
        {fetchError}
        </Text>
    )}
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
)}
</Flex>
</section>
)
}

