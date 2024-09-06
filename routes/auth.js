const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/sign-up', authController.getSignUpForm);
router.post('/sign-up', authController.signUp);
router.post('/log-in', authController.logIn);
router.get('/log-out', authController.logOut);

module.exports = router;
