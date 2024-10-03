// app/api/story/playing-career/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { playerCareerUpdateSchema } from '@/lib/validation/story/playerCareer';
import { Prisma } from '@prisma/client';



export async function GET(request: Request, { params }: { params: { id: string } }  ) {

    try {
        const { id } = params;
        const playerCareer = await prisma.playerCareer.findUnique({
            where: { id: Number(id) },
        });

        if (!playerCareer) {
            return NextResponse.json({ message: 'PlayerCareer not found' }, { status: 404 });
        }

        return NextResponse.json(playerCareer, { status: 200 });

    } catch (error) {
        console.error('GET PlayerCareer Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const json = await request.json();

        // Validate the data
        const parseResult = playerCareerUpdateSchema.safeParse(json);
        if (!parseResult.success) {
            const errors = parseResult.error.flatten().fieldErrors;
            return NextResponse.json({ errors }, { status: 400 });
        }

        const data = parseResult.data;

        const updatedPlayerCareer = await prisma.playerCareer.update({
            where: { id: Number(id) },
            data,
        });

        return NextResponse.json(updatedPlayerCareer, { status: 200 });
    } catch (error) {
        console.error('PATCH PlayerCareer Error:', error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                // Record not found
                return NextResponse.json({ message: 'PlayerCareer not found' }, { status: 404 });
            }
        }

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        await prisma.playerCareer.delete({
            where: { id: Number(id) },
        });

        return NextResponse.json({ message: 'PlayerCareer deleted' }, { status: 200 });
    } catch (error) {
        console.error('DELETE PlayerCareer Error:', error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                // Record not found
                return NextResponse.json({ message: 'PlayerCareer not found' }, { status: 404 });
            }
        }

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}