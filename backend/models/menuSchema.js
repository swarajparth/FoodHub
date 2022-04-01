const mongoose = require('mongoose');

const menuSchema=new mongoose.Schema  ({
    name : {
        type : String,
        required : true
    },
    price: {
        type: Number,
        required: true
    },
    status:{
        type: String,
        required:true
    },
    restaurant_email:{
        type: String,
        required: true
    }
})


//collection creation
const Menu = mongoose.model("menu",menuSchema);

module.exports = Menu;