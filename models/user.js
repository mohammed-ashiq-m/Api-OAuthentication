var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

//Create a schema
var userSchema = new Schema({
   methode : {
       type : String,
       enum : ['local','google','facebook'],
       required : true
   },
    local :{
        email:{
            type:String,
            lowercase:true
        },
        password:{
            type:String
        }
    },
    google : {

    },
    facebook : {

    }
});

userSchema.pre('save',async function (next) {
    try{
        //Generate salt
        var salt =await bcrypt.genSalt(10);
    var passwordHash= await bcrypt.hash(this.password,salt);
    this.password = passwordHash;
    next();
    }
    catch(error){
        next(error);
    }
});

userSchema.methods.isValidPassword = async function (newPassword){
    try{
      return  await bcrypt.compare(newPassword, this.password);

    }
    catch(error){
        throw new Error (error);
    }
}

//Create a model

var User = mongoose.model('user',userSchema);

//Export the model

module.exports = User;
