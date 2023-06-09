
import passportJwt from 'passport-jwt';
import User from '../models/AuthModel.js';
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
    
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'my secret';

export default (passport)=> {
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
       User.findById(jwt_payload._id).then(
        function(user) {
            if (user) {
                return done(null, user);
                
            } else {
                
                return done(null, false);
                // or you could create a new account
            }
        }).catch(function(err){
            console.log(err);
        });
      
    }));
}

