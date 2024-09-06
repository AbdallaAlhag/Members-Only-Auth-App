const moment = require('moment');
const { getMessages } = require('../db/queries.js');

async function getHomePage(req, res) {
    const messages = await getMessages();
    res.render('index', {
        messages: messages,
        moment: moment
    });
}

module.exports = {
    getHomePage,
};