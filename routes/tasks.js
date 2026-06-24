const express = require('express');
const router = express.Router();

// Controller ve Middleware dosyalarımızı çağırdım
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

// Hepsine 'authMiddleware' koyuyoruz ki tokunsuz kimse giremesin
// POST   /task
router.post('/task', authMiddleware, taskController.createTask);

// GET    /tasks
router.get('/tasks', authMiddleware, taskController.getTasks);

// GET    /tasks/:id
router.get('/tasks/:id', authMiddleware, taskController.getTaskById);

// PUT    /tasks/:id
router.put('/tasks/:id', authMiddleware, taskController.updateTask);

// DELETE /tasks/:id
router.delete('/tasks/:id', authMiddleware, taskController.deleteTask);

module.exports = router;