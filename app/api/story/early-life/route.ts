// app/api/story/early-life/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Adjust the import path based on your project structure
import { z } from 'zod';

// Define Zod schemas for request validation

// Schema for GET and DELETE requests (only storyId is required)
const storyIdSchema = z.object({
    storyId: z.number().positive(),
});

// Schema for PUT requests
const putEarlyLifeSchema = z.object({
    storyId: z.number().positive(),
    updatedTitle: z.string().optional(),
    updatedContent: z.string().optional(),
    updatedImage: z.string().url().optional(),
}).refine((data) => data.updatedTitle || data.updatedContent || data.updatedImage, {
    message: 'At least one field (updatedTitle, updatedContent, updatedImage) must be provided for update.',
});

// GET Handler: Retrieve EarlyLife section for a specific Story
export async function GET(request: Request) {
    try {
        // Extract query parameters
        const { searchParams } = new URL(request.url);
        const storyIdParam = searchParams.get('storyId');

        if (!storyIdParam) {
            return NextResponse.json(
                { message: 'Missing required query parameter: storyId' },
                { status: 400 }
            );
        }

        const parsedStoryId = parseInt(storyIdParam, 10);

        // Validate storyId using Zod
        const parseResult = storyIdSchema.safeParse({ storyId: parsedStoryId });

        if (!parseResult.success) {
            const errorMessages = parseResult.error.errors.map(err => err.message).join(', ');
            return NextResponse.json(
                { message: errorMessages },
                { status: 400 }
            );
        }

        const { storyId } = parseResult.data;

        // Fetch the Story along with its EarlyLife
        const story = await prisma.story.findUnique({
            where: { id: storyId },
            include: { earlyLife: true },
        });

        if (!story) {
            return NextResponse.json(
                { message: `Story with id ${storyId} not found.` },
                { status: 404 }
            );
        }

        if (!story.earlyLife) {
            return NextResponse.json(
                { message: 'Early Life section not found for this story.' },
                { status: 404 }
            );
        }

        return NextResponse.json(story.earlyLife, { status: 200 });
    } catch (error) {
        console.error('GET /api/story/early-life Error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

// PUT Handler: Update or Create EarlyLife section for a specific Story
export async function PUT(request: Request) {
    try {
        // Parse the request body as JSON
        const body = await request.json();

        // Validate the request body using Zod
        const parseResult = putEarlyLifeSchema.safeParse(body);

        if (!parseResult.success) {
            const errorMessages = parseResult.error.errors.map(err => err.message).join(', ');
            return NextResponse.json(
                { message: errorMessages },
                { status: 400 }
            );
        }

        const { storyId, updatedTitle, updatedContent, updatedImage } = parseResult.data;

        // Fetch the Story to ensure it exists
        const story = await prisma.story.findUnique({
            where: { id: storyId },
            include: { earlyLife: true },
        });

        if (!story) {
            return NextResponse.json(
                { message: `Story with id ${storyId} not found.` },
                { status: 404 }
            );
        }

        if (!story.earlyLife) {
            // If EarlyLife doesn't exist for this Story, create it
            const createdEarlyLife = await prisma.earlyLife.create({
                data: {
                    title: updatedTitle || 'Early Life', // Default title if not provided
                    content: updatedContent || '',
                    image: updatedImage || '',
                    story: { connect: { id: storyId } },
                },
            });
            return NextResponse.json(createdEarlyLife, { status: 201 });
        }

        // Prepare the data object with only the fields provided
        const dataToUpdate: { title?: string; content?: string; image?: string } = {};
        if (updatedTitle) dataToUpdate.title = updatedTitle;
        if (updatedContent) dataToUpdate.content = updatedContent;
        if (updatedImage) dataToUpdate.image = updatedImage;

        // Update the EarlyLife entry
        const updatedEarlyLife = await prisma.earlyLife.update({
            where: { id: story.earlyLife.id },
            data: dataToUpdate,
        });

        return NextResponse.json(updatedEarlyLife, { status: 200 });
    } catch (error) {
        console.error('PUT /api/story/early-life Error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

// DELETE Handler: Delete EarlyLife section for a specific Story
export async function DELETE(request: Request) {
    try {
        // Parse the request body as JSON
        const body = await request.json();

        // Validate storyId using Zod
        const parseResult = storyIdSchema.safeParse(body);

        if (!parseResult.success) {
            const errorMessages = parseResult.error.errors.map(err => err.message).join(', ');
            return NextResponse.json(
                { message: errorMessages },
                { status: 400 }
            );
        }

        const { storyId } = parseResult.data;

        // Fetch the Story along with its EarlyLife
        const story = await prisma.story.findUnique({
            where: { id: storyId },
            include: { earlyLife: true },
        });

        if (!story) {
            return NextResponse.json(
                { message: `Story with id ${storyId} not found.` },
                { status: 404 }
            );
        }

        if (!story.earlyLife) {
            return NextResponse.json(
                { message: 'Early Life section not found for this story.' },
                { status: 404 }
            );
        }

        // Optional: Prevent deletion if it's the only EarlyLife entry
        const earlyLifeCount = await prisma.earlyLife.count();
        if (earlyLifeCount <= 1) {
            return NextResponse.json(
                { message: 'Cannot delete the only Early Life entry.' },
                { status: 400 }
            );
        }

        // Proceed to delete the EarlyLife entry
        await prisma.earlyLife.delete({
            where: { id: story.earlyLife.id },
        });

        return NextResponse.json(
            { message: 'Early Life deleted successfully.' },
            { status: 200 }
        );
    } catch (error) {
        console.error('DELETE /api/story/early-life Error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}