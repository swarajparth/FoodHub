const dotenv = require("dotenv");
const express = require("express");
const app = express();
const port = 80||process.env.PORT;
const mongoose = require('mongoose');


dotenv.config({path: './config.env'});

require('./db/connection');
const User = require('./models/userSchema');


//linking our router files to make routing easy
app.use(express.json());
app.use(require('./routes/admin'));


app.listen(port, ()=>{
    console.log(`port started at ${port}`);
})