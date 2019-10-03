const express = require('express')
const app = express()
var bodyParser = require('body-parser');
const path = require('path');
// const port = process.env.PORT | 5000;
var userRouter = require('./routers/userRouters');
var authRouter = require('./routers/auth');

// Passport Config
const jwt = require("jsonwebtoken");
const passport = require("passport");
const jwtStrategry  = require("./strategies/jwt");
passport.use(jwtStrategry);


//Dev only
// var cors = require('cors')
// app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (__dirname.slice(-5) === '/view') { // For production
    app.use('/',express.static(__dirname));
  } else { // For development
    app.use('/',express.static(__dirname + '/view')); 
  }

// app.use('/',express.static(__dirname + '/view'));  // sends the landing page

app.use('/auth', authRouter);
app.use('/api',passport.authenticate('jwt', { session: false }), userRouter);


app.listen(process.env.PORT || 5000, () => console.log(`App listening on port ${process.env.PORT || 5000}!`));