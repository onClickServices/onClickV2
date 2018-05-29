/*
* Main app file for onClick v2
* */

// Import variables
const express = require('express');
const app = express();
const server = require('./lib/server');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./public/routes');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


// Delete before production
let log = console.log;

const messages = require('./lib/typings/text');

let adminUser = require('./lib/models/admin')

// Database connection and error checking
// Comment out the following lines of code to connect to the database
mongoose.connect(server.dbConfig.dbHost + server.dbConfig.dbName);
let db = mongoose.connection;

db.on('connected', () => {
    log(messages.db.translation_1 + messages.db.translation_2 + server.dbConfig.dbName);
});

db.on('error', (err) => {
    log(messages.db.translation_0 + err)
});

// Server port listen
app.listen(process.env.PORT || server.config.port, (err) => {
    if (err) {
        log(messages.server.translation_0 + server.config.port);
    } else {
        log(messages.server.translation_1 + server.config.port)
    }
});

// Setting the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set public folder to static
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware //
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());

// Express session middleware
app.use(session({
    secret: server.dbConfig.secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

// Passport middle ware
app.use(passport.initialize());
app.use(passport.session());

// Express form validator
app.use(expressValidator({
    errorFormatter: (param, msg, value) => {
        let namespace = parm.split('.'),
            root = namespace.shift(),
            formParam = root;
        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        }
    }
}));
// Flash messaging
app.use(flash());
// Location to routes
app.use('/', routes);
// app.use('/admin', adminUser);
