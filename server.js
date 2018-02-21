const {createServer} = require('http');
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
//So node can read the .env file (heroku already can)
require('dotenv').config();

var db = require('./db');

//Port definition, comes from .env file
const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 5000);

//Express definition function
const app = express();
const dev = app.get('env') !== 'production';

//Connect to DB with sequelize
db.connect();
if(dev) {
    db.sync({
        logging: console.log,
        alter: false, // will alter the table if feasible
        force: false // will drop the table if it already exists
    });
}

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

//API endpoints (must be above the app.use below)
app.get('/api/getallbounty', function (req, res) {
    db.models.bounty.findAll().then(bounty => {
    console.log(bounty);
    res.send({ express: bounty });
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