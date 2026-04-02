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

    const {body:{email,password}} = req;

    try{

        const hashedPassword = await bcrypt.hash(password,10);

    const user = new AuthModel({
        email:email,
        password:hashedPassword
    });

        await user.save();

        res.status(201).send({msg:"registered"})

    }catch(err){
        res.status(500).send({msg:"failed to register"})
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

        const {boy:{email,password}} = req;

        try{
            const user = await AuthModel.findOne({email})
            if(!user) res.status(404).send({msg:"user not found"})
                const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch) return res.status(404).send({msg:"user not found"});
            
            const token =  jwt.sign(
                {id:user._id},
                process.env.JWT_SECRET,
                {expiresIn:"7d"}
            );

            return res.status(201).send({token})

        }catch(err){
            return res.status(500).send({msg:err})
        }
        
    });


export default router;