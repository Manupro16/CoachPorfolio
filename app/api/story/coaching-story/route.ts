import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';
import {serverStoryPostSchema} from '../validation/serverStoryPostSchema';
import * as yup from 'yup';
import {Prisma} from "@prisma/client";


export async function GET() {

    try {
        const coachingStories = await prisma.coachingCareer.findMany({
            orderBy: {id: 'asc'},
        })

        if (!coachingStories) {
            return new NextResponse(null, {status: 204});
        }

        return NextResponse.json(coachingStories, {status: 200});

    } catch (error) {
        console.error('Error fetching coaching stories:', error);
        return new NextResponse('Failed to fetch coaching stories', {status: 500});
    }
}

export async function POST(request: NextRequest) {

    try {

        const formData = await request.formData();
        const title = formData.get('title')?.toString() || '';
        const date = formData.get('date')?.toString() || '';
        const imageSource = formData.get('imageSource')?.toString() as 'URL' | 'UPLOAD';
        const content = formData.get('content')?.toString() || '';


        // Correct the field name for the image
        const imageField = imageSource === 'UPLOAD' ? formData.get('imageFile') : formData.get('imageUrl');

        let imageData: Buffer | undefined;
        let imageType: string | undefined;
        let imageUrl: string | undefined;


        if (imageSource === 'UPLOAD' && imageField instanceof File) {
            const arrayBuffer = await imageField.arrayBuffer();
            imageData = Buffer.from(arrayBuffer);
            imageType = imageField.type;
        } else if (imageSource === 'URL' && typeof imageField === 'string') {
            imageUrl = imageField;
        } else {
            return new NextResponse('Invalid image source', {status: 400});
        }

        const fields = {
            title,
            content,
            date,
            imageSource,
            imageUrl: imageUrl || undefined,
            imageData: imageData || undefined,
            imageType: imageType || undefined,
        };

        try {
            const data = await serverStoryPostSchema.validate(fields, {abortEarly: false});


            // Prepare data for Prisma
            const prismaData: Prisma.CoachingCareerCreateInput = {
                title: data.title,
                content: data.content,
                date: data.date || '',
                imageSource: data.imageSource,
                imageUrl: data.imageSource === 'URL' ? data.imageUrl : null,
                imageData: data.imageSource === 'UPLOAD' ? data.imageData : null,
                imageType: data.imageSource === 'UPLOAD' ? data.imageType : null,
            };

            // Save to database
            const newEarlyLife = await prisma.coachingCareer.create({
                data: prismaData,
            });

            return NextResponse.json(newEarlyLife, { status: 201 });

        } catch (error) {
            if (error instanceof yup.ValidationError) {
                // Extract validation errors
                const errors = error.inner.reduce((acc: Record<string, string>, err) => {
                    if (err.path) {
                        acc[err.path] = err.message;
                    }
                    return acc;
                }, {});

                return new NextResponse(JSON.stringify({errors}), {status: 400});
            }

            console.error('Error creating coaching story:', error);
            return new NextResponse('Failed to create coaching story', {status: 500});
        }


    } catch (error) {
        console.error('Error handling POST request:', error);
        return new NextResponse('Failed to handle POST request', {status: 500});
    }
}