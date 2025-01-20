const jwt=require('jsonwebtoken')

const jwtmiddleware=async(req,res,next)=>{
    console.log("inside jwt")
    console.log(req.headers)
    try {
        const token=req.headers.authorization.split(" ")[1]
        console.log(token)
        const result=jwt.verify(token,"yes")
        console.log(result)
        req.payload=result.userId
        next()
    } catch (error) {
        res.status(400).json("Authorization Failed....login first"+error)
        
    }

}
module.exports=jwtmiddleware