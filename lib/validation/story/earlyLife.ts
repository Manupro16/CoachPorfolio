// app/lib/validation/earlyLife.ts

import { z } from 'zod';

export const earlyLifeSchema = z.object({
    image: z
        .string({
            required_error: 'Image URL is required',
            invalid_type_error: 'Image URL must be a string',
        })
        .url('Invalid image URL'),
    title: z
        .string({
            required_error: 'Title is required',
            invalid_type_error: 'Title must be a string',
        })
        .min(1, { message: 'Title cannot be empty' }),
    content: z
        .string({
            required_error: 'Content is required',
            invalid_type_error: 'Content must be a string',
        })
        .min(1, { message: 'Content cannot be empty' }),
});

export type EarlyLifeData = z.infer<typeof earlyLifeSchema>;

// For PATCH requests, allow partial updates
export const earlyLifeUpdateSchema = earlyLifeSchema.partial();
