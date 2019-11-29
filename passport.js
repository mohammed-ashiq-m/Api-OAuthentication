var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var GooglePlusTokenStrategy = require('passport-google-plus-token')
var { ExtractJwt } = require('passport-jwt');
var { JWT_SECRET } = require('./configration/index');

var User = require('./models/user')

passport.use(new JwtStrategy({
    jwtFromRequest :ExtractJwt.fromHeader('authorization'),
    secretOrKey : JWT_SECRET
},async (payload,done) =>{
    try{
        var user = await User.findById(payload.sub);
        if(!user){
            return done(null,false);
        }
        done(null,user);
    }
    catch(error){
        done(error,false);
    }
}));
//Google Api Authentication

passport.use('googleToken',new GooglePlusTokenStrategy({
    clientID : '286076279776-202b7g332c9gglrbajhg6guk06fe4fk8.apps.googleusercontent.com',
    clientSecret : 'SRBphOqQWTlnZdLB3rOGpFIq'
},async (accessToken,refreshToken,profile,done) =>{
    console.log('accessToken',accessToken);
    console.log('refreshToken',refreshToken);
    console.log('profile',profile);
}));

//Local Strategy
passport.use(new LocalStrategy({
    usernameField : 'email'
},async (email,password,done) =>{

    try{
        var user = await User.findOne({email});
        if(!user){
            return done(null,false);
        }
        var isMatch = await user.isValidPassword(password);
        if(!isMatch){
            return done(null,false);
        }
        done(null,user);
      }
    catch(error){
        done(error,false);
     }
}));
