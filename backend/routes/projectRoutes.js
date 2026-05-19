const router = require('express').Router();
const { protect, adminOnly } = require('../middleware/auth');
const c = require('../controllers/projectController');

router.get('/', protect, c.getProjects);
router.get('/:id', protect, c.getProject);
router.post('/', protect, adminOnly, c.createProject);
router.post('/:id/members', protect, adminOnly, c.addMember);
router.delete('/:id/members/:userId', protect, adminOnly, c.removeMember);

module.exports = router;
