import { Router } from "express";
import { body,validationResult,query } from "express-validator";
import bcrypt from "bcryptjs";
import { AuthModel } from "../models/auth.js";
import jwt from "jsonwebtoken";


const router = Router();


router.post("/api/auth/register",[
    body("email").notEmpty(),
    body("password").notEmpty()
],
async(req,res)=>{

    const result = validationResult(req);
    if(!result.isEmpty()) return res.status(400)
        .send({msg:"invalid request"});

    const {body:{name,email,password}} = req;

    try{

        const hashedPassword = await bcrypt.hash(password,10);

    const user = new AuthModel({
        name:name,
        email:email,
        password:hashedPassword
    });

        await user.save();

        res.status(201).send({
            success:true,
            message:"registered successifully"
        })

    }catch(err){
        if(err.code === 11000){
            return res.status(400).send({
               success:false,
               message:"account already exists" 
            })
        }

        
       return  res.status(500).send(
        {
           seccuss:false,
           message:"server error" 
        }
    )
    }
    
    
});


router.post("/api/auth/login",
    [
        body("email").notEmpty(),
        body("password").notEmpty()
    ],
    async(req,res)=>{
        const result = validationResult(req);
        if(!result.isEmpty()) return res.status(400)
            .send({msg:"Invalid request"});

        const {body:{email,password}} = req;

        try{
            const user = await AuthModel.findOne({email})
            if(!user) res.status(404).send(
                {
                    success:false,
                    message:"user not found"
                }
            )
                const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch) return res.status(404).send(
                {
                    success:false,
                    message:"wrong password"
                }
            );
            
            const token =  jwt.sign(
                {id:user._id},
                process.env.JWT_SECRET,
                {expiresIn:"7d"}
            );

            return res.status(201).send(
                {
                    success:true,
                    message:"You are welcome",
                    token
                }
            )

        }catch(err){
            return res.status(500).send(
                {
                    success:false,
                    message:"server error"
                }
            )
        }
        
    });


export default router;