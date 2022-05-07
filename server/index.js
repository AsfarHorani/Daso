const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require("cors");
const userRoutes = require("./routes/user");


app.use(express.json());
app.use(cors());
app.use(userRoutes);
app.use((error, req, res, next) => {
  console.log('from error middleware', error);
  const status = error.statusCode || 500;
  const message = error.message || "Something went wrong";
  res.status(status).json({
    message: message
  })
})

mongoose.connect(process.env.DB_URL)
  .then(result => {
    app.listen(8080);
    console.log("connected")
  }).catch(err => console.log(err))
