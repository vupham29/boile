// Packages
require('dotenv').config({path: '.env'});
const express = require('express');
const path = require("path");
const bodyParser = require("body-parser");
const uaParser = require('ua-parser-js');

// Routing
const homeRoutes = require('./routes/home');
const errorRoutes = require('./routes/404');

const app = express();

// set views engine
app.set('view engine', 'pug');

// parse incoming data request
app.use(bodyParser.urlencoded({extended: false}));

// load static file
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    const ua = uaParser(req.header['user-agent']);
    app.locals.isDesktop = ua.device.type === undefined;
    app.locals.isTablet = ua.device.type === 'tablet';
    app.locals.isMobile = ua.device.type === 'mobile';

    app.locals.preloader = {
        title: 'ExpressJS boiler plate \n Author: VuPham'
    };
    next();
});

// Home Page
app.use(homeRoutes);

// Not found page
app.use(errorRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});