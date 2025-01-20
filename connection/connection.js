const mongoose=require("mongoose")
const connectString=process.env.DATABASE

mongoose.connect(connectString).then((res)=>{
    console.log("mongodb connected succesfully")
}).catch((res)=>{
    console.log("connection failed")
})