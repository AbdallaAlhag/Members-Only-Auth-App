const bcrypt = require('bcryptjs');
const passport = require('passport');
const pool = require('../db/pool');

exports.getSignUpForm = (req, res) => {
    res.render('sign-up');
};

exports.signUp = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [
            req.body.username,
            hashedPassword,
        ]);
        res.redirect('/');
    } catch (err) {
        next(err);
    }
};

exports.logIn = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
});

exports.logOut = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
};
