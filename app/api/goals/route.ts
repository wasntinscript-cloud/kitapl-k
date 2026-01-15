import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Yıllık hedefi getir
export async function GET() {
  try {
    const currentYear = new Date().getFullYear();

    const goal = await prisma.readingGoal.findUnique({
      where: { year: currentYear },
    });

    return NextResponse.json(goal);
  } catch (error) {
    console.error('Error fetching goal:', error);
    return NextResponse.json(
      { error: 'Hedef yüklenirken hata oluştu' },
      { status: 500 }
    );
  }
}

// POST/PUT - Yıllık hedef belirle veya güncelle
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const currentYear = new Date().getFullYear();

    const goal = await prisma.readingGoal.upsert({
      where: { year: currentYear },
      update: { target: parseInt(body.target) },
      create: {
        year: currentYear,
        target: parseInt(body.target),
      },
    });

    return NextResponse.json(goal);
  } catch (error) {
    console.error('Error setting goal:', error);
    return NextResponse.json(
      { error: 'Hedef belirlenirken hata oluştu' },
      { status: 500 }
    );
  }
}
