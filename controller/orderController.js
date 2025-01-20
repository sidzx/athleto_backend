const orders=require("../model/orderSchema")

exports.add=async(req,res)=>{
    console.log("inside adding orders")
    const {userId,paymentId,amount,status}=req.body
    console.log(`${amount}`)
    try {
        const alreadyordered= await orders.findOne({paymentId:paymentId})
        if(alreadyordered){
            res.status(406).json("already orderd")

        }
        else{
            const neworders=await orders({userId,paymentId,amount,status})
            await neworders.save()
            res.status(200).json("added to orders")

        }
        
    } catch (error) {
        res.status(400).json("something went wrong "+error)
        
    }
}

exports.fetchorders=async(req,res)=>{
    console.log("inside fetching orders")
    try {
        const result= await orders.find()
        if(result){
            res.status(200).json(result)
        }
        else{
            res.status(406).json("fetching failed")
        }
        
    } catch (error) {
        res.status(400).json("something wen wrong" + error)
        
    }
}