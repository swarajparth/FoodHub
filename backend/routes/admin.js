const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');


require('../db/connection');
const User = require("../models/userSchema");
const Restaurant = require("../models/restaurantSchema");
const Order = require("../models/orderSchema");
const Menu = require("../models/menuSchema");
const authenticate = require('../middleware/authenticate');
const authenticateRestaurant = require('../middleware/authenticateRestaurant');

router.post("/api/placeOrder", async (req, res) =>{
    const {userId, restaurantId, total_amount, delivery_address, payment_mode, orderItems} = req.body;

    try{
        const order = new Order({userId, restaurantId, total_amount, delivery_address, payment_mode, orderItems});
        await order.save();

        res.send(order);
        console.log("Order placed successfully");
    }
    catch(err){
        res.status(401).send("Could not place order");
        console.log(err);
    }
});


router.post("/api/user-current-orders", async (req, res)=>{
    const {userId} = req.body;
    try{
        const userCurrentOrders = await Order.find({userId , orderStatus: "placed"}).populate('restaurantId').sort({updatedAt:-1});
        
        if(!userCurrentOrders){
            throw new Error('Current orders not available');
        }
        
        res.send(userCurrentOrders);
        console.log(`Current orders fetched successfully.`);
    }
    catch(err){
        res.status(401).send("Unauthorized: Unknown error");
        console.log(err);
    }
});


router.post("/api/user-previous-orders", async (req, res)=>{
    const {userId} = req.body;
    try{
        const userPreviousOrders = await Order.find({userId , orderStatus: "closed"}).populate('restaurantId').sort({updatedAt:-1});
        
        if(!userPreviousOrders){
            throw new Error('Previous orders not available');
        }
        
        res.send(userPreviousOrders);
        console.log(`Previous orders fetched successfully.`);
    }
    catch(err){
        res.status(401).send("Unauthorized: Unknown error");
        console.log(err);
    }
});


router.post("/api/restaurant-current-orders", async (req, res)=>{
    const {restaurantId} = req.body;
    try{
        const restaurantNewOrders = await Order.find({restaurantId , orderStatus: "placed"}).populate('userId').sort({updatedAt:-1});
        
        if(!restaurantNewOrders){
            throw new Error('New orders not available');
        }
        
        res.send(restaurantNewOrders);
        console.log(`New orders fetched successfully.`);
    }
    catch(err){
        res.status(401).send("Unauthorized: Unknown error");
        console.log(err);
    }
});


router.post("/api/restaurant-previous-orders", async (req, res)=>{
    const {restaurantId} = req.body;
    try{
        const restaurantAcceptedOrders = await Order.find({restaurantId , orderStatus: "closed"}).populate('userId').sort({updatedAt:-1});
        
        if(!restaurantAcceptedOrders){
            throw new Error('Accepted orders not available');
        }
        
        res.send(restaurantAcceptedOrders);
        console.log(`Accepted orders fetched successfully.`);
    }
    catch(err){
        res.status(401).send("Unauthorized: Unknown error");
        console.log(err);
    }
});


router.post("/api/restaurantDetails", async (req, res)=>{
    try{
        const rootRestaurant = await Restaurant.findOne({_id: req.body.id});
        res.send(rootRestaurant);
        console.log(`Restaurant details fetched successfully.`);
    }
    catch(err){
        res.status(401).send("Technical error");
        console.log(err);
    }
});


router.get("/api/restaurants", async (req, res)=>{
    try{
        const restaurant = await Restaurant.find();
        if(!restaurant){
            throw new Error('No restaurant has been registered');
        }
        
        res.send(restaurant);
        console.log(`Restaurant list fetched successfully.`);
    }
    catch(err){
        res.status(401).send("Unauthorized: Unknown error");
        console.log(err);
    }
});

router.get("/api/get-user-data", authenticate, (req, res)=>{
    console.log(`Authenticated`);
    res.send(req.rootUser);
});


router.get("/api/menu/:id", async (req, res)=>{
    try{
        const rootRestaurant = await Restaurant.findOne({_id: req.params.id});
        const menu = await Menu.find({restaurant_email: rootRestaurant.email, status: "Available"});
        if(!menu){
            throw new Error('No dishes to show');
        }
        
        res.send(menu);
        console.log(`Menu list fetched successfully.`);
    }
    catch(err){
        res.status(401).send("Unauthorized: Unknown error");
        console.log(err);
    }
});


router.get("/api/restaurantprofile/:id", async (req, res)=>{
    try{
        const rootRestaurant = await Restaurant.findOne({_id: req.params.id});
        const menu = await Menu.find({restaurant_email: rootRestaurant.email});
        const order = await Order.find({restaurant_email: rootRestaurant.email});
        
        res.send({rootRestaurant, menu, order});
    }
    catch(err){
        res.status(404).send("Restaurant not found");
        console.log(err);
    }
})


router.get("/api/account", authenticate, (req, res)=>{
    console.log(`Authenticated`);
    res.send(req.rootUser);
})

router.get("/api/account-restaurant", authenticateRestaurant, async (req, res)=>{
    try{
        const data = req.rootRestaurant;
        const menu = await Menu.find({restaurant_email: data.email});
        
        res.send({data, menu});
        console.log(`Authenticated`);
    }
    catch(err){
        res.status(401).send("Unauthorized: Unknown error");
        console.log(err);
    }
})


router.post("/api/update-menu", async(req, res)=>{
    const{name, price, status, restaurant_email } = req.body;

    if( !name || !price || !status ){
        return res.status(422).json({error: "Please fill the entries properly"});
    }

    try{
        const dishExist = await Menu.findOne({name, restaurant_email});
        
        if(dishExist){
            await Menu.updateOne({_id: dishExist._id}, {
                $set: {name, price, status}
            });

            return res.status(201).json({message: "Dish updated"});
        }

        const dish = new Menu({name, price, status, restaurant_email});

        await dish.save();

        res.status(201).json({message: "Dish added to menu"});

        } catch(err){
            console.log(err);
        }    
});


router.post("/api/update-account-restaurant", async(req, res)=>{
    const{name, mobile, address, email, _id } = req.body;

    if( !name || !mobile || !email || !address ){
        return res.status(422).json({error: "Please fill the entries properly"});
    }

    try{
        const restaurant = await Restaurant.updateOne({_id}, {
            $set: {name, mobile, email, address}
        });

        res.status(201).json({message: "Restaurant profile updated successfully"});

        } catch(err){
            console.log(err);
        }    
});


router.post("/api/update-account", async(req, res)=>{
    const{name, mobile, address, email, _id } = req.body;

    if( !name || !mobile || !email || !address ){
        return res.status(422).json({error: "Please fill the entries properly"});
    }

    try{
        const user = await User.updateOne({_id}, {
            $set: {name, mobile, email, address}
        });

        res.status(201).json({message: "User profile updated successfully"});

        } catch(err){
            console.log(err);
        }    
});



router.post("/api/order-received", async(req, res)=>{
    const {orderId} = req.body;
    try{
        const user = await Order.updateOne({_id: orderId}, {
            $set: {orderStatus: "closed"}
        });

        if(!user){
            res.status(400).json({error: "Order could not be closed"})
        }
        res.status(201).json({message: "Order closed successfully"});

        } catch(err){
            console.log(err);
        }    
});


router.post("/api/orders", authenticateRestaurant, (req, res)=>{
    console.log(`Authenticated`);
    res.send(req.rootRestaurant);
})


router.post("/api/signin", async(req, res)=>{
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
router.post("/api/register", async(req, res)=>{
    const{name, email, address, mobile, password, confirm_password } = req.body;
    
    if( !name || !mobile || !address || !email || !password || !confirm_password ){
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

            const user = new User({name, email, address, mobile, password, confirm_password});

            //hashing "password" and "confirm_password" before saving them to the database
            await user.save();
            
            res.status(201).json({message: "User registered successfully"});
            
        } catch(err){
            console.log(err);
        }    
    });
    
    
router.post("/api/signin-restaurant", async(req, res)=>{
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
        const token = await restaurantExist.generateAuthToken();
        
        res.cookie("jwtoken2", token, {
            expires:new Date(Date.now() + 450000000),
            httpOnly:true
        });
        
        if(!isMatch){
            return res.status(400).json({error: "Invalid credentials"});
        }
        else{
            res.json({message: "Restaurant SignIn successful"});
        }

    } catch(err){
        console.log(err);
    }
});


router.post("/api/register-restaurant", async(req, res)=>{
    const{name, mobile, address, email, password, confirm_password } = req.body;
    
    if( !name || !mobile || !email || !address || !password || !confirm_password ){
        return res.status(422).json({error: "Please fill the entries properly"});
    }
    
    if( password!=confirm_password ){
        return res.status(422).json({error: "Password mismatch"});
    }
    
    try{
        const restaurantExist = await Restaurant.findOne({email:email});
            if(restaurantExist){
                return res.status(422).json({error: "Restaurant already exists"});
            }
            
            const restaurant = new Restaurant({name, mobile, address, email, password, confirm_password});
            
            //hashing password and confirm_password before saving them to the database
            await restaurant.save();

            res.status(201).json({message: "Restaurant registered successfully"});

        } catch(err){
            console.log(err);
        }    
});


router.get("/api/signout", (req, res)=>{
    res.clearCookie('jwtoken', {path:'/'});
    console.log(`Signed out successfully.`);
    res.status(200).send("User signed out successfully.");
})

router.get("/api/signout-restaurant", (req, res)=>{
    res.clearCookie('jwtoken2', {path:'/'});
    console.log(`Signed out successfully.`);
    res.status(200).send("Restaurant signed out successfully.");
})


module.exports = router