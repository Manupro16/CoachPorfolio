// app/api/story/player-story/route.ts

import { NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';
import {serverStoryPostSchema} from '../validation/serverStoryPostSchema';
import * as yup from 'yup';
import {Prisma} from "@prisma/client";

export async function GET() {
    try {
        const playerStories = await prisma.playerCareer.findMany({
            orderBy: {id: 'asc'},
        });

        if (playerStories.length === 0) {
            return new NextResponse(null, {status: 204});
        }

        return NextResponse.json(playerStories);
    } catch (error) {
        console.error('Error fetching player stories:', error);
        return new NextResponse('Failed to fetch player stories', {status: 500});
    }
}



export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title')?.toString() || '';
    const date = formData.get('date')?.toString() || '';
    const imageSource = formData.get('imageSource')?.toString() as 'URL' | 'UPLOAD';
    const content = formData.get('content')?.toString() || '';

    // Correct the field name for the image
    const imageField = imageSource === 'UPLOAD' ? formData.get('imageFile') : formData.get('imageUrl');

    let imageData: Buffer | undefined;
    let imageType: string | undefined;
    let imageUrl: string | undefined;

    if (imageSource === 'UPLOAD' && imageField instanceof File) {
      const arrayBuffer = await imageField.arrayBuffer();
      imageData = Buffer.from(arrayBuffer);
      imageType = imageField.type;
    } else if (imageSource === 'URL' && typeof imageField === 'string') {
      imageUrl = imageField;
    } else {
      return NextResponse.json({ error: 'Invalid image data provided.' }, { status: 400 });
    }

    const fields = {
      title,
      content,
      date,
      imageSource,
      imageUrl: imageUrl || undefined,
      imageData: imageData || undefined,
      imageType: imageType || undefined,
    };

    // Validation using Yup schema
    try {
      const data = await serverStoryPostSchema.validate(fields, { abortEarly: false });

      // Prepare data for Prisma
      const prismaData: Prisma.PlayerCareerCreateInput = {
        title: data.title,
        content: data.content,
        date: data.date || '',
        imageSource: data.imageSource,
        imageUrl: data.imageSource === 'URL' ? data.imageUrl : null,
        imageData: data.imageSource === 'UPLOAD' ? data.imageData : null,
        imageType: data.imageSource === 'UPLOAD' ? data.imageType : null,
      };

      // Save to database
      const newEarlyLife = await prisma.playerCareer.create({
        data: prismaData,
      });

      return NextResponse.json(newEarlyLife, { status: 201 });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        // Extract validation errors
        const errors = error.inner.reduce((acc: Record<string, string>, err) => {
          if (err.path) {
            acc[err.path] = err.message;
          }
          return acc;
        }, {});
        console.error('Validation failed:', errors);
        return NextResponse.json({ errors }, { status: 400 });
      } else {
        console.error('Error in POST /api/story/early-life:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
    }
  } catch (error) {
    console.error('Error in POST /api/story/early-life:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


