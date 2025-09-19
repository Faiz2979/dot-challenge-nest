# 🚀 NestJS Backend Challenge (TypeScript + Prisma + JWT)

## 📌 Deskripsi
Project ini adalah implementasi simple **REST API** menggunakan **NestJS (TypeScript)** dengan database **MySQL via Prisma ORM**.  
API ini memiliki fitur **User Authentication** (Register & Login menggunakan JWT) dan **CRUD Post** yang saling berelasi dengan User.  

Project ini dibuat untuk memenuhi challenge backend dengan kriteria yang sudah ditentukan.

---

## ⚡ Fitur Utama
1. **User Authentication**  
   - Register  
   - Login (JWT Token)  

2. **Post Management (CRUD)**  
   - Create Post (hanya user yang login)  
   - Read Post (all posts / by user)  
   - Update Post (hanya pemilik post)  
   - Delete Post (hanya pemilik post)  

3. **Relasi User ↔ Post**  
   - 1 User dapat memiliki banyak Post.  

4. **Security**  
   - JWT Authentication & Authorization.  

5. **Testing**  
   - E2E Testing menggunakan [Apidog Testing](https://apidog.com/) untuk validasi token & API flow.  

---

## 🗂️ Pattern Project
Project ini menggunakan **Modular Monolith Pattern** dengan struktur folder sebagai berikut:

```
src/
│── auth/       # Module untuk Authentication (Register, Login, JWT)
│── post/       # Module untuk Post CRUD
│── prisma/     # Prisma Service (Database)
│── dtos/       # Data Transfer Objects (DTO)
│── app.module.ts

```

### ✨ Alasan menggunakan pattern ini:
- **Modular** → memisahkan concern per fitur (`auth` dan, `post`), sehingga mudah di-maintain.  
- **Scalable** → jika suatu saat perlu diubah ke **microservices**, tiap module dapat dipisah jadi service terpisah.  
- **Best Practice NestJS** → sesuai rekomendasi resmi NestJS untuk aplikasi monolith skala kecil-menengah.  

---

## 🛠️ Tech Stack
- [NestJS](https://nestjs.com/) - Backend framework  
- [TypeScript](https://www.typescriptlang.org/) - Static typing  
- [Prisma ORM](https://www.prisma.io/) - Database ORM  
- [MySQL](https://www.mysql.com/) - Relational Database  
- [JWT](https://jwt.io/) - Authentication  

---

## ⚙️ Setup & Installation

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Faiz2979/dot-challenge-nest
cd dot-challenge-nest
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Setup Database
Buat file `.env`:
```env
DATABASE_URL="mysql://user:password@localhost:3306/db_name"
JWT_SECRET="your_jwt_secret"
```

Lalu migrate schema:
```bash
npx prisma migrate dev
```

### 4️⃣ Run Project
```bash
npm run start:dev
```

---

## 📖 API Documentation
### ⚒️🚧 On Progress 🚧⚒️
<!-- Dokumentasi API tersedia dalam collection **Postman/Apidog**:  
- Register User  
- Login User  
- Create Post  
- Get All Posts  
- Update Post  
- Delete Post  

👉 [Link Dokumentasi API](#) *(isi dengan link Apidog/Postman export)*

--- -->

## 🧪 E2E Testing
### ⚒️🚧 On Progress 🚧⚒️
<!-- E2E Test dilakukan dengan **Apidog Testing**:
- ✅ Register user baru  
- ✅ Login dan mendapatkan JWT Token  
- ✅ Akses endpoint Post tanpa token (gagal)  
- ✅ Akses endpoint Post dengan token (berhasil)  
- ✅ Validasi update/delete hanya bisa dilakukan oleh pemilik post  

👉 Semua test case tersedia di collection **Apidog**.  

---

## 🎥 Video Demo
Video demo dikerjakan sesuai kriteria:
1. Menunjukkan aplikasi berjalan di seluruh halaman  
2. Menjelaskan hasil pengerjaan dari tiap poin challenge  
3. Presentasi dengan kamera on  
4. Recording menggunakan [Loom](https://www.loom.com/)  
5. Link hasil recording disediakan di form submission  

👉 [Link Video Demo](#) *(isi dengan link Loom recording)*

--- -->

## 👤 Author
Dibuat oleh **Muhammad Faiz Annabil** untuk Challenge Backend Engineer TypeScript DOT.
