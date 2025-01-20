const mongoose=require("mongoose")
const wishlists = require("./wishlistSchema")
const cartSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true

    },
    cover:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    productId:{
        type:String,
        required:true
    },
    quantity:{
        type:Number
        
    },
    total:{
        type:Number
        
    }
})

const cartitems=mongoose.model("cartitems",cartSchema)
module.exports=cartitems