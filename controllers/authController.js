const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {//eğer email veya şifre boş ise hata döndürdüm
        return res.status(400).json({ message: 'Email ve şifre alanları zorunludur.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10); //şifreyi hashledim
    try {
        //veritabanına kullanıcıyı ekledim ve eğer email zaten varsa hata döndürdüm, çünkü email alanı unique olarak ayarladım.
        const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Bu email zaten mevcut.' });
        }
        const [result] = await pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
        //kullanıcı oluşturulduktan sonra kullanıcı id'sini döndürdüm
        res.status(201).json({ message: 'Kullanıcı başarıyla oluşturuldu.', userId: result.insertId });
    } catch (error) {
        //diğer hatalar için genel bir hata mesajı döndürdüm
        res.status(500).json({ message: 'Kullanıcı oluşturulurken bir hata oluştu.', error });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {//eğer email veya şifre boş ise hata döndürdüm
        return res.status(400).json({ message: 'Email ve şifre alanları zorunludur.' });
    }
    try {
        //veritabanından kullanıcıyı email ile buldum, eğer kullanıcı yoksa hata döndürdüm
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Geçersiz email veya şifre.' });
        }
        const user = rows[0];
        //şifreyi karşılaştırdım, eğer şifre yanlışsa hata döndürdüm
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) { //şifre yanlışsa hata döndürdüm
            return res.status(401).json({ message: 'Geçersiz email veya şifre.' });
        }
        //şifre doğruysa JWT token oluşturdum ve kullanıcıya döndürdüm
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        //token'ı döndürdüm
        res.status(200).json({ message: 'Giriş başarılı.', token });
    } catch (error) {
        res.status(500).json({ message: 'Giriş yapılırken bir hata oluştu.', error });
    }
};
