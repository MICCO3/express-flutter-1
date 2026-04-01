import { Router } from "express";
import { body,validationResult,query } from "express-validator";
import bcrypt from "bcryptjs";
import { AuthModel } from "../models/auth.js";
import { use } from "react";


const router = Router();


router.post("/api/auth/register",[
    body("email").notEmpty(),
    body("password").notEmpty()
],
async(req,res)=>{

    const result = validationResult(req);
    if(!result.isEmpty()) return res.statusCode(400)
        .send({msg:"invalid request"});

    const {body:{email,password}} = req;

    try{

        const hashedPassword = await bcrypt.hash(password,10);

    const user = new AuthModel({
        email:email,
        password:hashedPassword
    });

        await user.save();

        res.statusCode(201).send({msg:"registered"})

    }catch(err){
        res.statusCode(500).send({msg:"failed to register"})
    }
    
    
});


router.post("/api/auth/login",
    [
        body("email").notEmpty(),
        body("password").notEmpty()
    ],
    async(req,res)=>{
        const result = validationResult(req);
        if(!result.isEmpty()) return res.statusCode(400)
            .send({msg:"Invalid request"});

        const {boy:{email,password}} = req;

        try{
            const user = await AuthModel.findOne({email})
            if(!user) res.statusCode(404).send({msg:"user not found"})
                const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch) return res.statusCode(404).send({msg:"user not found"});
            //proceed here
        }catch(err){
            
        }
        
        //const isMatch = await bcrypt.compare()


    });