const moment = require('moment');
const { getMessages, deleteMessageQuery } = require('../db/queries.js');

async function getHomePage(req, res) {
    const messages = await getMessages();
    res.render('index', {
        messages: messages,
        moment: moment
    });
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

module.exports = {
    getHomePage,
    deleteMessage
};