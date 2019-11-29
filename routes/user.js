var express = require('express');
var router = require('express-promise-router')();
var passport = require('passport');
var passportConf = require('../passport');

var {validateBody,schemas} = require('../helpers/routehelpers');
var UserController = require('../controllers/user');
var passportSignIn = passport.authenticate('local',{session : false});
var passportJWT = passport.authenticate('jwt',{session: false});


router.route('/signup')
.post(validateBody(schemas.authSchema),UserController.signUp);

router.route('/signin')
    .post(validateBody(schemas.authSchema),passportSignIn, UserController.signIn);

router.route('/outh/google')
    .post(passport.authenticate('googleToken',{session : false}));

router.route('/secret')

    .get(passportJWT,UserController.secret);

module.exports = router;
