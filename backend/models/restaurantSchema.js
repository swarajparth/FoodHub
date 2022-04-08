const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const restaurantSchema=new mongoose.Schema  ({
    name : {
        type : String,
        required : true
    },
    address: {
        type: String,
        required: true
    },
    mobile:{
        type: Number,
        required: true
    },
    email : {
        type : String,
        required : true 
    },
    password:{
        type: String,
        required: true
    },
    confirm_password : {
        type : String,
        required : true
    },
    otp:{
        type: Number,
        default: 0
    }
})



//generating jwt token
restaurantSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}



//hashing the password
restaurantSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.confirm_password = await bcrypt.hash(this.confirm_password, 12);
    }
    next();
});


//collection creation
const Restaurant=mongoose.model("restaurant",restaurantSchema);

module.exports = Restaurant;