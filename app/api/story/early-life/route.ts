// app/api/story/early-life/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {earlyLifeSchema, earlyLifeUpdateSchema} from "@/lib/validation/story"; // Adjust the import path based on your project structure


// POST /api/story/early-life
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

        const json = await request.json();

        // Validate the data using the updated schema
        const parseResult = earlyLifeSchema.safeParse(json);
        if (!parseResult.success) {
            const errors = parseResult.error.flatten().fieldErrors;
            return NextResponse.json({ errors }, { status: 400 });
        }

        const data = parseResult.data;

        const newEarlyLife = await prisma.earlyLife.create({
            data: {
                id: 1,
                ...data,
            },
        });

        return NextResponse.json(newEarlyLife, { status: 201 });
    } catch (error) {
        console.error('POST EarlyLife Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


// PATCH /api/story/early-life
export async function PATCH(request: Request) {
    try {
        const json = await request.json();

        // Validate the data using the updated schema
        const parseResult = earlyLifeUpdateSchema.safeParse(json);

        if (!parseResult.success) {
            const errors = parseResult.error.flatten().fieldErrors;
            return NextResponse.json({ errors }, { status: 400 });
        }

        const data = parseResult.data;

        const updatedEarlyLife = await prisma.earlyLife.update({
            where: { id: 1 },
            data,
        });

        return NextResponse.json(updatedEarlyLife, { status: 200 });
    } catch (error) {
        console.error('PATCH EarlyLife Error:', error);

        if (error.code === 'P2025') {
            // Record not found
            return NextResponse.json(
                { message: 'EarlyLife entry not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

