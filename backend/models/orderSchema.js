const mongoose = require('mongoose');

const orderSchema=new mongoose.Schema  ({
    //     {
    //     name: {
    //         type : String,
    //         required : true
    //     },
    //     order_time:{
    //         type: String,
    //         required: true
    //     },
    //     quantity: {
    //         type : Number,
    //         required: true
    //     },
    //     amount:{
    //         type: Number,
    //         required: true
    //     },
    //     user_email:{
    //         type: String,
    //         required: true
    //     },
    //     status:{
    //         type: String
    //     },
    //     description:{
    //         type: String
    //     },
    //     restaurant_email:{
    //         type: String
    //     }
    // },


    // user_email:{
    //     type: String,
    //     required: true
    // },
    // restaurant_email:{
    //     type: String,
    //     required: true
    // },
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
        default: "ordered"
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
    orderItems: []
    
},{timestamps: true});


//collection creation
const Order = mongoose.model("order",orderSchema);

module.exports = Order;