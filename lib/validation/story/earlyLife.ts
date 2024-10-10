// app/lib/validation/story/earlyLife.ts

import { z } from 'zod';

// Define field schemas
export const fieldSchemas = {
    title: z.string().min(1, { message: 'Title cannot be empty' }),
    content: z.string().min(1, { message: 'Content cannot be empty' }),
    image: z.string().url({ message: 'Invalid image URL' }).optional(),
    imageData: z.boolean().optional(), // Include imageData as optional
};

// Base schema without refinement
export const baseEarlyLifeSchema = z.object(fieldSchemas);

export type BaseEarlyLifeData = z.infer<typeof baseEarlyLifeSchema>;

// Refined schema with transformations
export const earlyLifeSchema = baseEarlyLifeSchema
    .refine(
        (data) => data.image || data.imageData,
        {
            message: 'Either image URL or image file must be provided',
            path: ['image'],
        }
    )
    .transform((data) => {
        // Remove imageData from the final parsed data
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { imageData, ...rest } = data;
        return rest;
    });

export type EarlyLifeData = z.infer<typeof earlyLifeSchema>;

// For PATCH requests, allow partial updates
export const earlyLifeUpdateSchema = baseEarlyLifeSchema
    .partial()
    .refine(
        (data) => data.image || data.imageData,
        {
            message: 'Either image URL or image file must be provided',
            path: ['image'],
        }
    )
    .transform((data) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { imageData, ...rest } = data;
        return rest;
    });
