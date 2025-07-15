import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';
import { getUsers } from '@/app/lib/utils/apiUtility/getUsers';

// GET ALL USERS
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        userId: true,
        userName: true,
        highScore: true,
        questionsCorrect: true,
        createdAt: true,
      },
      orderBy: {
        highScore: 'desc',
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST A USER
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      email,
      userName,
      avatar,
      highScore,
      quizzBuckTotal,
      questionsCorrect,
    } = body;

    const newUser = await prisma.user.create({
      data: {
        email,
        userName,
        avatar,
        highScore,
        quizzBuckTotal,
        questionsCorrect,
      },
    });

    return NextResponse.json(
      { message: 'User Created', user: newUser },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ error: err, status: 400 });
  }
}

//UPDATE QUIZZBUCKS ON USER ID

export async function PUT(request: Request) {
  try {
    const { id, data } = await request.json();
    console.log(id, data, 'what are we getting in update request');
    //update their quizzbucks
    const updateUser = await prisma.user.update({
      where: {
        userId: id,
      },
      data: {
        quizzBuckTotal: data,
      },
    });
    return NextResponse.json(
      { message: 'User Updated', user: updateUser },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: err, status: 400 });
  }
}
