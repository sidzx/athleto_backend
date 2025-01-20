const wishlists=require("../model/wishlistSchema")
const jwt=require("../middleware/jwtMiddleware")

exports.add=async(req,res)=>{
    console.log("inside adding to wishlist")
    const {title,userId,price,productId,cover}=req.body
    // const cover=req.file.filename
    console.log(`${userId}`,`${cover}`)
    try {

        const result=await wishlists.findOne({productId,userId})
        console.log(result)
        if(result){
            res.status(406).json("existing ")
        }
        else{
            const newwishlist=await wishlists({title,userId,productId,cover,price})
            await newwishlist.save()
            console.log("hi")
            res.status(200).json("added to wishlist")
        }
        
    } catch (error) {

        res.status(400).json("something went wrong "+error)
        
    }
}
exports.get=async(req,res)=>{
    console.log("inside fetching wishlist")
    const {userId}=req.params
    console.log(userId)
    try {
        const result = await wishlists.find({userId:userId})
        console.log(result)
        if(result){
            res.status(200).json(result)
        }
        else{
            res.status(406).json("no products in wishlist")
        }
        
    } catch (error) {
        res.status(400).json("something went wrong" +error)
        
    }

}

exports.remove=async(req,res)=>{
    console.log("inside deleting")
    const {id}=req.params
    try {
        const result=await wishlists.deleteOne({_id:id})
        if(result){
            res.status(200).json("deleted succesfully")
        }
        else{
            res.status(406).json("deletion failed")
        }
        
    } catch (error) {
        res.status(400).json("soemthing went wrong"+error)
        
    }
}