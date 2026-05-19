const router = require('express').Router();
const { protect, adminOnly } = require('../middleware/auth');
const c = require('../controllers/taskController');

router.get('/', protect, c.getTasks);
router.post('/', protect, adminOnly, c.createTask);
router.patch('/:id/status', protect, c.updateStatus);
router.delete('/:id', protect, adminOnly, c.deleteTask);

module.exports = router;
