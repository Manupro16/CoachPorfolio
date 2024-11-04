// app/api/story/player-story/[TeamId]/route.ts

import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';
import {playerStoryPatchSchema} from '../../validation/serverStoryPatchSchema';
import * as yup from 'yup';
import { Prisma } from '@prisma/client';


export async function GET(request: NextRequest, {params}: { params: { TeamId: string } }) {
    const TeamId = parseInt(params.TeamId, 10);
    if (isNaN(TeamId)) {
        return new NextResponse('Invalid TeamId', {status: 400});
    }

    try {
        const playerStory = await prisma.playerCareer.findUnique({
            where: {id: TeamId},
        });

        if (!playerStory) {
            return new NextResponse('Player story not found', {status: 404});
        }

        return NextResponse.json(playerStory);
    } catch (error) {
        console.error('Error fetching player story:', error);
        return new NextResponse('Failed to fetch player story', {status: 500});
    }
}

export async function PATCH(request: NextRequest, {params}: { params: { TeamId: string } }) {
    const TeamId = parseInt(params.TeamId, 10);
    if (isNaN(TeamId)) {
        return new NextResponse('Invalid TeamId', {status: 400});
    }

    try {
        // Parse form data
        const formData = await request.formData();
        const title = formData.get('title')?.toString().trim() || undefined;
        const date = formData.get('date')?.toString().trim() || undefined;
        const rawImageSource = formData.get('imageSource')?.toString().trim() || undefined;
        const content = formData.get('content')?.toString().trim() || undefined;

        // Validate imageSource if present
        if (rawImageSource && rawImageSource !== 'URL' && rawImageSource !== 'UPLOAD') {
            return NextResponse.json({error: 'Invalid image source provided.'}, {status: 400});
        }

        const imageSource = rawImageSource as 'URL' | 'UPLOAD' | undefined;
        const imageField = imageSource === 'UPLOAD' ? formData.get('imageFile') : formData.get('imageUrl');

        let imageData: Buffer | undefined;
        let imageType: string | undefined;
        let imageUrl: string | undefined;

        if (imageSource === 'UPLOAD') {
            if (imageField instanceof File) {
                // Validate file size and type
                const MAX_SIZE = 5 * 1024 * 1024; // 5MB
                if (imageField.size > MAX_SIZE) {
                    return NextResponse.json({error: 'Image file size exceeds 5MB.'}, {status: 400});
                }

                const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
                if (!allowedTypes.includes(imageField.type)) {
                    return NextResponse.json({error: 'Unsupported image format. Allowed formats: JPEG, PNG, GIF.'}, {status: 400});
                }

                // Convert image file to buffer
                const arrayBuffer = await imageField.arrayBuffer();
                imageData = Buffer.from(arrayBuffer);
                imageType = imageField.type;
            } else {
                return NextResponse.json({error: 'Image file must be provided when image source is UPLOAD.'}, {status: 400});
            }
        } else if (imageSource === 'URL') {
            if (typeof imageField === 'string' && imageField.trim() !== '') {
                imageUrl = imageField.trim();
            } else {
                return NextResponse.json({error: 'Valid image URL must be provided when image source is URL.'}, {status: 400});
            }
        }

        // Prepare fields object with only provided data
         const fields: Prisma.PlayerCareerUpdateInput = {};

        if (title) fields.title = title;
        if (date) fields.date = date;
        if (content) fields.content = content;
        if (imageSource) fields.imageSource = imageSource;
        if (imageUrl) fields.imageUrl = imageUrl;
        if (imageData) {
            fields.imageData = imageData;
            fields.imageType = imageType;
        }

        // Validate the fields using the update schema
        const validatedData = await playerStoryPatchSchema.validate(fields, {abortEarly: false});


        const existingPlayerStory = await prisma.playerCareer.findUnique({
            where: {id: TeamId},
            select: {imageUrl: true, imageData: true, imageType: true},
        });

        if (!existingPlayerStory) {
            return NextResponse.json({error: 'Player story not found.'}, {status: 404});
        }

        // Prepare update data, retaining existing image data if not updating
       const updateData: Prisma.PlayerCareerUpdateInput = {};

        if (validatedData.title) updateData.title = validatedData.title;
        if (validatedData.date) updateData.date = validatedData.date;
        if (validatedData.content) updateData.content = validatedData.content;
        if (validatedData.imageSource) updateData.imageSource = validatedData.imageSource;

        // Handle image updates based on imageSource
        if (validatedData.imageSource === 'UPLOAD') {
            updateData.imageData = validatedData.imageData;
            updateData.imageType = validatedData.imageType;
            updateData.imageUrl = undefined; // Remove URL if uploading a new image
        } else if (validatedData.imageSource === 'URL') {
            updateData.imageUrl = validatedData.imageUrl;
            updateData.imageData = undefined; // Remove binary data if using URL
            updateData.imageType = undefined;
        } else {
            // If imageSource is not being updated, retain existing image data
            updateData.imageUrl = existingPlayerStory.imageUrl;
            updateData.imageData = existingPlayerStory.imageData;
            updateData.imageType = existingPlayerStory.imageType;
        }


        // Update the player story in the database
        const updatedPlayerStory = await prisma.playerCareer.update({
            where: {id: TeamId},
            data: updateData,
        });

        return NextResponse.json(updatedPlayerStory);

    } catch (error: unknown) {
        if (error instanceof yup.ValidationError) {
            // Extract validation errors
            const errors = error.inner.reduce((acc: Record<string, string>, err) => {
                if (err.path) {
                    acc[err.path] = err.message;
                }
                return acc;
            }, {});
            console.error('Validation failed:', errors);
            return NextResponse.json({errors}, {status: 400});
        } else {
            console.error('Error in PATCH /api/story/player-story/[TeamId]:', error);
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { TeamId: string } }) {
    const TeamId = parseInt(params.TeamId, 10);
    if (isNaN(TeamId)) {
        return new NextResponse('Invalid TeamId', { status: 400 });
    }

    try {
        await prisma.playerCareer.delete({
            where: { id: TeamId },
        });
        // Correctly return 204 No Content without a body
        return new NextResponse(null, { status: 204 });
    } catch (error: unknown) {
        // Handle specific Prisma errors
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') { // Record not found
                return new NextResponse('Player story not found.', { status: 404 });
            }
        }
        console.error('Error deleting player story:', error);
        return new NextResponse('Failed to delete player story', { status: 500 });
    }
}
