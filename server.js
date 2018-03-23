// *** Dependencies ***

const {createServer} = require('http');
const express = require('express');
const compression = require('compression');
const path = require('path');
 
const bodyParser = require('body-parser'); // bodyParser: used to get json params from POST apis
const morgan = require('morgan'); // morgan: logging

require('dotenv').config(); // dotenv: So node can read the .env file (heroku already can)

// *** Initialisation ***
const app = express();
const dev = app.get('env') !== 'production';

// Custom external files
var mongo = require('./mongo'); // the db file which holds all mongo code
mongo.isDev = dev; // let mongo know if we are in dev (for logging purposes)
mongo.log('APPLICATION', 'MongoDB Successfully Connected');

var auth = require('./auth'); // auth: a file which holds all authentication code
auth.jwtSecret = process.env.JWT_SECRET; //Set auth jwtSecret to the one in the env file

if(!dev) {
    console.log('BBV2 - PRODUCTION');
    
    app.disable('x-powered-by'); //Defends against malicious attacks (by not saying what is powering the app)
    app.use(compression()); //Does some file compression
    app.use(morgan('common')); //Logs common activity (requests etc) but does not log errors as thoroughly
} else {
    console.log('BBV2 - DEVELOPMENT');

    app.use(morgan('dev'));  //Heavier logging in dev mode  
}

// *** API Endpoints ***

// Quick error json response function
const jsonErr = function(res, msg, serverMsg) {
    mongo.log('ERROR', msg, serverMsg);
    
    res.json({
        success: false,
        message: msg
    });
};

//Any requests we don't recognise, go to default page
app.use(express.static(path.resolve(__dirname, 'build')));

//All requests are going to be handled by this function first
app.use('*', (req, res, next) => {
    // If the request URL begins with /api/ it is not a page/navigation request. It is a post for JSON data.
    // The next() will send the request down this file to the next applicable endpoint.
    // All other requests redirect to index. The client side browserrouter handles nav for SPA
    req.baseUrl.startsWith('/api/')
        ? next()
        : res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.use(bodyParser.json()) //Used to extract params from posts

// ***********************************************************************
// Endpoints below are above the JWT middleware and DO NOT require JWT
// ***********************************************************************
.post('/api/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    mongo.findOne('users', {
        where: { username: username }
    }, dbUser => {
        if(dbUser) {
            auth.comparePassword(password, dbUser.password, function(isMatch) {
                if(isMatch) {
                    var token = auth.getJwt();

                    // return the token as JSON
                    res.json({
                        token: token,
                        username: dbUser.username,
                        firstName: dbUser.firstName,
                        lastName: dbUser.firstName
                    });
                } else {
                    //Invalid password
                    jsonErr(res, "Invalid username or password.", "Invalid password for username: " + dbUser.username);
                }
            });
        } else {
            //Invalid username
            jsonErr(res, "Invalid username or password.", "Invalid username: " + username);
        }
    });
})
.post('/api/getallbounty', function (req, res) {
    mongo.find('bounty', {}, data => {
        res.send(data);
    });
})
// ***************************************************************
// JWT middleware. All requests below this point will require JWT
// ****************************************************************
.use(function(req, res, next){
    // check header or post parameters for token
    var token = req.body.token || req.headers['bb-jwt'];

    if (token) {
        // decode token
        var decodedJwt = auth.verifyJwt(token);

        if(decodedJwt) {
            // if token is good, save to request for use in other routes
            req.decodedJwt = decodedJwt;    
            next();
        } else{
            jsonErr(res, 'Failed to authenticate token.');
        }
    } else {
        // if there is no token return an error
        jsonErr(res, 'No token provided.');
    }
})
.post('/api/getstarredbounty', function(req, res){
    var lol = decodedJwt;
    //LH: attempt to use decodedJwt 
});

//Port definition, comes from .env file
const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 5000);

//require('http') has this createServer fn
const server = createServer(app);

server.listen(PORT, err => {
    if(err) throw err;

    console.log('BBV2 server has started on port ' + PORT)
});