const moment = require('moment');
const { getMessages, deleteMessageQuery, insertMessageQuery, updateAdminQuery } = require('../db/queries.js');
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

// probably should be in .env file lol
const puzzle = [
    {
        question: 'What is the answer to life, the universe, and everything?',
        answer: '42'
    },
    {
        question: 'What is the capital of France?',
        answer: 'Paris'
    }
];

async function getAdminPage(req, res) {
    const randomPuzzle = puzzle[Math.floor(Math.random() * puzzle.length)];
    req.session.randomPuzzle = randomPuzzle;

    res.render('admin', { errors: {}, data: {}, randomPuzzle }); // Send empty errors and data
}

async function adminUpdate(req, res) {
    try {
        const user_id = res.locals.currentUser.id;
        await updateAdminQuery(user_id);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating admin status');
    }
};

module.exports = {
    getHomePage,
    deleteMessage,
    getCreatePage,
    createMessage,
    getAdminPage,
    adminUpdate,
};