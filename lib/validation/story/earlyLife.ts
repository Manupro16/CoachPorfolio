// app/lib/validation/earlyLife.ts

import { z } from 'zod';

export const earlyLifeSchema = z.object({
    image: z
        .string({
            required_error: 'Image URL is required',
            invalid_type_error: 'Image URL must be a string',
        })
        .url('Invalid image URL'),
    title: z.string({
        required_error: 'Title is required',
        invalid_type_error: 'Title must be a string',
    }),
    content: z.string({
        required_error: 'Content is required',
        invalid_type_error: 'Content must be a string',
    }),
});

export type EarlyLifeData = z.infer<typeof earlyLifeSchema>;

// For PATCH requests, allow partial updates
export const earlyLifeUpdateSchema = earlyLifeSchema.partial();
