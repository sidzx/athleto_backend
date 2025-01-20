const mongoose=require('mongoose')
const validators=require('validator')
const userSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    sname:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate:[validators.isEmail,"Invalid Email"]
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
    state:{
        type:String
    },
    city:{
        type:String
    },
    housenumber:{
        type:String
    },
    landmark:{
        type:String
    },
    pincode:{
        type:String
    },
    area:{
        type:String
    }
})

const users=mongoose.model("users",userSchema)
module.exports=users