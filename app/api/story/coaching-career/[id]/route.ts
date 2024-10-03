// app/api/story/coaching-career/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { coachingCareerUpdateSchema } from '@/lib/validation/story/coachingCareer';
import { Prisma } from '@prisma/client';


export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const coachingCareer = await prisma.coachingCareer.findUnique({
            where: { id: Number(id) },
        });

        if (!coachingCareer) {
            return NextResponse.json({ message: 'CoachingCareer not found' }, { status: 404 });
        }

        return NextResponse.json(coachingCareer, { status: 200 });
    } catch (error) {
        console.error('GET CoachingCareer Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const json = await request.json();

        // Validate the data
        const parseResult = coachingCareerUpdateSchema.safeParse(json);
        if (!parseResult.success) {
            const errors = parseResult.error.flatten().fieldErrors;
            return NextResponse.json({ errors }, { status: 400 });
        }

        const data = parseResult.data;

        const updatedCoachingCareer = await prisma.coachingCareer.update({
            where: { id: Number(id) },
            data,
        });

        return NextResponse.json(updatedCoachingCareer, { status: 200 });
    } catch (error) {
        console.error('PATCH CoachingCareer Error:', error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                // Record not found
                return NextResponse.json(
                    { message: 'CoachingCareer not found' },
                    { status: 404 }
                );
            }
        }

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        await prisma.coachingCareer.delete({
            where: { id: Number(id) },
        });

        return NextResponse.json({ message: 'CoachingCareer deleted' }, { status: 200 });
    } catch (error) {
        console.error('DELETE CoachingCareer Error:', error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                // Record not found
                return NextResponse.json(
                    { message: 'CoachingCareer not found' },
                    { status: 404 }
                );
            }
        }

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}