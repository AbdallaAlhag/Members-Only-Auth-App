const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.get('/log-in', authController.getLoginForm);
router.post('/log-in', authController.logIn);

router.get('/log-out', authController.logOut);

router.get('/sign-up', authController.getSignupForm);
router.post('/sign-up', authController.signUp);
module.exports = router;
