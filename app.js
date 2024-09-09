/////// app.js
const express = require("express");
const path = require('path');
const session = require("express-session");
const passport = require('./config/passport');
const indexRouter = require('./routes/indexRouter');
const authRouter = require('./routes/authRouter');
const errorHandler = require('./middleware/errorHandler');
const methodOverride = require('method-override');


const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
// app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true })); // For form submissions

app.use((req, res, next) => {
    // res.locals.currentUser = req.user;
    if (req.isAuthenticated()) {
        res.locals.currentUser = req.user;
    } else {
        res.locals.currentUser = null; // No user logged in
    }
    next();
});

app.use('/', indexRouter);
app.use('/', authRouter);

app.use(errorHandler);

app.listen(3000, () => console.log("app listening on port 3000!"));
