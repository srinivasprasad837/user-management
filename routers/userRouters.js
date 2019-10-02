const express = require('express')
var router = express.Router();  
const request = require('request');

// var redis = require('redis');
// var JWTR =  require('jwt-redis').default;
// var redisClient = redis.createClient();
// var jwtr = new JWTR(redisClient);

const jwt = require('jsonwebtoken');
const cache = require('persistent-cache');
const userCache = cache();

const applicationsUrl = process.env.ACA_REGISTRY_APPLICATIONS_URL || 'http://localhost:8000/applications'
const SECRET_KEY = process.env.SECRET_KEY || 'y3B8hPPjswT2nGmdHH4H5jY7GeNVCyQ2ezYELxD4JLYwJfIGjr';


router.get('/logout', function(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    console.log("requestHeaderToken: ",token);
    const userName = jwt.decode(token).sub;
    const cachedToken = userCache.getSync(userName);
    console.log("cachedToken: ",cachedToken);
    userCache.deleteSync(userName);
    res.redirect('/login');
});

module.exports = router;