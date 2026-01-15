# Kütüphanem - Kişisel Kitap Kütüphanesi

Modern ve şık bir kişisel kitap kütüphanesi uygulaması. Kitaplarınızı takip edin, okuma hedeflerinizi belirleyin ve okuma istatistiklerinizi görüntüleyin.

## Özellikler

- **Kitap Yönetimi**: Kitaplarınızı ekleyin, düzenleyin ve silin
- **Durum Takibi**: Kitapları "Okunacak", "Okunuyor" ve "Okundu" olarak kategorize edin
- **Puanlama Sistemi**: Okuduğunuz kitaplara 1-5 yıldız arası puan verin
- **Filtreleme**: Yazar ve yayınevine göre kitaplarınızı filtreleyin
- **Grid & Liste Görünümü**: Kitaplarınızı iki farklı görünüm modunda inceleyin
- **Yıllık Okuma Hedefi**: Yıllık kitap okuma hedefinizi belirleyin ve ilerlemenizi takip edin
- **İstatistikler**:
  - Toplam kitap sayısı
  - Okunan, okunuyor ve okunacak kitap sayıları
  - En çok okunan yazarlar
  - Ortalama sayfa sayısı ve puan
  - Yıllık okuma hedefi progress barı

## Teknoloji Stack

- **Frontend**: Next.js 16, React, TypeScript
- **Styling**: Tailwind CSS (koyu kahve + bej + krem renk paleti)
- **Veritabanı**: SQLite + Prisma ORM
- **Font**: Playfair Display (serif) & Inter (sans-serif)

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Veritabanını oluşturun:
```bash
npx prisma migrate dev
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

4. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## Veritabanı

Proje SQLite kullanır ve veritabanı dosyası `prisma/dev.db` konumunda oluşturulur.

### Veritabanı Şeması

- **Book**: Kitap bilgileri (başlık, yazar, yayınevi, sayfa sayısı, kapak resmi, puan, durum, okuma tarihi, notlar)
- **ReadingGoal**: Yıllık okuma hedefleri

## Komutlar

```bash
# Geliştirme sunucusu
npm run dev

# Production build
npm run build

# Production sunucusu
npm start

# Prisma Studio (veritabanı görüntüleyici)
npx prisma studio
```

## Proje Yapısı

```
├── app/
│   ├── api/              # API routes
│   │   ├── books/        # Kitap CRUD işlemleri
│   │   ├── goals/        # Okuma hedefleri
│   │   └── stats/        # İstatistikler
│   ├── istatistikler/    # İstatistikler sayfası
│   ├── layout.tsx        # Ana layout
│   ├── page.tsx          # Ana sayfa
│   └── globals.css       # Global stiller
├── components/
│   ├── BookCard.tsx      # Kitap kartı bileşeni
│   ├── BookForm.tsx      # Kitap ekleme/düzenleme formu
│   └── Navigation.tsx    # Navigasyon menüsü
├── lib/
│   └── prisma.ts         # Prisma client
├── prisma/
│   ├── schema.prisma     # Veritabanı şeması
│   └── migrations/       # Veritabanı migration'ları
└── tailwind.config.ts    # Tailwind konfigürasyonu
```

## Lisans

MIT
