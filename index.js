// Packages
require("dotenv").config({ path: ".env" });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { address } = require("ip");

// routing
const homeRoute = require("./routes/home");
const notFoundRoute = require("./routes/notFound");
const errorRoute = require("./routes/404");

const app = express();

// set views engine
app.set("view engine", "ejs");
app.set("views", "views");

// parse incoming data request
app.use(bodyParser.urlencoded({ extended: false }));

// load static file
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  // page title
  app.locals.pageTitle = "Pages Template";
  next();
});

// home
app.use(homeRoute);

// not found page
app.use(notFoundRoute);

// handle 404
app.use(errorRoute);

app.listen(process.env.PORT, () => {
  console.log(
    `Example app listening at http://localhost:${process.env.PORT} - http://${address()}:${process.env.PORT}`,
  );
});
