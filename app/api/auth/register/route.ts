// app/api/auth/register/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    // Parse the multipart form data
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const image = formData.get('image') as File;

    if (!name || !email || !password || !image) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate image type and size
    const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
    const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

    if (!ALLOWED_IMAGE_TYPES.includes(image.type)) {
      return NextResponse.json(
        { error: 'Invalid image type. Only JPEG, PNG, and GIF are allowed.' },
        { status: 400 }
      );
    }

    if (image.size > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { error: 'Image size exceeds the maximum limit of 5MB.' },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Read the image data
    const arrayBuffer = await image.arrayBuffer();
    const imageData = Buffer.from(arrayBuffer);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        imageData,
        imageType: image.type,
        role: 'USER',
      },
    });

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
