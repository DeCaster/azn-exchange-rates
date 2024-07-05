const express = require('express');
const router = express.Router();
const {
  getRateByDateAndCurrency,
  getRatesByCurrency,
  getRates
} = require('../controllers/exchangeRateController');
const {
  login,
  register,
  changePassword
} = require('../controllers/authController');
const {
  validateRegister,
  validateLogin,
  validateChangePassword
} = require('../middleware/validationMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/forgot-password', validateChangePassword, changePassword);


router.get('/:date', authMiddleware, getRates);
router.get('/:date/:currency', authMiddleware, getRatesByCurrency);
router.get('/currency/:currency', authMiddleware, getRateByDateAndCurrency);

module.exports = router;
