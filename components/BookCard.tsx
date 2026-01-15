'use client';

import { useState } from 'react';
import Image from 'next/image';

type Book = {
  id: string;
  title: string;
  author: string;
  publisher?: string | null;
  pageCount?: number | null;
  coverImage?: string | null;
  rating?: number | null;
  status: string;
  readDate?: Date | null;
  notes?: string | null;
};

type BookCardProps = {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
  viewMode: 'grid' | 'list';
};

export default function BookCard({
  book,
  onEdit,
  onDelete,
  viewMode,
}: BookCardProps) {
  const [imageError, setImageError] = useState(false);

  const renderStars = (rating: number | null | undefined) => {
    if (!rating) return <span className="text-sm text-gray-400">Puanlanmamış</span>;

    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-lg ${
              star <= rating ? 'text-yellow-500' : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      Okunacak: 'bg-blue-100 text-blue-800',
      Okunuyor: 'bg-green-100 text-green-800',
      Okundu: 'bg-purple-100 text-purple-800',
    };

    return (
      <span
        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
          colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
        }`}
      >
        {status}
      </span>
    );
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-beige-200">
        <div className="flex gap-6">
          <div className="flex-shrink-0 w-24 h-36 bg-beige-100 rounded overflow-hidden">
            {book.coverImage && !imageError ? (
              <Image
                src={book.coverImage}
                alt={book.title}
                width={96}
                height={144}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-coffee-200 to-coffee-300">
                <span className="text-4xl text-coffee-700">📚</span>
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-serif font-semibold text-coffee-900 mb-1">
                  {book.title}
                </h3>
                <p className="text-coffee-700 font-medium">{book.author}</p>
                {book.publisher && (
                  <p className="text-sm text-coffee-600">{book.publisher}</p>
                )}
              </div>
              {getStatusBadge(book.status)}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Sayfa Sayısı</p>
                <p className="font-medium text-coffee-900">
                  {book.pageCount || '-'} sf.
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Puan</p>
                {renderStars(book.rating)}
              </div>
            </div>

            {book.readDate && (
              <p className="text-sm text-gray-600 mb-4">
                Okunma Tarihi:{' '}
                {new Date(book.readDate).toLocaleDateString('tr-TR')}
              </p>
            )}

            {book.notes && (
              <p className="text-sm text-gray-700 mb-4 italic line-clamp-2">
                {book.notes}
              </p>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(book)}
                className="px-4 py-2 bg-coffee-600 text-white rounded-md hover:bg-coffee-700 transition-colors text-sm"
              >
                Düzenle
              </button>
              <button
                onClick={() => {
                  if (confirm('Bu kitabı silmek istediğinizden emin misiniz?')) {
                    onDelete(book.id);
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid görünümü
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-beige-200">
      <div className="relative h-64 bg-beige-100">
        {book.coverImage && !imageError ? (
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-coffee-200 to-coffee-300">
            <span className="text-6xl">📚</span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          {getStatusBadge(book.status)}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-serif font-semibold text-coffee-900 mb-1 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-coffee-700 text-sm font-medium mb-2">{book.author}</p>

        {book.publisher && (
          <p className="text-xs text-coffee-600 mb-2">{book.publisher}</p>
        )}

        <div className="mb-3">{renderStars(book.rating)}</div>

        <div className="text-sm text-gray-600 mb-4">
          {book.pageCount && <span>{book.pageCount} sf.</span>}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(book)}
            className="flex-1 px-3 py-2 bg-coffee-600 text-white rounded-md hover:bg-coffee-700 transition-colors text-sm"
          >
            Düzenle
          </button>
          <button
            onClick={() => {
              if (confirm('Bu kitabı silmek istediğinizden emin misiniz?')) {
                onDelete(book.id);
              }
            }}
            className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
}
