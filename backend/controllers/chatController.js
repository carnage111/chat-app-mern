import asyncHandler from "express-async-handler";
import Chat from "../models/Chat.js";

//@desc         create or fetch one - on - one chat
//@path         POST    /api/v1/chat
//@access       Private(through auth)

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


//@description   fetch all chats for the logged in user
//@Path          GET /api/v1/chat
//@access        Private 
const fetchChats = asyncHandler(async(req,res)=>{
    let chats = await Chat.find({users:{$elemMatch:{$eq:req.userId}}}).populate("users","-password").populate("groupAdmin","-password").populate("latestMessage").sort({updatedAt:-1})

    let finalChats = await Chat.populate(chats,{
        path:"latestMessage.sender",
        select: "name email photo"
    })

    res.status(200).json(finalChats)
})


//@description   create group chat
//@Path          post /api/v1/chat
//@access         Private 
const createGroup = asyncHandler(async(req,res,next)=>{
    if(!req.body.user || !req.body.chatName){
        res.status(400).json("Please fill all the fields!!")
    }

    let users = await JSON.parse(req.body.users.replace(/'/g,'"')) //here we are converting the string to json object, here the replace function is used to replace the single quotes with double quotes as the json object should have double quotes, here /'/g means anything inside the / / will be replaced by the second argument of the replace function i.e. '"' and g means globally i.e. all the single quotes will be replaced by double quotes, g is a global flag/modifier 

    if(users<2){
        res.status(400).json("To create a group there should be more than 2 users")
    }

    users.push(req.userId)

    try{
        let groupChat = await Chat.create({
            chatName:req.body.chatName,
            isGroupChat:true,
            users:users,
            groupAdmin:req.userId
        })

        groupChat=await Chat.findById(groupChat._id).populate("users","-password -confirmPassword").populate("groupAdmin","-password -confirmPassword").populate("latestMessage")

        groupChat=await Chat.populate(groupChat,{
            path:"latestMessage.sender",
            select:"name email photo"
        })

        res.status(200).json(groupChat)
    } catch(error){
        let err = new Error(error.message)
        next(err)
    }
})

export {accessChat, fetchChats, createGroup}