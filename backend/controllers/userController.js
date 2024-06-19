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







// import User from "../models/User.js";
// import asyncHandler from "express-async-handler";
// //register
// const register=asyncHandler(async (req,res)=>{
//     const {name,email,password,confirmPassword}=req.body;

//     if (!name || !email || !password || !confirmPassword) {
//         throw new Error('MISSING_CREDENTIALS');
//     }

//     console.log(req.file);

//     let newUser=await User.create({
//         name,
//         email,
//         password,
//         confirmPassword,
//         photo: req.file.path
//     })

//     res.status(201).json({
//         status:"success",
//         data:newUser
//     })
// })

// export {register}