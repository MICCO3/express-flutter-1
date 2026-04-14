import { Router } from "express";
import { CartModel } from "../models/cart.js";
import { query } from "express-validator";

const router = Router();

router.post("/api/cart",async(req,res)=>{
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

router.get("/api/cart/:userId",async(req,res)=>{
    const {params:{userId}} = req;
    try{
        if(userId){
            const cart = await CartModel.findOne({userId})
             const items = cart.items;
                        
             res.status(200).send({items});
        }

    }catch(e){
        res.status(500).send(e);
    }
    
});


router.get("/api/cart/",async(req,res)=>{
    const {query:{userId,itemId,operation}} = req;
     
    if(userId && itemId){
        try{
        let cart = await CartModel.findOne({userId})

        if(operation==="increment"){

                        
            //const items = cart.items;
        
            //const item = items.find(item=>item.itemId===itemId);
            //item.quantity ++;        
            //await cart.save();
           
        await CartModel.updateOne(
            {userId, "items.itemId":itemId},
            {
                $inc:{
                    "items.$.quantity":1
                }
            }
           );

           return res.status(201);

        }
        if(operation==="decrement"){
            // const items = cart.items;
            // const item = items.find(item=>item.itemId===itemId);
            // if(item.quantity===1) return res.sendStatus(200);
            // item.quantity--
            // await cart.save();
            
            await CartModel.updateOne(
                {userId,
                "items.itemId":itemId,
                "items.quantity":{$gt:1}
            },
                {
                    $inc:{
                        "items.$.quantity":-1
                    }
                }
            );
            return res.sendStatus(201);
        }

        if(operation==="del"){
            await CartModel.updateOne(
                {
                    userId,
                    "items.itemId":itemId,
                   
                },
                {
                    $pull:{
                        items:{itemId}
                    }
                }
            );
        }

        }catch(e){
           return res.status(500).send({msg:e});
        }
        
    }
    
});

export default router;