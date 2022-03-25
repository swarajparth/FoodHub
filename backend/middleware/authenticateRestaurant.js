const jwt = require('jsonwebtoken');
const Restaurant = require("../models/restaurantSchema");

const authenticateRestaurant = async (req, res, next) => {
    try{
        const token = req.cookies.jwtoken2;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootRestaurant = await Restaurant.findOne({_id: verifyToken._id});
        if(!rootRestaurant){
            throw new Error('Restaurant not found');
        }
        
        req.token = token;
        req.rootRestaurant = rootRestaurant;
        req.restaurantID = rootRestaurant._id;

        next();
    }catch(err){
       
        res.status(401).send("Unauthorized: No token provided");
        console.log(err);
    }   
}

module.exports = authenticateRestaurant;