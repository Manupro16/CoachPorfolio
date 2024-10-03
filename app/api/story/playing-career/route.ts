import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { playerCareerSchema } from '@/lib/validation/story/playerCareer';


export async function POST(request: Request) {
    try {
        const json = await request.json();

        // Validate the data
        const parseResult = playerCareerSchema.safeParse(json);
        if (!parseResult.success) {
            const errors = parseResult.error.flatten().fieldErrors;
            return NextResponse.json({ errors }, { status: 400 });
        }

        const data = parseResult.data;

        const newPlayerCareer = await prisma.playerCareer.create({
            data,
        });

        return NextResponse.json(newPlayerCareer, { status: 201 });
    } catch (error) {
        console.error('POST PlayerCareer Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}