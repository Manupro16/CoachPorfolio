// lib/validation/story/storyValidation.ts

import { z } from 'zod';

// Define field schemas common to all story components
const fieldSchemas = {
    title: z.string().min(1, { message: 'Title cannot be empty' }),
    content: z.string().min(1, { message: 'Content cannot be empty' }),
    date: z.string().min(1, { message: 'Date cannot be empty' }),
    imageUrl: z.string().url({ message: 'Invalid image URL' }).optional(),  // Optional in edit mode
    imageFile: z.instanceof(File, { message: 'Invalid image file' }).optional(),  // Optional in edit mode
};

// **Create Schema** - All fields are required
export const storyCreateSchema = z.object({
    title: fieldSchemas.title,
    content: fieldSchemas.content,
    date: fieldSchemas.date,
    imageUrl: fieldSchemas.imageUrl,  // Image URL required in create mode
    imageFile: fieldSchemas.imageFile,  // Image file required in create mode
});

// **Edit Schema** - Image fields are optional
export const storyEditSchema = z.object({
    title: fieldSchemas.title,
    content: fieldSchemas.content,
    date: fieldSchemas.date.optional(),  // Date can be optional in edit mode
    imageUrl: fieldSchemas.imageUrl.optional(),
    imageFile: fieldSchemas.imageFile.optional(),
});

// **Field-Level Create Schema** - For field validation in create mode
export const storyFieldCreateSchema = storyCreateSchema;

// **Field-Level Edit Schema** - For field validation in edit mode
export const storyFieldEditSchema = storyEditSchema;
