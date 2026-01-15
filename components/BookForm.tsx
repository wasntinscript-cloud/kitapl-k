'use client';

import { useState, useEffect } from 'react';

type Book = {
  id?: string;
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

type BookFormProps = {
  book?: Book;
  onSubmit: (book: Partial<Book>) => void;
  onCancel: () => void;
};

export default function BookForm({ book, onSubmit, onCancel }: BookFormProps) {
  const [formData, setFormData] = useState<Partial<Book>>({
    title: '',
    author: '',
    publisher: '',
    pageCount: null,
    coverImage: '',
    rating: null,
    status: 'Okunacak',
    readDate: null,
    notes: '',
  });

  useEffect(() => {
    if (book) {
      setFormData({
        ...book,
        readDate: book.readDate ? new Date(book.readDate) : null,
      });
    }
  }, [book]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === '' ? null : value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-2xl w-full my-8 shadow-2xl">
        <div className="bg-coffee-800 text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-2xl font-serif font-bold">
            {book ? 'Kitap Düzenle' : 'Yeni Kitap Ekle'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-coffee-900 mb-2">
                Kitap Adı *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title || ''}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-beige-300 rounded-md focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                placeholder="Kitap adını girin"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-900 mb-2">
                Yazar *
              </label>
              <input
                type="text"
                name="author"
                value={formData.author || ''}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-beige-300 rounded-md focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                placeholder="Yazar adı"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-900 mb-2">
                Yayınevi
              </label>
              <input
                type="text"
                name="publisher"
                value={formData.publisher || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-beige-300 rounded-md focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                placeholder="Yayınevi"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-900 mb-2">
                Sayfa Sayısı
              </label>
              <input
                type="number"
                name="pageCount"
                value={formData.pageCount || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-beige-300 rounded-md focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                placeholder="Sayfa sayısı"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-900 mb-2">
                Durum
              </label>
              <select
                name="status"
                value={formData.status || 'Okunacak'}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-beige-300 rounded-md focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
              >
                <option value="Okunacak">Okunacak</option>
                <option value="Okunuyor">Okunuyor</option>
                <option value="Okundu">Okundu</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-900 mb-2">
                Puan (1-5)
              </label>
              <select
                name="rating"
                value={formData.rating || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-beige-300 rounded-md focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
              >
                <option value="">Puanlanmamış</option>
                <option value="1">⭐ 1</option>
                <option value="2">⭐⭐ 2</option>
                <option value="3">⭐⭐⭐ 3</option>
                <option value="4">⭐⭐⭐⭐ 4</option>
                <option value="5">⭐⭐⭐⭐⭐ 5</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-900 mb-2">
                Okunma Tarihi
              </label>
              <input
                type="date"
                name="readDate"
                value={
                  formData.readDate
                    ? new Date(formData.readDate).toISOString().split('T')[0]
                    : ''
                }
                onChange={handleChange}
                className="w-full px-4 py-2 border border-beige-300 rounded-md focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-coffee-900 mb-2">
                Kapak Resmi URL
              </label>
              <input
                type="url"
                name="coverImage"
                value={formData.coverImage || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-beige-300 rounded-md focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                placeholder="https://..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-coffee-900 mb-2">
                Notlar
              </label>
              <textarea
                name="notes"
                value={formData.notes || ''}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-beige-300 rounded-md focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                placeholder="Kitap hakkında notlarınız..."
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-coffee-700 text-white rounded-md hover:bg-coffee-800 transition-colors font-medium"
            >
              {book ? 'Güncelle' : 'Ekle'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors font-medium"
            >
              İptal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
