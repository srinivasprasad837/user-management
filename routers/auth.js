const express = require('express')
const router = express.Router();  

const jwt = require('jsonwebtoken');
// var redis = require('redis');
// var JWTR =  require('jwt-redis').default;
// var redisClient = redis.createClient();
// var jwtr = new JWTR(redisClient);

const cache = require('persistent-cache');
const userCache = cache({
    duration: 1000 * 3600
});

const SECRET_KEY = process.env.SECRET_KEY || 'y3B8hPPjswT2nGmdHH4H5jY7GeNVCyQ2ezYELxD4JLYwJfIGjr';
const TOKEN_EXP_TIME = process.env.TOKEN_EXP_TIME || '1h'


router.post('/login',
function(req, res, next) {
    const { headers: { host }, body: { user } } = req;

    console.log(req.body);
    //TODO: fetch from vault
    const userFromVault={
        "userName": "test",
        "password": "test"
    }
    if(!user.userName) {
        return res.status(401).json({
        error: {
            message: 'username is required',
        },
        });
    }
    if(!user.password) {
        return res.status(401).json({
        error: {
            message: 'password is required',
        },
        });
    }

    if(userFromVault.userName === user.userName && userFromVault.password === user.password){
        var token = jwt.sign({
            sub: user.userName,
            type: "local",
            nounce: ""
        }, 
            SECRET_KEY, { expiresIn: TOKEN_EXP_TIME });

        console.log(token);
        userCache.putSync(user.userName, token);
        return res.status(201)
            .json({  token }); 
    }
  
    return res.status(401).json({
        error: {
            message: 'invalid user credentials'
        },
        });
});

module.exports = router;