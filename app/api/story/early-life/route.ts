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

        if (!id || !updatedContent || !updatedImage) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const updatedEarlyLife = await prisma.earlyLife.update({
            where: { id },
            data: { content: updatedContent, image: updatedImage },
        });

        return NextResponse.json(updatedEarlyLife);
    } catch (error) {
        console.error('PUT /api/story/early-life Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { deleteId } = await request.json();

        if (!deleteId) {
            return NextResponse.json({ message: 'Missing deleteId' }, { status: 400 });
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
