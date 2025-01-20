const mongoose=require("mongoose")

const orderSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true

    },
    paymentId:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    }

})

const orders=mongoose.model("orders",orderSchema)
module.exports=orders