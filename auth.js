// bcrypt: password encryption
var bcrypt = require('bcrypt');
// jwt: used to create, sign, and verify tokens
var jwt = require('jsonwebtoken');

const saltRounds = 10;

module.exports = {
    jwtSecret: null,
    cryptPassword: function(password, callback) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) throw err;
     
         bcrypt.hash(password, salt, function(err, hash) {
            if(err) throw err;

            return callback(hash);
         });
       });
     },
     comparePassword: function(plainPass, hashPass, callback) {
        bcrypt.compare(plainPass, hashPass, function(err, isPasswordMatch) { 
            if(err) throw err;
            
            callback(isPasswordMatch);
        });
     },
     getJwt: function(){
        return jwt.sign({
            admin: false 
        }, this.jwtSecret, {
            expiresIn: "1d" // expires in 24 hours
        });
     },
     verifyJwt: function(token){
        // verifies secret and checks exp
        return jwt.verify(token, this.jwtSecret, function(err, decoded) {
            if (err) return null;
            
            return decoded;
        });
     }
};