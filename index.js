const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(expressLayouts);

// extract styles and scripts from subpages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts',true);

app.use(express.static('./assets'));

// use express router
app.use('/', require('./routes'));

// set up the view engine
app.set('view engine','ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log(`error in creating the server ${err}`);
        return;
    }
    
    console.log(`Server is up and running on port : ${port}`);
});