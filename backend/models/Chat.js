import {model,Schema} from 'mongoose'

const chatSchema = new Schema({
    chatName:{
        type:String,
    },
    isGroupChat:{
        type:Boolean,
        default:false
    },
    users:{
        type:[Schema.Types.ObjectId],
        ref:"User"
    },
    lastMessage:{
        type:Schema.Types.ObjectId,
        ref:"Message"
    },

})

const Chat = model("Chat", chatSchema)

export default Chat