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
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use((error, req, res, next) => {
  
  const status = error.statusCode || 500;
  const message = error.message || "Something went wrong";
  res.status(status).json({
    message: message
  })
})

mongoose.connect(process.env.DB_URL)
  .then(result => {
   const server = app.listen(8080);
    const io= require("./socket").init(server);
    io.on('connection',socket=>{
    console.log("client connected")
    }); 
    console.log("connected")
  }).catch(err => console.log(err))
