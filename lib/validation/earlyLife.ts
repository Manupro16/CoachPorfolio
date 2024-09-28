// lib/validation/earlyLife.ts

import { z } from 'zod';

// Schema for validating storyId (used in GET and DELETE)
export const storyIdSchema = z.object({
    storyId: z.number().positive({
        message: 'storyId must be a positive number.',
    }),
});

// Schema for validating PUT requests (update/create EarlyLife)
export const putEarlyLifeSchema = z
    .object({
        storyId: z.number().positive({
            message: 'storyId must be a positive number.',
        }),
        updatedTitle: z.string().optional(),
        updatedContent: z.string().optional(),
        updatedImage: z
            .string()
            .url({ message: 'updatedImage must be a valid URL.' })
            .optional(),
    })
    .refine(
        (data) => data.updatedTitle || data.updatedContent || data.updatedImage,
        {
            message:
                'At least one field (updatedTitle, updatedContent, updatedImage) must be provided for update.',
            path: ['updatedTitle', 'updatedContent', 'updatedImage'],
        }
    );
