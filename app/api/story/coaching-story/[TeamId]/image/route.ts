

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { TeamId: string } }) {
  const TeamId = parseInt(params.TeamId, 10);
  if (isNaN(TeamId)) {
    return new NextResponse('Invalid TeamId', { status: 400 });
  }

  try {
    const coachingStory = await prisma.coachingCareer.findUnique({
      where: { id: TeamId },
      select: { imageData: true, imageType: true },
    });

    if (!coachingStory || !coachingStory.imageData || !coachingStory.imageType) {
      return new NextResponse('Image not found', { status: 404 });
    }

    return new NextResponse(coachingStory.imageData, {
      status: 200,
      headers: {
        'Content-Type': coachingStory.imageType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return new NextResponse('Failed to fetch image', { status: 500 });
  }
}
