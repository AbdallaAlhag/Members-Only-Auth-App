/////// app.js
const express = require("express");
const path = require('path');
const session = require("express-session");
// storing sessions in postgresql
const pgSession = require('connect-pg-simple')(session);
const pool = require('./db/pool');
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
// honestly don't know what most of the cookies do except for maxAge
// and create a store for sessions since we are using railway to host, apparently the other way i did it was a memory leak
app.use(session({
    store: new pgSession({
        pool: pool, // Your PostgreSQL connection pool
        tableName: 'session',
        createTableIfMissing: process.env.NODE_ENV !== 'production', // Avoid auto-creating in production
    }),
    secret: process.env.SESSION_SECRET || 'cats',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        secure: process.env.NODE_ENV === 'production', // Enable for HTTPS in production
        httpOnly: true, // Helps with security
        sameSite: 'strict', // Helps mitigate CSRF attacks
    }
}));

app.use(passport.session());
// app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true })); // For form submissions


app.use((req, res, next) => {
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

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => console.log("app listening on port 8080!"));
