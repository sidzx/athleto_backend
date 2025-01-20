const users=require('../model/userSchema')
const jwt=require("jsonwebtoken")

exports.signup=async(req,res)=>{
    console.log("inside signup function")
    const {fname,sname,phone,email,password}=req.body
    console.log(`${fname}`)
    try{
        const existingUser=await users.findOne({email})
        if(existingUser){
            res.status(406).json("Existing User")
        }
        else{
            const newUser=await users({fname,sname,email,password,phone})
            await newUser.save()
            res.status(200).json("Sign up successfull")
        }
    }
    catch(err){
        res.status(400).json("something went wrong"+err)
    }
}
exports.login=async(req,res)=>{
    console.log("inside login function")
    const {email,password}=req.body
    try {
        const existingUser=await users.findOne({email,password})
        if(existingUser && existingUser.isAdmin===true)
            {
            const token=jwt.sign({userId:existingUser._id},"yes")
            res.status(200).json({existingUser,role:"Admin",token})}
        else if(existingUser && existingUser.isAdmin===false){
            const token=jwt.sign({userId:existingUser._id},"yes")
            res.status(200).json({existingUser,role:"User",token})
        }
        else{
            res.status(406).json("user not found")
        }
        
    } catch (error) {
        res.status(400).json("something went wrong"+error)
        }
    }

exports.viewUsers=async(req,res)=>{
    console.log("inside view users")
    try {
        const result=await users.find()
        if(result){
            res.status(200).json(result)
        }
        else{
            res.status(404).json("no users")
        }
    } catch (error) {
        res.status(400).json("something went wrong "+error)
        
    }

}

exports.verifymail=async(req,res)=>{
    console.log("inside verify email")
    const {email}=req.body
    console.log(`${email}`)
    try {
        const result=await users.findOne({email})
        if(result){
            res.status(200).json(result)
        }
        else{
            res.status(406).json("no user")
        }
        
    } catch (error) {
        res.status(400).json("something went wrong" +error)
        
    }
}

exports.resetpw=async(req,res)=>{
    console.log("inside edit passowrd")
    const {password}=req.body
    console.log(`${password}`)
    const {id}=req.params
    console.log(`${id}`)
    try{
        const existingUser=await users.findByIdAndUpdate({_id:id},{password}) 
        if(existingUser){
            console.log(existingUser)
            res.status(200).json(existingUser)
        }
        else
        {
            res.status(406).json("id not found")
        }

        
    }
    catch(error){
        res.status(400).json("something went wrong")

    }

}

exports.details=async(req,res)=>{
    console.log("fetching details")
    const {id}=req.params
    console.log(`${id}`)
    try {
        const result=await users.findOne({_id:id})
        if(result){
            res.status(200).json(result)
        }
        else{
            res.status(406).json("wrong id")
        }

        
    } catch (error) {
        res.status(400).json('something went wrong')
        
    }
}
exports.update=async(req,res)=>{
    console.log("inside updating")
    const {id}=req.params
    const {fname,sname,phone,email,password}=req.body
    console.log(`${fname}`,`${id}`)
    try{
        const result=await users.findByIdAndUpdate({_id:id},{fname,sname,email,password,phone})
        if(result){
            res.status(200).json(result)
        }
        else{
            res.status(406).json("updation failed")
            
        }
    }
    catch(err){
        res.status(400).json("something went wrong"+err)
    }
}
exports.address=async(req,res)=>{
    console.log("inside updating address")
    const {id}=req.params
    const {city,state,pincode,landmark,area,housenumber}=req.body
    console.log(`${pincode}`)

    try {
        const result=await users.findByIdAndUpdate({_id:id},{city,area,housenumber,landmark,state,pincode})
        console.log(result)
        if(result){
            res.status(200).json(result)
        }
        else{
            res.status(406).json("failed updation")
        }
    } catch (error) {
        res.status(400).json("something went wrong"+error)
        
    }
}