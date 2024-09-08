const express = require("express");
const appController = require("../controllers/appController.js");
const router = express.Router();


router.get('/', appController.getHomePage);
router.delete('/delete/:id', appController.deleteMessage);


module.exports = router