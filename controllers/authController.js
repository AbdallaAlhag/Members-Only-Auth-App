const bcrypt = require('bcryptjs');
const passport = require('passport');
const pool = require('../db/pool');

exports.getLoginForm = (req, res) => {
    res.render('log-in', { errorMessage: '' });
};

exports.getSignupForm = (req, res) => {
    res.render('sign-up', { errors: {}, data: {} });
};

exports.signUp = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await pool.query('INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)', [
            req.body.firstName,
            req.body.lastName,
            req.body.username,
            hashedPassword,
        ]);
        res.redirect('/');
    } catch (err) {
        next(err);
    }
};

// exports.logIn = passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/log-in', // Redirect back to login form if authentication fails
// });

exports.logIn = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err); // If there's an internal server error
        }
        if (!user) {
            // Authentication failed, display the error message from the `info` object
            return res.render('log-in', { errorMessage: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        });
    })(req, res, next);
};

exports.logOut = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
};
