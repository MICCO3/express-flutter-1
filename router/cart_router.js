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
                items:{
                    itemId:itemId,
                    itemName:itemName,
                    itemUrl:itemUrl,
                    itemPrice:itemPrice,
                    quantity:quantity
                }
            })


            await newCArt.save();

            return res.status(201).send("cart added");

           }

           //check if product exist

           const itemIndex = CartModel.findIndex(item=>item.itemId===itemId);
           if(itemIndex>-1){
                   return res.status(200).send("already added")     
           }else{
                cart.items.push({
                    itemId:itemId,
                    itemName:itemName,
                    itemUrl:itemUrl,
                    quantity:quantity
                })

                return res.status(200).send("item added")
           }


    }catch(e){

    }
});


export default router;