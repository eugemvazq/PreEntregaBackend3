// config/passport.js
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import User from '../models/User.js';
import config from './config.js';

const opts = {};

// Extraer el token JWT de las cookies manualmente
opts.jwtFromRequest = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt']; // Extrae el token de la cookie 'jwt'
    }
    return token;
};

opts.secretOrKey = config.jwtSecret;

export default (passport) => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch(err => console.error(err));
    }));
};