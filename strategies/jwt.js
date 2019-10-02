const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const cache = require('persistent-cache');
const userCache = cache();
const SECRET_KEY = process.env.SECRET_KEY || 'y3B8hPPjswT2nGmdHH4H5jY7GeNVCyQ2ezYELxD4JLYwJfIGjr'; //TODO: get it from env
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY; 

module.exports = new JwtStrategy(opts, (jwt_payload, done) => {
    if (userCache.getSync(jwt_payload.sub) != undefined 
        && jwt_payload.sub ===  jwt.decode(userCache.getSync(jwt_payload.sub)).sub
        && jwt_payload.iat ===  jwt.decode(userCache.getSync(jwt_payload.sub)).iat) {
        return done(null, true)
    }
    return done(null, false)
}) 