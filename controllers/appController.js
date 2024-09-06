// const {  } = require('../db/queries.js');

function getHomePage(req, res) {
    res.render('index');
}

module.exports =  {
    getHomePage,
};