const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


require('../db/connection');
const User = require("../models/userSchema");
const Restaurant = require("../models/restaurantSchema");

//Middleware
const middleware = (req, res, next)=>{
    console.log(`Hello middleware`);
    next();
}

router.get("/", (req, res)=>{
    res.send("My app");
});

router.get("/account", (req, res)=>{
    res.send("My app");
});

router.get("/menu", (req, res)=>{
    res.send("My app");
});

router.get("/cart", (req, res)=>{
    res.send("My app");
});


router.get("/about", middleware, (req, res)=>{
    console.log(`Hello my about`);
    res.send("My app about");
});



router.get("/signin", async(req, res)=>{
    const{email, password } = req.body;

    if(!email || !password){
        return res.status(422).json({error: "Please fill the entries properly"});
    }

    try{
        const userExist = await User.findOne({email:email});

        if(!userExist){
            return res.status(400).json({error: "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, userExist.password);
        const token = await userExist.generateAuthToken();
        
        res.cookie("jwtoken", token, {
            expires:new Date(Date.now() + 180000000),
            httpOnly:true
        });


        if(!isMatch){
            return res.status(400).json({error: "Invalid credentials"});
        }
        else{
            res.json({message: "SignIn successful"});
        }

    }catch(err){
        console.log(err);
    }
});


//register using async await
router.post("/register", async(req, res)=>{
    const{name, email, mobile, password, confirm_password } = req.body;

    if( !name || !mobile || !email || !password || !confirm_password ){
        return res.status(422).json({error: "Please fill the entries properly"});
    }

    if( password!=confirm_password ){
        return res.status(422).json({error: "Password mismatch"});
    }

    try{
        const userExist = await User.findOne({email:email});
            if(userExist){
                return res.status(422).json({error: "User already exists"});
            }

            const user = new User({name, email, mobile, password, confirm_password});

            //hashing "password" and "confirm_password" before saving them to the database
            await user.save();

            res.status(201).json({message: "User registered successfully"});

        } catch(err){
            console.log(err);
        }    
});


router.get("/signin-restaurant", async(req, res)=>{
    const{email, password } = req.body;

    if(!email || !password){
        return res.status(422).json({error: "Please fill the entries properly"});
    }

    try{
        const restaurantExist = await Restaurant.findOne({email:email});

        if(!restaurantExist){
            return res.status(400).json({error: "Invalid credentials"});
        }

        const isMatch = bcrypt.compare(password, restaurantExist.password);
        const token = await userExist.generateAuthToken();

        res.cookie("jwtoken", token, {
            expires:new Date(Date.now() + 180000000),
            httpOnly:true
        });

        if(!isMatch){
            return res.status(400).json({error: "Invalid credentials"});
        }
        else{
            res.json({message: "SignIn successful"});
        }

    } catch(err){
        console.log(err);
    }
});


router.post("/register-restaurant", async(req, res)=>{
    const{name, mobile, email, password, confirm_password } = req.body;

    if( !name || !mobile || !email || !password || !confirm_password ){
        return res.status(422).json({error: "Please fill the entries properly"});
    }

    if( password!=confirm_password ){
        return res.status(422).json({error: "Password mismatch"});
    }

    try{
        const restaurantExist = await Restaurant.findOne({email:email});
            if(restaurantExist){
                return res.status(422).json({error: "User already exists"});
            }

            const restaurant = new Restaurant({name, mobile, email, password, confirm_password});
            
            //hashing password and confirm_password before saving them to the database
            await restaurant.save();

            res.status(201).json({message: "User registered successfully"});

        } catch(err){
            console.log(err);
        }    
});


module.exports = router
