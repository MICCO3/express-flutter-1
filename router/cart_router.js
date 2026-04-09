import { Router } from "express";
import { CartModel } from "../models/cart.js";

const router = Router();

router.post("/api/products/cart",async(req,res)=>{
    const {body:{
        itemId,itemName,itemPrice,itemUrl,quantity,userId
    }} = req;

    try{

        //check if cart exist
           let cart = await CartModel.findOne({userId});

           
           if(!cart){

             cart = new CartModel({
                userId:userId,
                items:[{
                    itemId:itemId,
                    itemName:itemName,
                    itemUrl:itemUrl,
                    itemPrice:itemPrice,
                    quantity:quantity
                }]
            })


            await cart.save();

            return res.status(201).send("cart added");

           }

           //check if product exist

           const itemIndex = cart.items.findIndex(item=>item.itemId===itemId);
           console.log(`item index is ${itemIndex}`);
           if(itemIndex > -1){
                   return res.status(200).send("already added")     
           }else{
                cart.items.push({
                    itemId:itemId,
                    itemName:itemName,
                    itemUrl:itemUrl,
                    itemPrice:itemPrice,
                    quantity:quantity
                })
                    await cart.save()
                return res.status(200).send("item added")
           }


    }catch(e){
        console.log(e);
        
            return res.status(500).send(e)
    }
});

router.get("/api/products/cart/:userId",async(req,res)=>{
    const {query:{userId}} = req;
    try{
        if(id){
            const cart = await CartModel.findOne({userId})
             const items = cart.items;
             console.log(items);
             
             res.status(200).send({items});
        }

    }catch(e){
        res.status(500).send(e);
    }
    
});

export default router;