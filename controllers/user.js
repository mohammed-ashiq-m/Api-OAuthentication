var JWT = require('jsonwebtoken');
var User=require('../models/user');
var {JWT_SECRET} = require('../configration/index');

signToken = user =>{
    return  JWT.sign({
        iss:'ashiq',
        sub:user._id,
        iat: new Date().getTime(),
        exp:new Date().setDate(new Date().getDate() + 1 ) //current time plus one day
    },JWT_SECRET);
}
module.exports = {

//email password
    signUp : async (req,res,next) =>{
        var {email,password} = req.value.body;
//check the user email already exist
        var foundUser=await User.findOne({email});

        if(foundUser){
          return res.status(403).json({error:'Email is already in use'})
        }

                          //Create New User

        var newUser = new User({email,password});
        await newUser.save();

        var token = signToken(newUser);

                          //Respond With tocken


        res.status(200).json({ token });

    },

    signIn : async (req,res,next) =>{

                           //Generate tocken
        var token = signToken(req.user);
        res.status(200).json({token});

    },
    secret : async (req,res,next) =>{
        console.log('i managed to get here !..');
        res.json({secret : "resource"});

    }
}
