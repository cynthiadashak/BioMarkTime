const express = require("express");
const compression = require('compression');
const sequelize = require('./config/db');
const flash = require('connect-flash')
const session = require('express-session');


const env = require("./config/env");
const logger = require('./utils/logger');

const app = express();

// Connect to the database
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');

    // Set up the app
    app.set("view engine", "ejs");
    app.use(express.static("public"));
    app.use(express.urlencoded({ extended: true }));
    app.use(compression());
    app.use(flash())
    app.use(
      session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false,
      })
    );
    app.use('/', require('./routes/auth.route'));
    app.use('/', require('./routes/scan.route'));

    app.get("*", (req, res) => {
      res.send("404 Page not found");
    });

    // Start the server
    const port = env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
