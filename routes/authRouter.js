const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { signupValidationRules, validateSignup } = require('../middleware/validateSignup');

router.get('/log-in', authController.getLoginForm);
router.post('/log-in', authController.logIn);

router.get('/log-out', authController.logOut);

router.get('/sign-up', authController.getSignupForm);
router.post('/sign-up', signupValidationRules, validateSignup, authController.signUp);
module.exports = router;
