import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import { genToken } from "../utils/genToken.js";

const register=asyncHandler(async (req,res)=>{
    const {name,email,password,confirmPassword}=req.body;

    let existingUser = await User.findOne({ email });
    console.log(name, email, password, confirmPassword);
    if (existingUser) {
      throw new Error("User exists already");
    }

    console.log(req.file);

    let newUser=await User.create({
        name,
        email,
        password,
        confirmPassword,
        photo: req.file.path
    })

    let token = await genToken(newUser._id)
    newUser=await User.findById(newUser._id).select({password:0,confirmPassword:0})

    res.status(201).json({
        status:"success",
        data:newUser,
        token
    })
})




const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  let existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.status(404).json({ message: "User email is not registered. Please sign up." });
  }

  if (!(await existingUser.verifyPassword(password, existingUser.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  existingUser = await User.findById(existingUser._id).select({ password: 0, confirmPassword: 0 });

  let token = await genToken(existingUser._id);

  res.status(200).json({
    status: "Success!",
    data: existingUser,
    token,
  });
});




// /home?search=akash
// {search:'akash'}
const searchUsers = asyncHandler(async (req, res, next) => {
    let userId = req.userId;
    let keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    let users = await User.find(keyword).find({ _id: { $ne: userId } }).exec();
    if (!users) {
      let err = new Error("Users not found");
      next(err);
    }
    res.status(200).json(users);

});

export {register,login,searchUsers}