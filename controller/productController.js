const products=require("../model/productSchema")

exports.addProduct=async(req,res)=>{
    console.log("inside add product function")
    const {title,category,description,id,quantity,userId,price}=req.body
    const cover=req.file.filename
    console.log(cover)
    console.log(`${userId}`)
   
    console.log(cover)
    try{
        const existingProduct=await products.findOne({id})
        if(existingProduct){
            res.status(406).json("existing book")
        }
        else{
            const newProduct=await products({title,description,quantity,cover,id,category,userId,price})
            await newProduct.save()
            res.status(200).json("added successfully")
        }
    }
    catch(err){
        res.status(400).json("something went wrong"+err)
    }
}

exports.viewproduct=async(req,res)=>{
    console.log("inside view product")
   
    try {
        const existingProduct=await products.find()
        if(existingProduct){
            res.status(200).json(existingProduct)

        }
        else{
            res.status(402).json("no products found")
        }
        
    } catch (error) {
        res.status(400).json("something went wrong")
        
    }    
}
exports.getproduct=async(req,res)=>{
    console.log("inside get product")
    const {id}=req.params
    console.log(`${id}`)
   
    try {
        const existingProduct=await products.findOne({_id:id})
        if(existingProduct){
            res.status(200).json(existingProduct)

        }
        else{
            res.status(402).json("no products found")
        }
        
    } catch (error) {
        res.status(400).json("something went wrong")
        
    }    
}
exports.editproduct=async(req,res)=>{
    console.log("inside edit product")
    const {title,category,description,id,quantity,userId,price}=req.body
    const {_id}=req.params
    const uploadFile=req.file?req.file.filename:req.body.cover
    console.log(`${userId}`)
    console.log(`${_id}`)  

   

    try {

        const result=await products.findOneAndUpdate({_id:_id},{title,description,quantity,cover:uploadFile,id,category,price,userId})
        console.log(result)
        res.status(200).json(result)
        
    } catch (error) {
        res.status(400).json("something went wrong"+error)
        
    }
}
exports.fiveproducts=async(req,res)=>{
    console.log("inside fetching five")
    try {
        const result=await products.find().limit(5)
        
        res.status(200).json(result)
        
    } catch (error) {
        res.status(400).json("something went wrong"+error)
        
    }
}

exports.fetchproducts=async(req,res)=>{
    console.log("inside fetching five")
    console.log(req.query.search)
    const searchKey=req.query.search
    const query={
        title:{$regex:searchKey,$options:"i"}
    }
    try {
        const result=await products.find(query)
     
        res.status(200).json(result)
        
    } catch (error) {
        res.status(400).json("something went wrong"+error)
        
    }
}
exports.fetch=async(req,res)=>{
    console.log("inside fetching categorically")
    const {category}=req.params
    console.log(`${category}`)
    try {
        const result=await products.find({category:category})
        console.log(result)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json("something went wrong "+error)
        
    }

}