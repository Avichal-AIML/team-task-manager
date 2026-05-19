const router = require('express').Router();
const { body } = require('express-validator');
const { signup, login, me } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post(
  '/signup',
  [
    body('name').notEmpty().withMessage('Name required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
  ],
  signup
);
router.post('/login', login);
router.get('/me', protect, me);

module.exports = router;
