const express = require('express');
require('dotenv').config();
const pool = require('./config/database');

// Router dosyalarını çağırdım
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(express.json());// JSON formatında gelen request body'lerini parse edebilmek için

// ENDPOINT'LERİ UYGULAMAYA BAĞLAMA
app.use('/auth', authRoutes); // /auth/login ve /auth/register için
app.use('/', taskRoutes);     // /task ve /tasks endpoint'leri için doğrudan yönlendirme yaptım

app.listen(process.env.PORT || 3000, () => {
    console.log('Server çalışıyor...');
});