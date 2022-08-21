const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
require('./config/view-helpers')(app);
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
// not using the passportGoogle strategy due to safety concerns regarding credentials
// const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port : 5000');

if(env.name == 'development'){
    app.use(sassMiddleware({
        src: path.join(__dirname, env.asset_path, 'scss'),
        dest: path.join(__dirname, env.asset_path, 'css'),
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }));
}

app.use(express.urlencoded());

app.use(cookieParser());

app.use(expressLayouts);

// extract styles and scripts from subpages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts',true);

app.use(express.static(env.asset_path));

// make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode, env.morgan.options));

// set up the view engine
app.set('view engine','ejs');
app.set('views', './views');

// mongo store is used to store session cookie in the db 
app.use(session({
    name: 'z-social',
    // TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store : MongoStore.create(
        {
            mongoUrl: mongoose.connection._connectionString,
            mongoOptions: {
                useNewUrlParser: true, 
                useUnifiedTopology: true,
                family: 4,
              },
            mongooseConnection: db,
            autoRemove: 'disabled'
        }, 
        function(err){
            console.log(err || 'connect mongo-db setup ok')
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`error in creating the server ${err}`);
        return;
    }
    
    console.log(`Server is up and running on port : ${port}`);
});