// Import variables
const express = require('express');
const app = express();
const server = require('./lib/server');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');


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

// Fetch index page
app.get('/', (req, res) => {
    res.render('index', {
        title: messages.title.translation_0
    });
});

// Fetch services page
app.get('/services', (req, res) => {
    res.render('services', {
        title: messages.title.translation_1
    });
});

// Fetch contact
app.get('/contact', (req, res) => {
    res.render('contact', {
        title: messages.title.translation_2,
        contactFirstName: messages.contact.translation_0,
        contactLastName: messages.contact.translation_1,
        contactPhone: messages.contact.translation_3,
        contactEmail: messages.contact.translation_2,
        contactMessage: messages.contact.translation_4
    });
});

// Retrieve contact information
app.post('/contact', (req, res) => {
    let user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.phone = req.body.phone;
    user.email = req.body.email;
    user.message = req.body.message;
    user.save((err) => {
        if (err) {
            // Send them to error page
           res.redirect('/error', {
               title: messages.title.translation_4
           });
        } else {
            res.redirect('/thanks');
        }
    });
});

app.get('/thanks', (req, res) => {
    res.render('thanks', {
        title: messages.title.translation_3,
        header: 'Thank you for contacting onClick',
        body: 'Please expect a call from us within 24 hrs'
    });
});