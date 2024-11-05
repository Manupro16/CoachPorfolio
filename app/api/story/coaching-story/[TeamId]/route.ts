import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {Prisma} from "@prisma/client";
import {StoryPatchSchema} from "@/app/api/story/validation/serverStoryPatchSchema";
import * as yup from "yup";

export async function GET(request: NextRequest, {params}: { params: { TeamId: string } }) {
    const TeamId = parseInt(params.TeamId, 10);
    if (isNaN(TeamId)) {
        return new NextResponse('Invalid TeamId', {status: 400});
    }

    try {
        const coachingStory = await prisma.coachingCareer.findUnique({
            where: {id: TeamId},
        });

        if (!coachingStory) {
            return new NextResponse('Coach story not found', {status: 404});
        }

        return NextResponse.json(coachingStory);
    } catch (error) {
        console.error('Error fetching coach story:', error);
        return new NextResponse('Failed to fetch coach story', {status: 500});
    }
}


export async function PATCH(request: NextRequest, {params}: { params: { TeamId: string } }) {
    const TeamId = parseInt(params.TeamId, 10);
    if (isNaN(TeamId)) {
        return NextResponse.json('Invalid TeamId', {status: 400});
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
            console.error('Invalid image source provided.');
            return NextResponse.json({error: 'Invalid image source provided.'}, {status: 400});
        }

        const imageSource = rawImageSource as 'URL' | 'UPLOAD' | undefined;
        const imageField = imageSource === 'UPLOAD' ? formData.get('imageFile') : formData.get('imageUrl');

        let imageData: Buffer | undefined;
        let imageType: string | undefined;
        let imageUrl: string | undefined;

        // Process image data based on image source
        if (imageSource === 'UPLOAD' && imageField instanceof File) {
            // Validate file size and type
            const MAX_SIZE = 5 * 1024 * 1024; // 5MB
            if (imageField.size > MAX_SIZE) {
                console.error('Image file size exceeds 5MB.');
                return NextResponse.json({error: 'Image file size exceeds 5MB.'}, {status: 400});
            }

            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!allowedTypes.includes(imageField.type)) {
                console.error('Unsupported image format. Allowed formats: JPEG, PNG, GIF.');
                return NextResponse.json({error: 'Unsupported image format. Allowed formats: JPEG, PNG, GIF.'}, {status: 400});
            }

            // Convert image file to buffer
            const arrayBuffer = await imageField.arrayBuffer();
            imageData = Buffer.from(arrayBuffer);
            imageType = imageField.type;

        } else if (imageSource === 'URL' && typeof imageField === 'string' && imageField.trim() !== '') {
            imageUrl = imageField.trim();
        }

        // Retrieve existing player story data
        const existingPlayerStory = await prisma.coachingCareer.findUnique({
            where: {id: TeamId},
            select: {imageUrl: true, imageData: true, imageType: true},
        });

        if (!existingPlayerStory) {
            return NextResponse.json({error: 'coach story not found.'}, {status: 404});
        }

        // Prepare fields object with only provided data
        const fields: Prisma.CoachingCareerUpdateInput = {};

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
        const validatedData = await StoryPatchSchema.validate(fields, {abortEarly: false});

        // Define the update data, retaining existing image data if not updating
        const updateData: Prisma.PlayerCareerUpdateInput = {
            ...validatedData,
            imageUrl: imageUrl || existingPlayerStory.imageUrl,
            imageData: imageData || existingPlayerStory.imageData,
            imageType: imageType || existingPlayerStory.imageType,
        };

        // Conditional image handling to preserve existing data if no new image provided
        if (imageSource === 'UPLOAD') {
            if (imageData && imageType) {
                updateData.imageData = imageData;
                updateData.imageType = imageType;
                updateData.imageUrl = undefined; // Remove URL if uploading a new image
            } else {
                // Preserve existing image data if no new upload
                updateData.imageData = existingPlayerStory.imageData;
            }
        } else if (imageSource === 'URL') {
            if (imageUrl) {
                updateData.imageUrl = imageUrl;
                updateData.imageData = undefined; // Remove binary data if using URL
                updateData.imageType = undefined;
            } else {
                // Preserve existing image URL if no new URL provided
                updateData.imageUrl = existingPlayerStory.imageUrl;
            }
        } else {
            // Retain existing image data if no new image source provided
            if (!fields.imageData && !fields.imageUrl) {
                updateData.imageUrl = existingPlayerStory.imageUrl;
                updateData.imageData = existingPlayerStory.imageData;
                updateData.imageType = existingPlayerStory.imageType;
            }
        }

        // Perform the database update
        const updatedPlayerStory = await prisma.coachingCareer.update({
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
            console.error('Error in PATCH /api/story/coaching-story/[TeamId]:', error);
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }
}

export async function DELETE(request: NextRequest, {params}: { params: { TeamId: string } }) {
    const TeamId = parseInt(params.TeamId, 10);
    if (isNaN(TeamId)) {
        return new NextResponse('Invalid TeamId', {status: 400});
    }

    try {
        await prisma.coachingCareer.delete({
            where: {id: TeamId},
        });
        // Correctly return 204 No Content without a body
        return new NextResponse(null, {status: 204});
    } catch (error: unknown) {
        // Handle specific Prisma errors
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') { // Record not found
                return new NextResponse('coach story not found.', {status: 404});
            }
        }
        console.error('Error deleting coaching story:', error);
        return new NextResponse('Failed to delete coaching story', {status: 500});
    }
}