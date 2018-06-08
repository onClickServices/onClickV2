let express = require('express');
let router = express.Router();
let messages = require('../lib/typings/text');
let User = require('../lib/models/user');
let Admin = require('../lib/models/admin');
const expressValidator = require('express-validator');
let bcrypt = require('bcryptjs')

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
router.get('/home', (req, res) => {
    // Render index page
    res.render('index', {
        title: messages.pages.site.title.translation_0
    });
});

// Fetch services page
router.get('/services', (req, res) => {
    // Variables for service page
    let cardBodyOne =  [
            messages.pages.servicePage.translation_5,
            messages.pages.servicePage.translation_6,
            messages.pages.servicePage.translation_7,
            messages.pages.servicePage.translation_8,
            messages.pages.servicePage.translation_9
        ];
    let cardBodyTwo = [
            messages.pages.servicePage.translation_19,
            messages.pages.servicePage.translation_20,
            messages.pages.servicePage.translation_21,
            messages.pages.servicePage.translation_21,
    ];
    let cardBodyThree = [
            messages.pages.servicePage.translation_13,
            messages.pages.servicePage.translation_14,
            messages.pages.servicePage.translation_15,
            messages.pages.servicePage.translation_16,
    ];

    // Render the services page
    res.render('services', {
        ocMessages: messages
    });
});

// Fetch contact page
router.get('/contact', (req, res) => {
    res.render('contact', {
        ocMessages: messages
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
            res.redirect('/thanks');
        }
    });
});

// Fetch the thank you page
router.get('/thanks', (req, res) => {
    // Render the thank you page
    res.render('thanks', {
        ocMessages: messages
    });
});

// Fetch the portfolio page
router.get('/portfolio', (req, res) => {
   // Render the portfolio page
   res.render('portfolio', {
       title: messages.pages.site.title.translation_5
   });
});



// Fetch the error page
router.get('/error', (req, res) => {
   // Render the error page
   res.render('error', {
       ocMessages: messages
   });
});

// Fetch the registerd users page
router.get('/registered', (req, res) => {
    // Search for users using the User.find() method and check for erros
    User.find({}, (err, user) => {
        // If errors console log the error
        if (err) {
            console.log(err);
        // If no errors render the registered page
        } else {
            res.render('registered', {
                title: messages.pages.site.title.translation_6,
                header: messages.pages.registered.translation_1,
                user: user
            });
        }
    });
});

// Fetch the portfolio page
router.get('/portfolio', (req,res) => {
   // Render the portfolio page
   res.render('portfolio', {
       title: messages.pages.site.title.translation_5
   })
});

// Fetch the about page
router.get('/about', (req, res) => {
    // Render the about page
    res.render('about', {
        ocMessages: messages
    });
});

// Fetch the questionnaire page
router.get('/questionnaire', (req, res) => {
    // Render the about page
    res.render('questionnaire', {
        ocMessages: messages
    });
});

// Fetch the dashboard page
router.get('/dashboard', (req, res) => {
    // Search for registered users and check for errors
    User.find({}, (err, user) => {
        // If errors console out the error
        if (err) {
            console.log(err);
        // If no errors render the dashboard and pass the found users to the template
        } else {
            res.render('dashboard', {
                ocMessages: messages,
                user: user
            });
        }
    });
});
// TODO get details for one user
// Fetch the details pages
router.get('/details', (req, res) => {
    // Find a single user to pass through to the details page and check for errors
    User.find({}, (err, user) => {
            // If error console log the erro
        if (err) {
            console.log(err);
        //     If no error render the details page and pass along the single user
        } else {
            res.render('details', {
                title: messages.pages.site.title.translation_9,
                user: user
            });
        }
    });
});

// Fetch the admin registration page
router.get('/adminRegister', (req, res) => {
   // Render the admin registration page
   res.render('adminRegister', {
       title: messages.pages.site.title.translation_10,
       pageTitle: messages.pages.admin.translation_7,
       adminRegFirstName: messages.pages.admin.translation_0,
       adminRegLastName: messages.pages.admin.translation_1,
       adminRegUsername: messages.pages.admin.translation_2,
       adminRegPassword: messages.pages.admin.translation_3,
       adminRegPasswordConfirm: messages.pages.admin.translation_5,
   });
});

// Post the information from the admin registration form
router.post('/adminRegister', (req, res) => {
    // Create a new Admin from the mongoose admin schema lib/models/admin.js
    let admin = new Admin();
        admin.adminFirstname = req.body.adminRegFirstName;
        admin.adminLastName = req.body.adminRegLastName;
        admin.adminUsername = req.body.adminRegUsername;
        admin.adminPassword = req.body.adminRegPassword;
    // Check for any errors before saving the post
    admin.save((err) => {
        // If there is an error console log the error and redirect to error page
        if (err) {
            console.log("this is the user: " + err);
            // Send them to error page
            res.redirect('/error');
        // If no error hash the user password before sending it to the database
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(admin.adminPassword, salt, (err, hash) => {
                    admin.adminPassword = hash;
                    admin.save(admin);
                });
            });
            // If admin is created successfully redirect them to the login page
            res.redirect('/adminLogin');
        }
    });
});

// Fetch the admin login page
router.get('/adminLogin', (req, res) => {
   // Render the admin page
   res.render('adminLogin', {
       title: messages.pages.site.title.translation_11,
       pageTitle: messages.pages.admin.translation_4,
       adminUsername: messages.pages.admin.translation_2,
       adminPassword: messages.pages.admin.translation_3
   })
});

// Fetch landing page
router.get('/', (req, res) => {
    let introText = [
      messages.pages.landing.translation_0,
      messages.pages.landing.translation_1,
      messages.pages.landing.translation_2,
      messages.pages.landing.translation_3,
      messages.pages.landing.translation_4,
      messages.pages.landing.translation_5,
      messages.pages.landing.translation_6
    ];
    // Render the landing page
    res.render('landing', {
        ocMessages: messages,
        introText
    })
});

module.exports = router;