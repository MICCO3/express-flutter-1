import { Router } from "express";

import { Product } from "../models/products.js";

const router = Router();

router.get("/api/products/all", async(req,res)=>{
    const products = await Product.find();
    res.status(200).send(products);
});


router.get("/api/products/:id", async(req,res)=>{
    const {params:{id}} = req;
    const product = await Product.findById(id);
    res.status(200).send(product);
});

router.post("/api/products", async(req,res)=>{
    const {body} = req;

    const productModel = new Product(body);

    try{

        const product = await productModel.save();
        return res.status(201).send(product);

    }catch(e){

        return res.status(400).send("failed")
    }
     

});

router.put("/api/products/:id",async(req,res)=>{
    const {body,params:{id}} = req;
    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        body,
        {new:true,runValidators:true}
    );
    return res.status(201).send(updatedProduct);
    
});

router.delete("/api/products/:id", async(req,res)=>{
    const {params:{id}} = req;
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.status(201).send({msg:"deleted successifully"});
});




export default router;