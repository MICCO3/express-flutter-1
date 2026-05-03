import { Router } from "express";
import { LocationModel } from "../models/location";
const router = Router();

router.post("/api/location",async(req,res)=>{
    const {body:{region,districts}} = req;
    const location = new LocationModel({region,districts})
    try{
        await Location.save();
        res.status(200).send({
            success:true,
            message:"succesfully saved"
        })
    }catch(e){
        res.status(500).send({
            success:true,
            message:"succesfully saved"
        });
    }
    
})

export default router;