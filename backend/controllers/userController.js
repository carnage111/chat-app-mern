import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import { genToken } from "../utils/genToken.js";

const register=asyncHandler(async (req,res)=>{
    const {name,email,password,confirmPassword}=req.body;

    // if (!name || !email || !password || !confirmPassword) {
    //     res.status(400);
    //     throw new Error('MISSING_CREDENTIALS');
    // }
    console.log(req.file);

    let newUser=await User.create({
        name,
        email,
        password,
        confirmPassword,
        photo: req.file.path
    })

    let token = await genToken(newUser._id)

    res.status(201).json({
        status:"success",
        data:newUser,
        token
    })
})

const login = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    console.log(req.body);
    const existingUser = await User.findOne({email})

    if(!existingUser || !(existingUser.verifyPassword(password,existingUser.password))){
        throw new Error("User not found, Please register yourself!")
    }

    let token = await genToken(existingUser._id);

    res.status(200).json({
        status: "Success!",
        existingUser,
        token
    })

})

export {register,login}