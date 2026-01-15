import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const currentYear = new Date().getFullYear();

    // Bu yıl okunan kitaplar
    const booksReadThisYear = await prisma.book.count({
      where: {
        status: 'Okundu',
        readDate: {
          gte: new Date(`${currentYear}-01-01`),
          lte: new Date(`${currentYear}-12-31`),
        },
      },
    });

    // Tüm kitap sayıları
    const totalBooks = await prisma.book.count();
    const readBooks = await prisma.book.count({
      where: { status: 'Okundu' },
    });
    const readingBooks = await prisma.book.count({
      where: { status: 'Okunuyor' },
    });
    const toReadBooks = await prisma.book.count({
      where: { status: 'Okunacak' },
    });

    // Yıllık hedef
    const goal = await prisma.readingGoal.findUnique({
      where: { year: currentYear },
    });

    // En çok okunan yazarlar
    const authorStats = await prisma.book.groupBy({
      by: ['author'],
      where: { status: 'Okundu' },
      _count: true,
      orderBy: {
        _count: {
          author: 'desc',
        },
      },
      take: 5,
    });

    // Ortalama sayfa sayısı
    const avgPageCount = await prisma.book.aggregate({
      where: {
        status: 'Okundu',
        pageCount: { not: null },
      },
      _avg: {
        pageCount: true,
      },
    });

    // Ortalama puan
    const avgRating = await prisma.book.aggregate({
      where: {
        rating: { not: null },
      },
      _avg: {
        rating: true,
      },
    });

    return NextResponse.json({
      currentYear: {
        year: currentYear,
        booksRead: booksReadThisYear,
        goal: goal?.target || 0,
        progress: goal?.target
          ? Math.round((booksReadThisYear / goal.target) * 100)
          : 0,
      },
      totals: {
        total: totalBooks,
        read: readBooks,
        reading: readingBooks,
        toRead: toReadBooks,
      },
      topAuthors: authorStats.map((stat) => ({
        author: stat.author,
        count: stat._count,
      })),
      averages: {
        pageCount: Math.round(avgPageCount._avg.pageCount || 0),
        rating: avgRating._avg.rating
          ? Math.round(avgRating._avg.rating * 10) / 10
          : 0,
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'İstatistikler yüklenirken hata oluştu' },
      { status: 500 }
    );
  }
}
