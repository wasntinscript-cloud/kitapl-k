'use client';

import { useState, useEffect } from 'react';
import BookCard from '@/components/BookCard';
import BookForm from '@/components/BookForm';

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

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | undefined>(undefined);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filtreler
  const [searchTerm, setSearchTerm] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [publisherFilter, setPublisherFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Benzersiz yazar ve yayınevleri
  const [authors, setAuthors] = useState<string[]>([]);
  const [publishers, setPublishers] = useState<string[]>([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [books, searchTerm, authorFilter, publisherFilter, statusFilter]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/books');
      const data = await response.json();
      setBooks(data);

      // Benzersiz yazarlar ve yayınevleri
      const uniqueAuthors = [...new Set(data.map((b: Book) => b.author))];
      const uniquePublishers = [
        ...new Set(
          data.map((b: Book) => b.publisher).filter((p: string | null) => p)
        ),
      ];

      setAuthors(uniqueAuthors as string[]);
      setPublishers(uniquePublishers as string[]);
    } catch (error) {
      console.error('Kitaplar yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = books;

    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (authorFilter) {
      filtered = filtered.filter((book) => book.author === authorFilter);
    }

    if (publisherFilter) {
      filtered = filtered.filter((book) => book.publisher === publisherFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter((book) => book.status === statusFilter);
    }

    setFilteredBooks(filtered);
  };

  const handleAddBook = () => {
    setEditingBook(undefined);
    setShowForm(true);
  };

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleSubmitBook = async (bookData: Partial<Book>) => {
    try {
      if (editingBook) {
        // Güncelleme
        await fetch(`/api/books/${editingBook.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookData),
        });
      } else {
        // Yeni ekleme
        await fetch('/api/books', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookData),
        });
      }

      setShowForm(false);
      setEditingBook(undefined);
      fetchBooks();
    } catch (error) {
      console.error('Kitap kaydedilirken hata:', error);
      alert('Bir hata oluştu!');
    }
  };

  const handleDeleteBook = async (id: string) => {
    try {
      await fetch(`/api/books/${id}`, { method: 'DELETE' });
      fetchBooks();
    } catch (error) {
      console.error('Kitap silinirken hata:', error);
      alert('Bir hata oluştu!');
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setAuthorFilter('');
    setPublisherFilter('');
    setStatusFilter('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-coffee-700">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Başlık ve Ekle Butonu */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-serif font-bold text-coffee-900">
            Kitaplarım
          </h1>
          <p className="text-coffee-600 mt-2">
            Toplam {filteredBooks.length} kitap
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="px-4 py-2 bg-beige-200 text-coffee-800 rounded-md hover:bg-beige-300 transition-colors"
          >
            {viewMode === 'grid' ? '📋 Liste' : '🔲 Grid'}
          </button>
          <button
            onClick={handleAddBook}
            className="px-6 py-2 bg-coffee-700 text-white rounded-md hover:bg-coffee-800 transition-colors font-medium"
          >
            + Yeni Kitap
          </button>
        </div>
      </div>

      {/* Filtreler */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-beige-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-coffee-900 mb-2">
              Ara
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Kitap veya yazar ara..."
              className="w-full px-4 py-2 border border-beige-300 rounded-md focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-coffee-900 mb-2">
              Yazar
            </label>
            <select
              value={authorFilter}
              onChange={(e) => setAuthorFilter(e.target.value)}
              className="w-full px-4 py-2 border border-beige-300 rounded-md focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
            >
              <option value="">Tüm Yazarlar</option>
              {authors.map((author) => (
                <option key={author} value={author}>
                  {author}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-coffee-900 mb-2">
              Yayınevi
            </label>
            <select
              value={publisherFilter}
              onChange={(e) => setPublisherFilter(e.target.value)}
              className="w-full px-4 py-2 border border-beige-300 rounded-md focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
            >
              <option value="">Tüm Yayınevleri</option>
              {publishers.map((publisher) => (
                <option key={publisher} value={publisher}>
                  {publisher}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-coffee-900 mb-2">
              Durum
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-beige-300 rounded-md focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
            >
              <option value="">Tümü</option>
              <option value="Okunacak">Okunacak</option>
              <option value="Okunuyor">Okunuyor</option>
              <option value="Okundu">Okundu</option>
            </select>
          </div>
        </div>

        {(searchTerm || authorFilter || publisherFilter || statusFilter) && (
          <div className="mt-4">
            <button
              onClick={clearFilters}
              className="text-sm text-coffee-600 hover:text-coffee-800 underline"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </div>

      {/* Kitap Listesi */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-medium text-coffee-700 mb-2">
            Henüz kitap eklenmemiş
          </h3>
          <p className="text-coffee-600 mb-6">
            İlk kitabınızı ekleyerek başlayın!
          </p>
          <button
            onClick={handleAddBook}
            className="px-6 py-3 bg-coffee-700 text-white rounded-md hover:bg-coffee-800 transition-colors font-medium"
          >
            + İlk Kitabı Ekle
          </button>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'flex flex-col gap-4'
          }
        >
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={handleEditBook}
              onDelete={handleDeleteBook}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}

      {/* Kitap Formu Modal */}
      {showForm && (
        <BookForm
          book={editingBook}
          onSubmit={handleSubmitBook}
          onCancel={() => {
            setShowForm(false);
            setEditingBook(undefined);
          }}
        />
      )}
    </div>
  );
}
