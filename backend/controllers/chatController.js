import asyncHandler from "express-async-handler";
import Chat from "../models/Chat.js";

//@desc         create or fetch one - on - one chat
//path          POST    /api/v1/chat
//access        Private(through auth)

const accessChat = asyncHandler(async(req,res,next)=>{
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
        var chatData = {
            chatName: "Sender",
            isGroupChat: false,
            users:[userId,req.userId]
        }
    }
    try{
        let newChat = await Chat.create(chatData)
        newChat = await Chat.findById(newChat._id).populate("users","name email photo").populate("latestMessage")
        res.send(newChat)
    }catch(error){
        let err = new Error(error)
        next(err)
    }
})

export {accessChat}