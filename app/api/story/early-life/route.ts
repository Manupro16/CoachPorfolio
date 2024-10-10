// app/api/story/early-life/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {earlyLifeSchema, earlyLifeUpdateSchema} from "@/lib/validation/story";
import {Prisma} from "@prisma/client"; // Adjust the import path based on your project structure


// Disable Next.js's default body parsing
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
            return NextResponse.json({ message: 'EarlyLife entry not found' }, { status: 404 });
        }

        return NextResponse.json(earlyLife, { status: 200 });
    } catch (error) {
        console.error('GET EarlyLife Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        // Check if the EarlyLife entry already exists
        const existingEntry = await prisma.earlyLife.findUnique({ where: { id: 1 } });
        if (existingEntry) {
            return NextResponse.json(
                { message: 'EarlyLife entry already exists' },
                { status: 400 }
            );
        }

        // Parse form data using request.formData()
        const formData = await request.formData();

        const title = formData.get('title')?.toString() || '';
        const content = formData.get('content')?.toString() || '';
        const imageField = formData.get('image') || null;

        let imageData: Buffer | null = null;
        let imageType: string | null = null;
        let imageUrl: string | null = null;
        let imageDataIndicator = false;

        if (imageField instanceof File) {
            // Handle file upload
            const arrayBuffer = await imageField.arrayBuffer();
            imageData = Buffer.from(arrayBuffer);
            imageType = imageField.type;
            imageDataIndicator = true;
        } else if (typeof imageField === 'string') {
            // Handle image URL
            imageUrl = imageField;
        }

        // Prepare fields for validation
        const fields = {
            title,
            content,
            image: imageUrl,
            imageData: imageDataIndicator ? true : undefined,
        };

        // Validate the data using the updated schema
        const parseResult = earlyLifeSchema.safeParse(fields);

        if (!parseResult.success) {
            const errors = parseResult.error.flatten().fieldErrors;
            return NextResponse.json({ errors }, { status: 400 });
        }

        const data = parseResult.data;

        const prismaData: Prisma.EarlyLifeCreateInput = {
            title: data.title,
            content: data.content,
            image: imageUrl ?? null,
            imageData,
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
    try {
        const formData = await request.formData();

        let title = formData.get('title')?.toString();
        let content = formData.get('content')?.toString();
        const imageField = formData.get('image') || null;

        let imageData: Buffer | null = null;
        let imageType: string | null = null;
        let imageUrl: string | null = null;
        let imageDataIndicator = false;

        if (imageField instanceof File) {
            // Handle file upload
            const arrayBuffer = await imageField.arrayBuffer();
            imageData = Buffer.from(arrayBuffer);
            imageType = imageField.type;
            imageDataIndicator = true;
        } else if (typeof imageField === 'string') {
            // Handle image URL
            imageUrl = imageField;
        }

        // Set title and content to undefined if they are empty strings
        if (title === '') title = undefined;
        if (content === '') content = undefined;

        // Prepare fields for validation
        const fields = {
            title,
            content,
            image: imageUrl ?? undefined, // Convert null to undefined
            imageData: imageDataIndicator ? true : undefined,
        };

        // Validate the data using the updated schema
        const parseResult = earlyLifeUpdateSchema.safeParse(fields);

        if (!parseResult.success) {
            const errors = parseResult.error.flatten().fieldErrors;
            console.error('Validation Errors:', errors);
            return NextResponse.json({ errors }, { status: 400 });
        }

        const data = parseResult.data;

        const updateData: Prisma.EarlyLifeUpdateInput = {
            title: data.title,
            content: data.content,
            image: imageUrl,
            imageData: imageData,
            imageType: imageType,
        };

        const updatedEarlyLife = await prisma.earlyLife.update({
            where: { id: 1 },
            data: updateData,
        });

        return NextResponse.json(updatedEarlyLife, { status: 200 });
    } catch (error) {
        console.error('PATCH EarlyLife Error:', error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                // Record not found
                return NextResponse.json({ message: 'EarlyLife entry not found' }, { status: 404 });
            }
        }

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}





