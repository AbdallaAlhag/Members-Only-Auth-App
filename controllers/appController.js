const moment = require('moment');
const { getMessages, deleteMessageQuery, insertMessageQuery } = require('../db/queries.js');
const { body, validationResult } = require("express-validator");


async function getHomePage(req, res) {
    const messages = await getMessages();
    res.render('index', {
        messages: messages,
        moment: moment
    });
}

async function getCreatePage(req, res) {
    res.render('create', { errors: {}, data: {} }); // Send empty errors and data
}

async function deleteMessage(req, res) {
    try {
        let { id } = req.params;
        // Delete the message from the database
        await deleteMessageQuery(id);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting the message');
    }
}



async function createMessage(req, res) {
    try {
        const { title, content } = req.body;
        const user_id = res.locals.currentUser.id;

        await insertMessageQuery(title, content, user_id);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating the message');
    }
}

module.exports = {
    getHomePage,
    deleteMessage,
    getCreatePage,
    createMessage
};