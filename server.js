const {createServer} = require('http');
const express = require('express');
const compression = require('compression');
const path = require('path');

// bodyParser: used to get json params from POST apis
const bodyParser = require('body-parser');
// morgan: logging
const morgan = require('morgan');
// dotenv: So node can read the .env file (heroku already can)
require('dotenv').config();
// db: a file which holds all sequelise code
var db = require('./db');
// auth: a file which holds all authentication code
var auth = require('./auth');
auth.jwtSecret = process.env.JWT_SECRET;

//Port definition, comes from .env file
const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 5000);

//Express definition function
const app = express();

// dev flag
const dev = app.get('env') !== 'production';
//Connect to DB with sequelize. First param true for schema sync
db.connect(true);

if(!dev) {
    //If production build
    console.log('BBV2 - PRODUCTION');
    
    //Defends against malicious attacks (by not saying what is powering the app)
    app.disable('x-powered-by');
    //Does some file compression
    app.use(compression());
    //Logs common activity (requests etc) but does not log errors as thoroughly
    app.use(morgan('common'));
} else {
    //If dev build 
    console.log('BBV2 - DEVELOPMENT');

    //Heavier logging in dev mode
    app.use(morgan('dev'));    
}

//API endpoints

app.use(bodyParser.json()) //Used to extract params from posts
// **************************************************
// The only endpoint allowed ABOVE the JWT middleware
// **************************************************
.post('/api/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    db.models.user.findOne({ 
        where: { username: username }
    }).then(z => {
        if(z){
            auth.comparePassword(password, z.password, function(isMatch) {
                if(isMatch) {
                    var token = auth.getJwt();

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                } else {
                    //Invalid password
                    res.json({
                        success: false,
                        msg: "Invalid username or password"
                    });
                }
            });
        } else {
            //Invalid username
            res.json({
                success: false,
                msg: "Invalid username or password"
            });
        }
    });
})
// **************************************************
// JWT middleware. Every request must check JWT token
// **************************************************
.use(function(req, res, next){
    // check header or post parameters for token
    var token = req.body.token || req.headers['x-access-token'];

    if (token) {
        // decode token
        var decodedJwt = auth.verifyJwt(token);

        if(decodedJwt) {
            // if token is good, save to request for use in other routes
            req.decodedJwt = decodedJwt;    
            next();
        } else{
            res.json({ 
                success: false, 
                message: 'Failed to authenticate token.'
            });
        }
    } else {
        // if there is no token return an error
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
    }
})
.post('/api/getallbounty', function (req, res) {
    db.models.bounty.findAll().then(z => {
        res.send(z);
    });
});


//Any requests we don't recognise, go to default page
app.use(express.static(path.resolve(__dirname, 'build')));
//All requests are going to be handled by node. Send index by default.
app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

//require('http') has this createServer fn
const server = createServer(app);

server.listen(PORT, err => {
    if(err) throw err;

    console.log('BBV2 server has started on port ' + PORT)
});