// app/api/story/early-life/route.ts

import {NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';
import {serverStorySchema} from '@/app/api/story/early-life/serverStorySchema';
import {Prisma} from "@prisma/client";
import * as yup from 'yup';

// Disable Next.js default body parsing
export const config = {
    api: {
        bodyParser: false,
    },
};

export async function GET() {
    try {
        const earlyLife = await prisma.earlyLife.findUnique({
            where: {id: 1}
        });

        if (!earlyLife) {
            return new NextResponse(null, {status: 204});
        }

        return NextResponse.json(earlyLife, {status: 200});
    } catch (error) {
        console.error('GET EarlyLife Error:', error);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
    }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title')?.toString() || '';
    const content = formData.get('content')?.toString() || '';
    const date = formData.get('date')?.toString() || '';
    const imageSource = formData.get('imageSource')?.toString() as 'URL' | 'UPLOAD';

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
      const data = await serverStorySchema.validate(fields, { abortEarly: false });

      // Prepare data for Prisma
      const prismaData: Prisma.EarlyLifeCreateInput = {
        id: 1, // Assuming a single entry with static ID; adjust as needed
        title: data.title,
        content: data.content,
        date: data.date || '',
        imageSource: data.imageSource,
        imageUrl: data.imageSource === 'URL' ? data.imageUrl : null,
        imageData: data.imageSource === 'UPLOAD' ? data.imageData : null,
        imageType: data.imageSource === 'UPLOAD' ? data.imageType : null,
      };

      // Save to database
      const newEarlyLife = await prisma.earlyLife.create({
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


export async function PATCH(request: Request) {
  const id = 1; // Static ID since we're dealing with a single entry; adjust as needed

  try {
    const formData = await request.formData();
    const title = formData.get('title')?.toString() || '';
    const content = formData.get('content')?.toString() || '';
    const date = formData.get('date')?.toString() || '';
    const imageSource = formData.get('imageSource')?.toString() as 'URL' | 'UPLOAD';

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
      const data = await serverStorySchema.validate(fields, { abortEarly: false });

      // Prepare data for Prisma
      const updateData: Prisma.EarlyLifeUpdateInput = {
        title: data.title || undefined,
        content: data.content || undefined,
        date: data.date || undefined,
        imageSource: data.imageSource,
        imageUrl: data.imageSource === 'URL' ? data.imageUrl : null,
        imageData: data.imageSource === 'UPLOAD' ? data.imageData : null,
        imageType: data.imageSource === 'UPLOAD' ? data.imageType : null,
      };

      // Update database
      const updatedEarlyLife = await prisma.earlyLife.update({
        where: { id },
        data: updateData,
      });

      return NextResponse.json(updatedEarlyLife, { status: 200 });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        // Extract validation errors
        const errors = error.inner.reduce((acc: Record<string, string>, err) => {
          if (err.path) {
            acc[err.path] = err.message;
          }
          return acc;
        }, {});
        console.error('Validation Errors:', errors);
        return NextResponse.json({ errors }, { status: 400 });
      } else {
        console.error('PATCH EarlyLife Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
    }
  } catch (error) {
    console.error('PATCH EarlyLife Error:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json({ message: 'EarlyLife entry not found' }, { status: 404 });
      }
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}



