import { Router } from "express";
import {body,query,param,validationResult,matchedData} from "express-validator"

import { Product } from "../models/products.js";

const router = Router();

router.get("/api/products/all", async(req,res)=>{
    const products = await Product.find();
    res.status(200).send(products);
});


router.get("/api/products/:id", 
    param("id")
    .isMongoId().withMessage("invalid ID")
    .notEmpty().withMessage("Id can't be empty"), 
    async(req,res)=>{
        const result = validationResult(req);
        if(!result.isEmpty())return res.statusCode(400).send({msg:"Invalid ID"});
    const {params:{id}} = req;
    const product = await Product.findById(id);
    res.status(200).send(product);
});

router.post("/api/products",[
    body("name").notEmpty().withMessage("name ca't be empty"),
    body("price").notEmpty().withMessage("price can't be empty"),
    body("url").notEmpty().withMessage("url can't be empty")
], 
async(req,res)=>{

    const result = validationResult(req)
    if(!result.isEmpty()) return res.statusCode(400).send({msg:"invalid request"});
    
    const data = matchedData(req);

    const productModel = new Product(data);

    try{

        const product = await productModel.save();
        return res.status(201).send(product);

    }catch(e){

        return res.status(400).send(data);
    }
     

});

router.put("/api/products/:id",
    param("id").notEmpty().isMongoId(),
    async(req,res)=>{
        const result = validationResult(req);
        if(!result.isEmpty()) return res.statusCode(400).send({msg:"invalid Id"})
    const {body,params:{id}} = req;
    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        body,
        {new:true,runValidators:true}
    );
    return res.status(201).send(updatedProduct);
    
});

router.delete("/api/products/:id", 
    param("id").isMongoId().notEmpty(), 
    async(req,res)=>{
        const result = validationResult(req);
        if(!result.isEmpty()) return res.statusCode(400).send({msg:"Invalid id"})
    const {params:{id}} = req;
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.status(201).send({msg:"deleted successifully"});
});




export default router;