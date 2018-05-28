// Import variables
const express = require('express');
const app = express();
const server = require('./lib/server');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./public/routes');


// Delete before production
let log = console.log;

const messages = require('./lib/typings/text');
let User = require('./lib/models/user');

// Database connection and error checking
// Comment out the following lines of code to connect to the database
// mongoose.connect(server.dbConfig.dbPort);
// let db = mongoose.connection;
//
// db.on('connected', () => {
//     log(messages.db.translation_1);
// });
//
// db.on('error', (err) => {
//     log(messages.db.translation_0 + err)
// });

// Server port listen
app.listen(server.config.port, (err) => {
    if (err) {
        log(messages.server.translation_0 + server.config.port);
    } else {
        log(messages.server.translation_1 + server.config.port)
    }
});

// Setting the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Body parser middleware //
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

// Set public folder to static
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
