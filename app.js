var express = require('express');
var morgan = require('morgan');
var bodyparser = require('body-parser');
var mongoose = require ('mongoose');


//connecting to data base
mongoose.promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/apioauth');
mongoose.connection.on('connected',()=>{
    console.log('<======  Database connection is succesfull  ======>')
})

mongoose.connection.on('error',(err)=>{
    if(err)
    {
        console.log(' Trobule in connection of databse')
    }

})

var app = express();

//Middleware
app.use(morgan('dev'));

app.use(bodyparser.json());

//routes
app.use('/user',require('./routes/user'))
//Start the server

var port = process.env.PORT || 8080;

app.listen(port);

console.log(`server is running in port:${port}`);
