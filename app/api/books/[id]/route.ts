import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type RouteContext = {
  params: Promise<{ id: string }>;
};

// GET - Tek kitap getir
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const book = await prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      return NextResponse.json(
        { error: 'Kitap bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    return NextResponse.json(
      { error: 'Kitap yüklenirken hata oluştu' },
      { status: 500 }
    );
  }
}

// PUT - Kitap güncelle
export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const book = await prisma.book.update({
      where: { id },
      data: {
        title: body.title,
        author: body.author,
        publisher: body.publisher,
        pageCount: body.pageCount ? parseInt(body.pageCount) : null,
        coverImage: body.coverImage,
        rating: body.rating ? parseInt(body.rating) : null,
        status: body.status,
        readDate: body.readDate ? new Date(body.readDate) : null,
        notes: body.notes,
      },
    });

    return NextResponse.json(book);
  } catch (error) {
    console.error('Error updating book:', error);
    return NextResponse.json(
      { error: 'Kitap güncellenirken hata oluştu' },
      { status: 500 }
    );
  }
}

// DELETE - Kitap sil
export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    await prisma.book.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Kitap silindi' });
  } catch (error) {
    console.error('Error deleting book:', error);
    return NextResponse.json(
      { error: 'Kitap silinirken hata oluştu' },
      { status: 500 }
    );
  }
}
