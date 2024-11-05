// app/api/story/player-story/[TeamId]/image/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { TeamId: string } }) {
  const TeamId = parseInt(params.TeamId, 10);
  if (isNaN(TeamId)) {
    return new NextResponse('Invalid TeamId', { status: 400 });
  }

  try {
    const playerStory = await prisma.playerCareer.findUnique({
      where: { id: TeamId },
      select: { imageData: true, imageType: true },
    });

    if (!playerStory || !playerStory.imageData || !playerStory.imageType) {
      return new NextResponse('Image not found', { status: 404 });
    }

    return new NextResponse(playerStory.imageData, {
      status: 200,
      headers: {
        'Content-Type': playerStory.imageType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return new NextResponse('Failed to fetch image', { status: 500 });
  }
}


  // const EditEndpoint  = `/story/edit/PlayerStory/${team.id}`;