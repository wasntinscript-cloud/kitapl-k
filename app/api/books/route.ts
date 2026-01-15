import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Tüm kitapları getir (filtreleme ile)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const author = searchParams.get('author');
    const publisher = searchParams.get('publisher');
    const status = searchParams.get('status');

    const where: any = {};

    if (author) where.author = { contains: author };
    if (publisher) where.publisher = { contains: publisher };
    if (status) where.status = status;

    const books = await prisma.book.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json(
      { error: 'Kitaplar yüklenirken hata oluştu' },
      { status: 500 }
    );
  }
}

// POST - Yeni kitap ekle
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const book = await prisma.book.create({
      data: {
        title: body.title,
        author: body.author,
        publisher: body.publisher,
        pageCount: body.pageCount ? parseInt(body.pageCount) : null,
        coverImage: body.coverImage,
        rating: body.rating ? parseInt(body.rating) : null,
        status: body.status || 'Okunacak',
        readDate: body.readDate ? new Date(body.readDate) : null,
        notes: body.notes,
      },
    });

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.error('Error creating book:', error);
    return NextResponse.json(
      { error: 'Kitap eklenirken hata oluştu' },
      { status: 500 }
    );
  }
}
