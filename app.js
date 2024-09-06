/////// app.js
const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const router = require('./routes/index.js');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler');


const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use('/', router)

app.use(errorHandler);

app.listen(3000, () => console.log("app listening on port 3000!"));
