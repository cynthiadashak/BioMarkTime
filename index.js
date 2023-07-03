const express = require("express");
const websocket = require("ws");
const mongoose = require("mongoose");

const env = require("./config/env");
const app = express();
const http = require("http").createServer(app);

mongoose
  .connect(env.DB_URI)
  .then(() => {
    app.set("view engine", "ejs");
    app.use(express.static("public"));

    app.use('/', require('./routes/auth.route'))

    app.get("*", (req, res) => {
      res.send("404 Page not found");
    });


    app.listen(env.APP_PORT || 5000, ()=>{
      console.log("server running")
    });
    
  })
  .catch((e) => console.log(e));


