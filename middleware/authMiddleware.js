const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    //İsteğin header'ından Authorization kısmını aldım
    const authHeader = req.header('Authorization');

    //Token hiç gönderilmemişse veya "Bearer " ile başlamıyorsa reddettim
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Erişim reddedildi. Geçerli bir token bulunamadı.' });
    }

    //"Bearer <token_gelecek_buraya>" string'ini boşluktan bölüp ve sadece token kısmını aldım
    const token = authHeader.split(' ')[1];
    try {
        //Token'ı gizli key ile doğruladım
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // içinden çıkardığımız bilgiyi (userId) request objesine ekledım, böylece controller'da kullanabileceğim
        req.user = decoded;
        next();
    } catch (error) {
        // Token süresi dolmuşsa veya sahteyse bu bloğa düşer
        return res.status(401).json({ message: 'Geçersiz veya süresi dolmuş token.' });
    }
};

module.exports = authMiddleware;