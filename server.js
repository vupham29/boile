// Packages
require('dotenv').config({path: '.env'});
const express = require('express');
const path = require("path");
const bodyParser = require("body-parser");
const {address} = require("ip");

// Routing
const homeRoutes = require('./routes/home');
const errorRoutes = require('./routes/404');

const app = express();

// set views engine
app.set('view engine', 'ejs');

// parse incoming data request
app.use(bodyParser.urlencoded({extended: false}));

// load static file
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    // page title
    app.locals.pageTitle = 'Pages Template';

    // preloader
    app.locals.preloader = {
        title: 'Boile Template'
    };

    next();
});

// home Page
app.use(homeRoutes);

// Not found page
app.use(errorRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT} - http://${address()}:${process.env.PORT}`);
});