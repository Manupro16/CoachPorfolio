// app/api/story/coaching-career/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { coachingCareerSchema } from '@/lib/validation/story/coachingCareer';

export async function POST(request: Request) {
    try {
        const json = await request.json();

        // Validate the data
        const parseResult = coachingCareerSchema.safeParse(json);
        if (!parseResult.success) {
            const errors = parseResult.error.flatten().fieldErrors;
            return NextResponse.json({errors}, {status: 400});
        }

        const data = parseResult.data;

        const newCoachingCareer = await prisma.coachingCareer.create({
            data,
        });

        return NextResponse.json(newCoachingCareer, {status: 201});
    } catch (error) {
        console.error('POST CoachingCareer Error:', error);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
    }
}