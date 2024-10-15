// app/lib/validation/story/earlyLife.ts

import { z } from 'zod';

// Define field schemas
const fieldSchemas = {
    title: z.string().min(1, { message: 'Title cannot be empty' }),
    content: z.string().min(1, { message: 'Content cannot be empty' }),
    date: z.string().min(1, { message: 'Date cannot be empty' }), // Add validation for the date
    imageUrl: z.string().url({ message: 'Invalid image URL' }).optional(),
    imageFile: z.instanceof(File, { message: 'Invalid image file' }).optional(),
};

// Base schema
const baseEarlyLifeSchema = z.object(fieldSchemas);

// Create Schema
export const earlyLifeCreateSchema = baseEarlyLifeSchema
    .refine(
        (data) => data.imageUrl || data.imageFile,
        {
            message: 'Either provide an image URL or upload an image.',
            path: ['imageUrl'], // You can set this to ['image'] if preferred
        }
    )
    .transform((data) => {
        // Remove imageFile from the final parsed data if it exists
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { imageFile, ...rest } = data;
        return rest;
    });

export type EarlyLifeCreateData = z.infer<typeof earlyLifeCreateSchema>;

// Edit Schema
export const earlyLifeEditSchema = baseEarlyLifeSchema
    .partial() // Make all fields optional for the edit schema
    .transform((data) => {
        // Remove imageFile from the final parsed data if it exists
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { imageFile, ...rest } = data;
        return rest;
    });

export type EarlyLifeEditData = z.infer<typeof earlyLifeEditSchema>;