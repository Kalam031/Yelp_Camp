var express = require("express");
var router = express.Router(),
    passport = require("passport"),
    User = require("../models/user");

router.get('/', (req, res) => {
    res.render("landing");
});

// show register
router.get('/register', (req, res) => {
    res.render("register");
});

//handle sign up logic
router.post('/register', (req, res) => {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
       if (err) {
           req.flash("error", err.message);
           return res.render("register");
        } 
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Welcome to Yelpcamp" + user.username);
            res.redirect('/campgrounds'); 
        });
    });
});

// show login
router.get('/login', (req, res) => {
    res.render("login");
});

// handling login logic
router.post('/login', passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login" 
    }), (req, res) => {
        
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
     res.redirect('/login');
}

module.exports = router;