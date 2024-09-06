const { getMessages } = require('../db/queries.js');

async function getHomePage(req, res) {
    const messages = await getMessages();
    console.log(messages)
    res.render('index', {
        messages: messages,
    });
}

module.exports = {
    getHomePage,
};