const pool = require('../config/database');

// POST /tasks
exports.createTask = async (req, res) => {
    const { title, description, status } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Görev başlığı zorunludur.' });
    }
    try {
        const taskStatus = status || 'beklemede'; // Eğer status belirtilmemişse varsayılan olarak 'beklemede' olarak ayarladım
        const [result] = await pool.query(
            'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
            [title, description, taskStatus]
        );

        res.status(201).json({ 
            message: 'Görev başarıyla oluşturuldu.',
            taskId: result.insertId 
        });
    } catch (error) {
        res.status(500).json({ message: 'Görev eklenirken bir hata oluştu.' });
    }
};

//GET /tasks
exports.getTasks = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tasks');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Görevler getirilirken bir hata oluştu.' });
    }
};

//GET /tasks/:id
exports.getTaskById = async (req, res) => {
    const taskId = req.params.id;

    try {
        const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [taskId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Görev bulunamadı.' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Görev getirilirken bir hata oluştu.' });
    }
};

//PUT /tasks/:id
exports.updateTask = async (req, res) => {
    const taskId = req.params.id;
    const { title, description, status } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Görev başlığı (title) zorunludur.' });
    }

    try {
        const [result] = await pool.query(
            'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
            [title, description, status, taskId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Güncellenecek görev bulunamadı.' });
        }
        res.status(200).json({ message: 'Görev başarıyla güncellendi.' });
    } catch (error) {
        res.status(500).json({ message: 'Görev güncellenirken bir hata oluştu.' });
    }
};

//DELETE /tasks/:id
exports.deleteTask = async (req, res) => {
    const taskId = req.params.id;

    try {
        const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [taskId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Silinecek görev bulunamadı.' });
        }

        res.status(200).json({ message: 'Görev başarıyla silindi.' });
    } catch (error) {
        res.status(500).json({ message: 'Görev silinirken bir hata oluştu.' });
    }
};