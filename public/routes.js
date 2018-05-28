let express = require('express');
let router = express.Router();
let messages = require('../lib/typings/text')

// Fetch index page
router.get('/', (req, res) => {
    res.render('index', {
        title: messages.title.translation_0
    });
});

// Fetch services page
router.get('/services', (req, res) => {

    let cardTitles = [
        messages.pages.servicePage.translation_2,
        messages.pages.servicePage.translation_10,
        messages.pages.servicePage.translation_11
    ];
    let cardBodyOne = [
        messages.pages.servicePage.translation_3,
        messages.pages.servicePage.translation_4,
        serviceList = [
            messages.pages.servicePage.translation_5,
            messages.pages.servicePage.translation_6,
            messages.pages.servicePage.translation_7,
            messages.pages.servicePage.translation_8,
            messages.pages.servicePage.translation_9
        ],
    ];
    let cardBodyTwo = [
        messages.pages.servicePage.translation_17,
        messages.pages.servicePage.translation_18,
        serviceList = [
            messages.pages.servicePage.translation_19,
            messages.pages.servicePage.translation_20,
            messages.pages.servicePage.translation_21,
            messages.pages.servicePage.translation_21,
        ]
    ];
    let cardBodyThree = [
        messages.pages.servicePage.translation_12,
        serviceList = [
            messages.pages.servicePage.translation_13,
            messages.pages.servicePage.translation_14,
            messages.pages.servicePage.translation_15,
            messages.pages.servicePage.translation_16,

        ]
    ];
    res.render('services', {
        title: messages.title.translation_1,
        pageHeader: messages.pages.servicePage.translation_0,
        pageLead: messages.pages.servicePage.translation_1,
        services: serviceList,
        cardTitle: cardTitles,
        cardBodyOne: cardBodyOne,
        cardBodyTwo:cardBodyTwo,
        cardBodyThree: cardBodyThree,
        contactButton: messages.pages.site.translation_1
    });
});

// Fetch contact
router.get('/contact', (req, res) => {
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
router.post('/contact', (req, res) => {
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

router.get('/thanks', (req, res) => {
    res.render('thanks', {
        title: messages.title.translation_3,
        header: 'Thank you for contacting onClick',
        body: 'Please expect a call from us within 24 hrs'
    });
});

module.exports = router