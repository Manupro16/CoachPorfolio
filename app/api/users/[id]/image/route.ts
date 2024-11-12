// app/api/users/[id]/image/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    select: {
      imageData: true,
      imageType: true,
    },
  });

  if (!user || !user.imageData || !user.imageType) {
    return new NextResponse('Image not found', { status: 404 });
  }

  return new NextResponse(user.imageData, {
    status: 200,
    headers: {
      'Content-Type': user.imageType,
    },
  });
}
