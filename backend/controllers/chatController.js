import asyncHandler from "express-async-handler";
import Chat from "../models/Chat.js";

//@desc         create or fetch one - on - one chat
//path          POST    /api/v1/chat
//access        Private(through auth)

const accessChat = asyncHandler(async(req,res)=>{
    const {userId}= await req.body

    if(!userId){
        console.log("user id not sent");
        res.sendStatus(400)
    }

    let isChat = await Chat.find({
        isGroupChat:false,
        $and:[{users:{$elemMatch:{$eq:userId}}},{users:{$elemMatch:{$eq:req.userId}}}]
    }).populate("users","-password","-confirmPassword").populate("latestMessage")

    isChat = await Chat.populate(isChat,{
        path:"latestMessage.sender",
        select:"name email photo"
    })

    if(isChat.length>0){
        chatData=isChat[0]
    }else{

    }
})