// app/api/story/early-life/image/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const earlyLife = await prisma.earlyLife.findUnique({
            where: { id: 1 },
            select: { imageData: true, imageType: true },
        });

        if (!earlyLife || !earlyLife.imageData || !earlyLife.imageType) {
            return new NextResponse('Image not found', { status: 404 });
        }

        // Create a readable stream from the image data
        const imageBuffer = Buffer.from(earlyLife.imageData);
        const imageStream = new ReadableStream({
            start(controller) {
                controller.enqueue(imageBuffer);
                controller.close();
            },
        });

        return new NextResponse(imageStream, {
            status: 200,
            headers: {
                'Content-Type': earlyLife.imageType,
                'Content-Length': earlyLife.imageData.length.toString(),
                'Cache-Control': 'public, max-age=86400', // Cache for 1 day
            },
        });
    } catch (error) {
        console.error('GET EarlyLife Image Error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
