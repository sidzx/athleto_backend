const mongoose=require("mongoose")
const wishlistSchema=new mongoose.Schema({

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
    }
})

const wishlists=mongoose.model("wishlists",wishlistSchema)
module.exports=wishlists