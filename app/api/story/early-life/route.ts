// app/api/story/early-life/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { storyFieldCreateSchema, storyFieldEditSchema } from "@/lib/validation/story/sroryValidation"
import { Prisma } from "@prisma/client";

// Disable Next.js default body parsing
export const config = {
    api: {
        bodyParser: false,
    },
};

export async function GET() {
    try {
        const earlyLife = await prisma.earlyLife.findUnique({
            where: { id: 1 }
        });

        if (!earlyLife) {
            return new NextResponse(null, { status: 204 });
        }

        return NextResponse.json(earlyLife, { status: 200 });
    } catch (error) {
        console.error('GET EarlyLife Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const existingEntry = await prisma.earlyLife.findUnique({ where: { id: 1 } });
        if (existingEntry) {
            return NextResponse.json(
                { message: 'EarlyLife entry already exists' },
                { status: 400 }
            );
        }

        const formData = await request.formData();
        const title = formData.get('title')?.toString() || '';
        const content = formData.get('content')?.toString() || '';
        const date = formData.get('date')?.toString() || ''; // Capture date from form data
        const imageSource = formData.get('imageSource')?.toString() as 'URL' | 'UPLOAD';
        const imageField = formData.get('image') || null;

        let imageData: Buffer | null = null;
        let imageType: string | null = null;
        let imageUrl: string | null = null;

        if (imageSource === 'UPLOAD' && imageField instanceof File) {
            const arrayBuffer = await imageField.arrayBuffer();
            imageData = Buffer.from(arrayBuffer);
            imageType = imageField.type;
        } else if (imageSource === 'URL' && typeof imageField === 'string') {
            imageUrl = imageField;
        }

        // Validate the data
        const fields = {
            title,
            content,
            date, // Include date in validation
            imageUrl: imageUrl ?? undefined,
            imageFile: imageData ? new File([], "") : null, // Mock empty file for validation
        };

        const parseResult = storyFieldCreateSchema.safeParse(fields);
        if (!parseResult.success) {
            const errors = parseResult.error.flatten().fieldErrors;
            return NextResponse.json({ errors }, { status: 400 });
        }

        const data = parseResult.data;

        // Prepare Prisma data
        const prismaData: Prisma.EarlyLifeCreateInput = {
            title: data.title,
            content: data.content,
            date: date, // Save the date
            imageSource: imageSource ?? 'URL',
            image: imageUrl ?? null,
            imageData: imageData ?? undefined,
            imageType,
        };

        const newEarlyLife = await prisma.earlyLife.create({
            data: prismaData,
        });

        return NextResponse.json(newEarlyLife, { status: 201 });
    } catch (error) {
        console.error('POST EarlyLife Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


export async function PATCH(request: Request) {
    const id = 1; // Static ID since we're dealing with a single entry

    try {
        const formData = await request.formData();
        let title = formData.get('title')?.toString();
        let content = formData.get('content')?.toString();
        let date = formData.get('date')?.toString(); // Capture date from form data
        const imageSource = formData.get('imageSource')?.toString() as 'URL' | 'UPLOAD';
        const imageField = formData.get('image') || null;

        let imageData: Buffer | null = null;
        let imageType: string | null = null;
        let imageUrl: string | null = null;

        if (imageSource === 'UPLOAD' && imageField instanceof File) {
            const arrayBuffer = await imageField.arrayBuffer();
            imageData = Buffer.from(arrayBuffer);
            imageType = imageField.type;
        } else if (imageSource === 'URL' && typeof imageField === 'string') {
            imageUrl = imageField;
        }

        if (title === '') title = undefined;
        if (content === '') content = undefined;
        if (date === '') date = undefined; // Handle empty date as undefined

        const fields = {
            title,
            content,
            date, // Include date in validation
            imageUrl: imageUrl ?? undefined,
            imageFile: imageData ? new File([], "") : null, // Mock empty file for validation
        };

        const parseResult = storyFieldEditSchema.safeParse(fields);
        if (!parseResult.success) {
            const errors = parseResult.error.flatten().fieldErrors;
            console.error('Validation Errors:', errors);
            return NextResponse.json({ errors }, { status: 400 });
        }

        const data = parseResult.data;

        const updateData: Prisma.EarlyLifeUpdateInput = {
            title: data.title ?? undefined,
            content: data.content ?? undefined,
            date: date ?? undefined, // Save the updated date
            imageSource: imageSource ?? undefined,
            image: imageUrl ?? undefined,
            imageData: imageData ?? undefined,
            imageType: imageType ?? undefined,
        };

        const updatedEarlyLife = await prisma.earlyLife.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json(updatedEarlyLife, { status: 200 });
    } catch (error) {
        console.error('PATCH EarlyLife Error:', error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return NextResponse.json({ message: 'EarlyLife entry not found' }, { status: 404 });
            }
        }

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


