// app/api/story/early-life/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const earlyLife = await prisma.earlyLife.findFirst();
        if (!earlyLife) {
            return NextResponse.json({ message: 'Early Life not found' }, { status: 404 });
        }
        return NextResponse.json(earlyLife);
    } catch (error) {
        console.error('GET /api/story/early-life Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const { id, updatedContent, updatedImage } = await request.json();

        // Check if 'id' is provided
        if (!id) {
            return NextResponse.json({ message: 'Missing required field: id' }, { status: 400 });
        }

        // Check if at least one of 'updatedContent' or 'updatedImage' is provided
        if (!updatedContent && !updatedImage) {
            return NextResponse.json(
                { message: 'At least one of updatedContent or updatedImage must be provided' },
                { status: 400 }
            );
        }

        // Construct the 'data' object dynamically based on provided fields
        const dataToUpdate: { content?: string; image?: string } = {};
        if (updatedContent) dataToUpdate.content = updatedContent;
        if (updatedImage) dataToUpdate.image = updatedImage;

        // Perform the update operation
        const updatedEarlyLife = await prisma.earlyLife.update({
            where: { id },
            data: dataToUpdate,
        });

        return NextResponse.json(updatedEarlyLife, { status: 200 });
    } catch (error: any) {
        // Handle specific Prisma errors (e.g., record not found)
        if (error.code === 'P2025') { // Prisma error code for "Record to update not found."
            return NextResponse.json(
                { message: `Early Life with id ${error.meta?.cause} not found` },
                { status: 404 }
            );
        }

        console.error('PUT /api/story/early-life Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { deleteId } = await request.json();

        if (!deleteId || typeof deleteId !== 'number') {
            return NextResponse.json({ message: 'Missing or invalid deleteId' }, { status: 400 });
        }

        await prisma.earlyLife.delete({
            where: { id: deleteId },
        });

        return NextResponse.json({ message: 'Early Life deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('DELETE /api/story/early-life Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}