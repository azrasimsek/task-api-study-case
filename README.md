# Task Management API - Case Study

Bu proje, Node.js ve Express kullanılarak geliştirilmiş, JWT kimlik doğrulamasına sahip bir RESTful API servisidir. Projede veri tabanı işlemmleri için Mysql kullanılmıştır.

## Kullanılan Teknolojiler

* **Backend:** Node.js, Express.js
* **Veritabanı:** MySQL
* **Güvenlik & Auth:** JSON Web Token (JWT)
* **Araçlar:** dotenv, nodemon

## Kurulum ve Çalıştırma

Projeyi lokal ortamınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz.

### 1. Projeyi Klonlayın
```
git clone [https://github.com/azrasimsek/task-api-study-case.git](https://github.com/azrasimsek/task-api-study-case.git)
cd task-api-study-case
```
### 2. Projeyi Klonlayın
``npm install``

### 3. Veritabanını Hazırlayın
MySQL üzerinde projenin kullanması için boş bir veritabanı oluşturun (Örn: `case_study_db`). Ardından bu veritabanı içerisine aşağıdaki yapıya sahip `users` ve `tasks` tablolarını manuel olarak oluşturun:

**Users Tablosu:**
* `id` (INT, Primary Key, Auto Increment)
* `email` (VARCHAR 191, NOT NULL, UNIQUE)
* `password` (VARCHAR 255, NOT NULL)

**Tasks Tablosu:**
* `id` (INT, Primary Key, Auto Increment)
* `title` (VARCHAR 255, NOT NULL)
* `description` (TEXT)
* `status` (VARCHAR 255, NOT NULL)
* `created_at` (TIMESTAMP - Default: CURRENT_TIMESTAMP)

### 4. .env Ayarlayın
Ana dizinde bulunan .env.example dosyasının adını .env olarak değiştirin ve içerisine kendi lokal MySQL bilgilerinizi girin:
``PORT=3000
DB_NAME=case_study_db
DB_USER=root
DB_PASSWORD=kendi_veritabani_sifreniz
DB_HOST=localhost
JWT_SECRET=gizli_anahtar_kelimeniz``

### 5. Sunucuyu Başlatın
``npm run dev``
Sunucu başarıyla başladığında terminalde "Server çalışıyor..." mesajını göreceksiniz.

### API Endpoint'leri
Tüm task endpoint'leri JWT (Bearer Token) ile korunmaktadır. İşlem yapabilmek için öncelikle /auth/login adresinden token alınmalı ve isteklerin Authorization header'ına eklenmelidir.

### Yetkilendirme (Auth)
POST /auth/login - Test amaçlı JWT token üretir.
POST /auth/regşster - Test amaçlı user kaydı yapar.

### Görevler (Tasks)
POST /task - Yeni bir görev oluşturur.

GET /tasks - Tüm görevleri listeler.

GET /tasks/:id - Belirtilen ID'ye sahip görevin detaylarını getirir.

PUT /tasks/:id - Belirtilen görevi günceller.

DELETE /tasks/:id - Belirtilen görevi siler.

### Geliştirici: Azra Şimşek
