import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { score, userId } = body;

    if (!score || !userId) {
      return NextResponse.json(
        { error: 'Score and userId are required' },
        { status: 400 }
      );
    }

    const game = await prisma.game.create({
      data: {
        score: parseInt(score),
        userId: userId,
      },
    });

    // Update user's high score if this score is higher
    const user = await prisma.user.findUnique({
      where: { userId: userId },
    });

    if (user && score > user.highScore) {
      await prisma.user.update({
        where: { userId: userId },
        data: { 
          highScore: parseInt(score),
          questionsCorrect: user.questionsCorrect + parseInt(score)
        },
      });
    }

    return NextResponse.json({ success: true, game });
  } catch (error) {
    console.error('Error saving game:', error);
    return NextResponse.json(
      { error: 'Failed to save game' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const games = await prisma.game.findMany({
      include: {
        user: {
          select: {
            userName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    return NextResponse.json(
      { error: 'Failed to fetch games' },
      { status: 500 }
    );
  }
}
