/////// app.js
const express = require("express");
const path = require('path');
const session = require("express-session");
const passport = require('./config/passport'); 
const indexRouter = require('./routes/indexRouter');
const authRouter = require('./routes/authRouter');
const errorHandler = require('./middleware/errorHandler');


const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    console.log(res.locals)
    next();
});

app.use('/', indexRouter);
app.use('/', authRouter);

app.use(errorHandler);

app.listen(3000, () => console.log("app listening on port 3000!"));
