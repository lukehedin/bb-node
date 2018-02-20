const {createServer} = require('http');
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

//Port definition, comes from .env file
const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 5000);

//Express definition function
const app = express();
const dev = app.get('env') !== 'production';

if(!dev) {
    //If production build
    
    //Defends against malicious attacks (by not saying what is powering the app)
    app.disable('x-powered-by');
    //Handles compression for us
    app.use(compression());
    //Logs common activity (requests etc) but does not log errors as thoroughly
    app.use(morgan('common'));

    //Any requests we don't recognise, go to default page
    app.use(express.static(path.resolve(__dirname, 'build')));
    //All requests are going to be handled by node. Send index by default.
    app.use('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
} else {
    //If dev build 

    //Heavier logging in dev mode
    app.use(morgan('dev'));    
}

//require('http') has this createServer fn
const server = createServer(app);

server.listen(PORT, err => {
    if(err) throw err;

    console.log('BBV2 server has started!')
});