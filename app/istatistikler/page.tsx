'use client';

import { useState, useEffect } from 'react';

type Stats = {
  currentYear: {
    year: number;
    booksRead: number;
    goal: number;
    progress: number;
  };
  totals: {
    total: number;
    read: number;
    reading: number;
    toRead: number;
  };
  topAuthors: {
    author: string;
    count: number;
  }[];
  averages: {
    pageCount: number;
    rating: number;
  };
};

export default function StatisticsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [goalInput, setGoalInput] = useState('');
  const [showGoalForm, setShowGoalForm] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/stats');
      const data = await response.json();
      setStats(data);
      setGoalInput(data.currentYear.goal.toString());
    } catch (error) {
      console.error('İstatistikler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSetGoal = async () => {
    try {
      await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target: parseInt(goalInput) }),
      });
      setShowGoalForm(false);
      fetchStats();
    } catch (error) {
      console.error('Hedef belirlenirken hata:', error);
      alert('Bir hata oluştu!');
    }
  };

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-coffee-700">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-serif font-bold text-coffee-900 mb-8">
        İstatistikler
      </h1>

      {/* Yıllık Hedef ve Progress */}
      <div className="bg-gradient-to-br from-coffee-700 to-coffee-900 rounded-lg shadow-xl p-8 mb-8 text-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-2">
              {stats.currentYear.year} Yılı
            </h2>
            <p className="text-cream-200">Okuma Hedefi</p>
          </div>
          <button
            onClick={() => setShowGoalForm(!showGoalForm)}
            className="px-4 py-2 bg-cream-200 text-coffee-900 rounded-md hover:bg-cream-300 transition-colors font-medium"
          >
            Hedef Belirle
          </button>
        </div>

        {showGoalForm && (
          <div className="mb-6 p-4 bg-coffee-800 rounded-md">
            <label className="block text-sm font-medium mb-2">
              Yıllık kitap okuma hedefiniz:
            </label>
            <div className="flex gap-3">
              <input
                type="number"
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
                className="flex-1 px-4 py-2 rounded-md text-coffee-900"
                placeholder="Hedef kitap sayısı"
              />
              <button
                onClick={handleSetGoal}
                className="px-6 py-2 bg-cream-200 text-coffee-900 rounded-md hover:bg-cream-300 transition-colors font-medium"
              >
                Kaydet
              </button>
            </div>
          </div>
        )}

        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-2xl font-bold">
              {stats.currentYear.booksRead} / {stats.currentYear.goal} kitap
            </span>
            <span className="text-2xl font-bold">
              %{stats.currentYear.progress}
            </span>
          </div>
          <div className="w-full bg-coffee-950 rounded-full h-6 overflow-hidden">
            <div
              className="bg-gradient-to-r from-cream-300 to-cream-400 h-full rounded-full transition-all duration-500 flex items-center justify-end pr-3"
              style={{ width: `${Math.min(stats.currentYear.progress, 100)}%` }}
            >
              {stats.currentYear.progress > 10 && (
                <span className="text-xs font-bold text-coffee-900">
                  {stats.currentYear.progress}%
                </span>
              )}
            </div>
          </div>
        </div>

        <p className="text-cream-200 text-sm">
          {stats.currentYear.goal - stats.currentYear.booksRead > 0
            ? `Hedefinize ulaşmak için ${
                stats.currentYear.goal - stats.currentYear.booksRead
              } kitap daha okumalısınız!`
            : 'Tebrikler! Yıllık hedefinize ulaştınız! 🎉'}
        </p>
      </div>

      {/* Genel İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border border-beige-200">
          <div className="text-4xl mb-2">📚</div>
          <h3 className="text-lg font-medium text-coffee-700 mb-1">
            Toplam Kitap
          </h3>
          <p className="text-3xl font-bold text-coffee-900">
            {stats.totals.total}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-beige-200">
          <div className="text-4xl mb-2">✅</div>
          <h3 className="text-lg font-medium text-coffee-700 mb-1">Okundu</h3>
          <p className="text-3xl font-bold text-coffee-900">
            {stats.totals.read}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-beige-200">
          <div className="text-4xl mb-2">📖</div>
          <h3 className="text-lg font-medium text-coffee-700 mb-1">Okunuyor</h3>
          <p className="text-3xl font-bold text-coffee-900">
            {stats.totals.reading}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-beige-200">
          <div className="text-4xl mb-2">⏳</div>
          <h3 className="text-lg font-medium text-coffee-700 mb-1">
            Okunacak
          </h3>
          <p className="text-3xl font-bold text-coffee-900">
            {stats.totals.toRead}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* En Çok Okunan Yazarlar */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-beige-200">
          <h3 className="text-2xl font-serif font-bold text-coffee-900 mb-6">
            En Çok Okunan Yazarlar
          </h3>

          {stats.topAuthors.length === 0 ? (
            <p className="text-coffee-600 text-center py-8">
              Henüz okunmuş kitap yok
            </p>
          ) : (
            <div className="space-y-4">
              {stats.topAuthors.map((author, index) => (
                <div key={author.author} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-coffee-700 text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-coffee-900">
                      {author.author}
                    </p>
                  </div>
                  <div className="text-coffee-700 font-bold">
                    {author.count} kitap
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Ortalamalar */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-beige-200">
          <h3 className="text-2xl font-serif font-bold text-coffee-900 mb-6">
            Ortalamalar
          </h3>

          <div className="space-y-6">
            <div>
              <p className="text-coffee-600 mb-2">Ortalama Sayfa Sayısı</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-coffee-900">
                  {stats.averages.pageCount}
                </span>
                <span className="text-coffee-600">sayfa</span>
              </div>
            </div>

            <div>
              <p className="text-coffee-600 mb-2">Ortalama Puan</p>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-coffee-900">
                  {stats.averages.rating > 0
                    ? stats.averages.rating.toFixed(1)
                    : '-'}
                </span>
                {stats.averages.rating > 0 && (
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-2xl ${
                          star <= Math.round(stats.averages.rating)
                            ? 'text-yellow-500'
                            : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-beige-200">
              <p className="text-coffee-600 mb-2">Okuma Oranı</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-coffee-900">
                  {stats.totals.total > 0
                    ? Math.round((stats.totals.read / stats.totals.total) * 100)
                    : 0}
                  %
                </span>
                <span className="text-coffee-600">tamamlandı</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
