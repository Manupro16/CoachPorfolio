import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(request: NextRequest, {params}: { params: { TeamId: string } }) {
    const TeamId = parseInt(params.TeamId, 10);
    if (isNaN(TeamId)) {
        return new NextResponse('Invalid TeamId', {status: 400});
    }

    try {
        const coachingStory = await prisma.coachingCareer.findUnique({
            where: {id: TeamId},
        });

        if (!coachingStory) {
            return new NextResponse('Player story not found', {status: 404});
        }

        return NextResponse.json(coachingStory);
    } catch (error) {
        console.error('Error fetching player story:', error);
        return new NextResponse('Failed to fetch player story', {status: 500});
    }
}