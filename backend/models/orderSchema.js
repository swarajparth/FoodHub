const mongoose = require('mongoose');

const orderSchema=new mongoose.Schema  ({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    restaurantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant'
    },
    total_amount:{
        type: Number,
        required: true
    },
    orderStatus:{
        type: String,
        default: "placed"
    },
    delivery_address:{
        address1: {
            type: String,
            required: true
        },
        address2: {
            type: String
        },
        city: {
            type: String,
            required: true
        },
        zip:{
            type: Number,
            required: true
        }
    },
    payment_mode:{
        type: String,
        required: true
    },
    orderItems: [],
    
    comment:{
        type: String
    }
    
},{timestamps: true});


//collection creation
const Order = mongoose.model("order",orderSchema);

module.exports = Order;