const cartitems=require("../model/cartSchema")

exports.add=async(req,res)=>{
    console.log("inside adding to cart")
    const {title,cover,userId,productId,price}=req.body
    console.log(`${title}`)
    try {

        const existing=await cartitems.findOne({userId,productId})
        if(existing){
            res.status(406).json("existing product")
            console.log("nop")
        }
        else{
            
            const newcartitems=await cartitems({title,cover,price,userId,productId,quantity:1,total:price})
            await newcartitems.save()
            res.status(200).json("added to cart")
            console.log("hi")

        }
        
    } catch (error) {
        res.status(400).json("something went wrong"+error)
        console.log("hi")

        
    }

}
exports.get=async(req,res)=>{
    console.log("inside fetchging cart")
    try {
        const result=await cartitems.find()
        console.log(result)
        if(result){
            res.status(200).json(result)

        }
        else{
            res.status(406).json("fetching failed")
        }
        
    } catch (error) {
        res.status(400).json("something went wrong" + error)
        
    }

}
exports.removefromcart=async(req,res)=>{
    console.log("inside removing from cart")
    const {id}=req.params

    try {
        const result =await cartitems.findByIdAndDelete({_id:id})
        console.log(result)
        if(result){
            res.status(200).json(result)
        }
        else{
            res.status(406).json("deletion failed")
        }
        
    } catch (error) {
        res.status(400).json("something went wrong" +error)
        
    }
}

exports.increment=async(req,res)=>{
    console.log("inside incrementing function")
    const {id}=req.params
    const{quantity,price}=req.body
    

    try {
        const result=await cartitems.findByIdAndUpdate({_id:id}) 
        console.log(result)
        result.quantity+=1
        result.total=price * result.quantity
        console.log(result.total)
        await result.save()
        if(result){
            res.status(200).json(result)
        }    
        else{
            res.status(406).json("incrementation failed")

        }
    } catch (error) {
        
        res.status(400).json("something went wrong"+error)
    }
}
exports.decrement=async(req,res)=>{
    console.log("inside decrementing function")
    const {id}=req.params
    const{quantity}=req.body
    if(quantity<2){   
    try {
        const result=await cartitems.findByIdAndDelete({_id:id})    
        if(result){
            res.status(200).json(result)
        }    
        else{
            res.status(406).json("decrementation failed")

        }
    } catch (error) {
        
        res.status(400).json("something went wrong"+error)
    }
    }
    else{
        console.log("greater than 1")
        try {
            const result=await cartitems.findByIdAndUpdate({_id:id})    
            console.log(result)
            result.quantity--
            console.log(result.quantity)
            result.total=result.price * result.quantity
            console.log(result)
            await result.save()
            if(result){
                res.status(200).json(result)
            }    
            else{
                res.status(406).json("decrementation failed")
    
            }
        } catch (error) {
            
            res.status(400).json("something went wrong"+error)
        }
    }

   
}

exports.totalquantity=async(req,res)=>{
    console.log("inside fetching total quantity")
    try {
        const result=await cartitems.find()
        // console.log(length(result))
        const totalQuantity = result.reduce((sum, item) => sum + item.quantity, 0);
        console.log("Total Quantity:", totalQuantity);
        
        res.status(200).json(totalQuantity)
        
    } catch (error) {
        
    }


}
exports.totalprice=async(req,res)=>{
    console.log("inside fetching total price")
    try {
        const result=await cartitems.find()
        // console.log(result)
        const totalprice = result.reduce((sum, item) => sum + item.total, 0);
        console.log("Totalprice:", this.totalprice);
        
        res.status(200).json(totalprice)
        
    } catch (error) {
        console.log("something went wrong "+error)
        
    }
}
exports.clearcart=async(req,res)=>{
    console.log("inside clearing cart")
    const {id}=req.params
    console.log(`${id}`)
    try {
        const result= await cartitems.deleteMany({userId:id})
        console.log(result)
        if(result){
            res.status(200).json(result)
        }
        else{
            res.status(406).json("failed deleting items in cart")
        }
    } catch (error) {
        res.status(400).json("something went wrong " +error)
        
    }
}