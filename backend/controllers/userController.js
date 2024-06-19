import User from "../models/User.js";

//register
const register=async (req,res)=>{
    try {
        const {name,email,password,confirmPassword}=req.body;

        console.log(req.file);

        let newUser=await User.create({
            name,
            email,
            password,
            confirmPassword,
            photo: req.file.path
        })

        res.status(201).json({
            status:"success",
            data:newUser
        })
        
    } catch (error) {
        res.status(400).json({
            status:"failed",
            message:error.message
        })
    }
}

export {register}