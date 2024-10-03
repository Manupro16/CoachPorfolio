// app/lib/validation/playerCareer.ts

import { z } from 'zod';

export const playerCareerSchema = z.object({
    team: z.string({
        required_error: 'Team is required',
        invalid_type_error: 'Team must be a string',
    }),
    image: z.string({
        required_error: 'Image URL is required',
        invalid_type_error: 'Image URL must be a string',
    }).url('Invalid image URL'),
    dates: z.string({
        required_error: 'Dates are required',
        invalid_type_error: 'Dates must be a string',
    }),
    description: z.string({
        required_error: 'Description is required',
        invalid_type_error: 'Description must be a string',
    }),
});

export type PlayerCareerData = z.infer<typeof playerCareerSchema>;

// For PATCH requests, allow partial updates
export const playerCareerUpdateSchema = playerCareerSchema.partial();
