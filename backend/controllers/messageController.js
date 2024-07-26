import asyncHandler from "express-async-handler";
import Message from '../models/Message.js';
import Chat from "../models/Chat.js"

// @desc    Create a message
// @route   POST /api/v1/message
// @access  Private
const createMessage = asyncHandler(async (req, res, next) => {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
        return res.status(400).json({
            status: "fail",
            message: "Content and chatId are required"
        });
    }

    try {
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({
                status: "fail",
                message: "Chat not found"
            });
        }

        let message = await Message.create({
            sender: req.userId,
            chat: chatId,
            content
        });
        
        message = await message.populate('sender', 'name email photo')
        message = await message.populate('chat')
        message = await message.populate({
            path: 'chat.users',
            select: 'name email photo'
        })

        await Chat.findByIdAndUpdate(chatId, {
            latestMessage: message
        });

        res.status(201).json({
            status: "success",
            data: message
        });
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
});

// @desc    Fetch all messages
// @route   GET /api/v1/message/:chatId
// @access  Private
const fetchAllMessages = asyncHandler(async (req, res, next) => {
    const chatId = req.params.chatId;

    if (!chatId) {
        return res.status(400).json({
            status: "fail",
            message: "ChatId is required"
        });
    }

    try {
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({
                status: "fail",
                message: "Chat not found"
            });
        }

        const messages = await Message.find({ chat: chatId })
            .populate('sender', 'name email photo')
            .populate('chat')
            .populate({
                path: 'chat.users',
                select: 'name email photo'
            });

        res.status(200).json({
            status: "success",
            data: messages
        });
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
});

export { createMessage, fetchAllMessages };
