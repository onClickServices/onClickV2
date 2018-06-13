let express = require('express');
let router = express.Router();
const expressValidator = require('express-validator');
let bcrypt = require('bcryptjs');

// Models
let User = require('../lib/models/user');
let Admin = require('../lib/models/admin');
let Question = require('../lib/models/questions');

// Custom Libraries
let ocMessages = require('../lib/typings/text');

router.use(expressValidator({
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

// Fetch index page

// Fetch landing page
router.get('/', (req, res) => {
    let introText = [
        ocMessages.pages.landing.translation_0,
        ocMessages.pages.landing.translation_1,
        ocMessages.pages.landing.translation_2,
        ocMessages.pages.landing.translation_3,
        ocMessages.pages.landing.translation_4,
        ocMessages.pages.landing.translation_5,
        ocMessages.pages.landing.translation_6
    ];
    // Render the landing page
    res.render('landing', {
        ocMessages,
        introText
    })
});

// Fetch the about page
router.get('/about', (req, res) => {
    // Render the about page
    res.render('about', {
        ocMessages
    });
});

// Fetch contact page
router.get('/contact', (req, res) => {
    res.render('contact', {
        ocMessages
    });
});

// Grab and post contact information
router.post('/contact', (req, res) => {
    // New user schema from lib/models/user.js
    let user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.phone = req.body.phone;
    user.email = req.body.email;
    user.message = req.body.message;
    // Save the user
    user.save((err) => {
        // Check for error
        if (err) {
            // If there is an error redirect user to the error page
            console.log("this is the user: " + user);
            // Send them to error page
            res.redirect('/error');
        } else {
            // If no error while saving the user redirect them to the thank you page
            res.redirect('/questionnaire');
        }
    });
});

// Fetch the error page
router.get('/error', (req, res) => {
    // Render the error page
    res.render('error', {
        ocMessages
    });
});

router.get('/home', (req, res) => {
    // Render index page
    res.render('index', {
        title: ocMessages.pages.site.title.translation_0,
        ocMessages
    });
});

// Fetch services page
router.get('/services', (req, res) => {
    // Variables for service page
    let cardBodyOne =  [
            ocMessages.pages.servicePage.translation_5,
            ocMessages.pages.servicePage.translation_6,
            ocMessages.pages.servicePage.translation_7,
            ocMessages.pages.servicePage.translation_8,
            ocMessages.pages.servicePage.translation_9
        ];
    let cardBodyTwo = [
            ocMessages.pages.servicePage.translation_19,
            ocMessages.pages.servicePage.translation_20,
            ocMessages.pages.servicePage.translation_21,
            ocMessages.pages.servicePage.translation_21,
    ];
    let cardBodyThree = [
            ocMessages.pages.servicePage.translation_13,
            ocMessages.pages.servicePage.translation_14,
            ocMessages.pages.servicePage.translation_15,
            ocMessages.pages.servicePage.translation_16,
    ];

    // Render the services page
    res.render('services', {

        cardBodyOne,
        cardBodyTwo,
        cardBodyThree,
        ocMessages
    });
});

// Fetch the portfolio page
router.get('/portfolio', (req, res) => {
    // Render the portfolio page
    res.render('portfolio', {
        title: ocMessages.pages.site.title.translation_5
    });
});

// Fetch the thank you page
router.get('/thanks', (req, res) => {
    // Render the thank you page
    res.render('thanks', {
        ocMessages
    });
});

// Fetch the questionnaire page
router.get('/questionnaire', (req, res) => {
    // Render the about page
    res.render('questionnaire', {
        ocMessages
    });
});

// Grab and post contact information
router.post('/questionnaire', (req, res) => {
    // New user schema from lib/models/user.js
    let quest = new Question();
    quest.question1 = req.body.formQuestion1;
    quest.question2 = req.body.formQuestion2;
    quest.question3 = req.body.formQuestion3;
    quest.question4 = req.body.formQuestion4;
    quest.question5 = req.body.formQuestion5;
    quest.question6 = req.body.formQuestion6;
    quest.question7 = req.body.formQuestion7;
    quest.date = req.body.date;
    console.log(quest);
    console.log('123');
    // Save the user
    quest.save((err) => {
        // Check for error
        if (err) {
            // If there is an error redirect user to the error page
            console.log("this is the error: " + quest);
            // Send them to error page
            res.redirect('/error');
        } else {
            // If no error while saving the user redirect them to the thank you page
            res.redirect('/thanks');
        }
    });
});

module.exports = router;