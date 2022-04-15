const dotenv = require("dotenv");
const express = require("express");
const app = express();
const port = 7000||process.env.PORT;
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");

app.use(cookieParser());

//dotenv is a zero-dependency module that loads 
//environment variables from a . env file into process.env
dotenv.config({path: './config.env'});

require('./db/connection');
const User = require('./models/userSchema');
const Restaurant = require('./models/restaurantSchema');
const Menu = require('./models/menuSchema');
const Order = require('./models/orderSchema');

//linking our router files to make routing easy
app.use(express.json());
app.use(require('./routes/admin'));


// middlewares
app.use(express.json({ extended: false }));


app.listen(port, ()=>{
    console.log(`port started at ${port}`);
})