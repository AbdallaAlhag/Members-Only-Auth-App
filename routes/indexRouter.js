const express = require("express");
const appController = require("../controllers/appController.js");
const { messageValidationRules, validateMessage } = require('../middleware/messageValidation');
const { validateAdminAnswer } = require('../middleware/validateAdminAnswer');

const router = express.Router();

// get home page
router.get('/', appController.getHomePage);

// delete message
router.delete('/delete/:id', appController.deleteMessage);

// get create page and create message
router.get('/create', appController.getCreatePage);
router.post('/create', messageValidationRules, validateMessage, appController.createMessage);

// get admin page
router.get('/admin', appController.getAdminPage);
router.post('/admin', validateAdminAnswer, appController.adminUpdate);
module.exports = router