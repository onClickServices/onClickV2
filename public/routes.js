let express = require('express');
let router = express.Router();
let messages = require('../lib/typings/text');
let User = require('../lib/models/user');
let Admin = require('../lib/models/admin');
const expressValidator = require('express-validator');


//
// router.use(expressValidator({
//     errorFormatter: (param, msg, value) => {
//         let namespace = parm.split('.'),
//             root = namespace.shift(),
//             formParam = root;
//         while(namespace.length) {
//             formParam += '[' + namespace.shift() + ']';
//         }
//         return {
//             param: formParam,
//             msg: msg,
//             value: value
//         }
//     }
// }));

// Fetch index page
router.get('/', (req, res) => {
    res.render('index', {
        title: messages.pages.site.title.translation_0
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
        title: messages.pages.site.title.translation_1,
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
        title: messages.pages.site.title.translation_2,
        pageTitle: messages.pages.about.translation_1,
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
        console.log("this is the user: " + user);
            // Send them to error page
            res.redirect('/error');
        } else {
            res.redirect('/thanks');
        }
    });
});

router.get('/thanks', (req, res) => {
    res.render('thanks', {
        title: messages.pages.site.title.translation_3,
        header: 'Thank you for contacting onClick',
        body: 'Please expect a call from us within 24 hrs'
    });
});

router.get('/portfolio', (req, res) => {
   res.render('portfolio', {
       title: messages.pages.site.title.translation_5
   });
});

router.get('/error', (req, res) => {
   res.render('error', {
       title: messages.pages.site.title.translation_4,
       errorMessage: messages.title.translation_4,
       messageToUser: messages.error.translation_0
   });
});

router.get('/registered', (req, res) => {
    User.find({}, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            res.render('registered', {
                title: messages.pages.site.title.translation_6,
                header: messages.pages.registered.translation_1,
                user: user
            });
        }
    });
});

router.get('/portfolio', (req,res) => {
   res.render('portfolio', {
       title: messages.pages.site.title.translation_5
   })
});

router.get('/about', (req, res) => {
    res.render('about', {
        title: messages.pages.site.title.translation_7,
        pageTitle: messages.pages.about.translation_0
    });
});

router.get('/dashboard', (req, res) => {
    User.find({}, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            res.render('dashboard', {
                title: messages.pages.site.title.translation_0,
                user: user
            });
        }
    });
});
// TODO get details for one user
router.get('/details', (req, res) => {
    User.find({}, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            res.render('details', {
                title: messages.pages.site.title.translation_9,
                user: user
            });
        }
    });
});

router.get('/adminRegister', (req, res) => {
   res.render('adminRegister', {
       title: messages.pages.site.title.translation_10,
       pageTitle: messages.pages.site.title.translation_12,
       adminRegFirstName: messages.pages.admin.translation_0,
       adminRegLastName: messages.pages.admin.translation_1,
       adminUsername: messages.pages.admin.translation_2,
       adminRegPassword: messages.pages.admin.translation_3,
       adminRegPasswordConfirm: messages.pages.admin.translation_5,
   });
});
router.post('/adminRegister', (req, res) => {
    let admin = new Admin();
        admin.firstName = req.body.adminFirstName;
        admin.lastName = req.body.adminLastName;
        admin.username = req.body.adminUsername;
        admin.password = req.body.adminPassword;
        let adminConfirmPassword = req.body.adminPasswordConfirm;
            let NewAdmin = new Admin({
                adminFirstName : adminFirstName,
                adminLastName: adminLastName,
                adminUsername: adminUsername,
                adminPassword: adminPassword
            });
    admin.save((err) => {
        if (err) {
            console.log("this is the user: " + user);
            // Send them to error page
            res.redirect('/error');
        } else {
            res.redirect('/login');
        }
    });
});

router.get('/adminLogin', (req, res) => {
   res.render('adminLogin', {
       title: messages.pages.site.title.translation_11,
       pageTitle: messages.pages.admin.translation_4,
       adminLoginUsername: messages.pages.admin.translation_2,
       adminLoginPassword: messages.pages.admin.translation_3
   })
});


router.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});



module.exports = router;