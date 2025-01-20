const mongoose=require('mongoose')
const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true

    },
    cover:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true  
    },
    id:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})

const products=mongoose.model("products",productSchema)
module.exports=products