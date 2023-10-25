const Chat = require('../models/chats.model');
const userModel = require('../models/user.model');
const webpush = require('web-push');
module.exports = {
    accessChat: async (req, res) => {
        const { userId } = req.params;
        if (!userId) {
            res.send({
                ok: false,
                msg: 'userId param not sent with request'
            })
        }
        let isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: userId } } },
            ],
        })
            .populate("users", "-password")
            .populate("lastestMessage")
        isChat = await userModel.populate(isChat, {
            path: 'lastestMessage.sender',
            select: 'username image email'
        })
        if (isChat.length > 0) {
            res.send([0])
        } else {
            const chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [req.user._id, userId],
            };
        }
        const createdChat = await Chat.create(chatData);
        const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
            "users",
            "-password"
        )
        res.send({
            ok: true,
            data: fullChat
        })
    },
    fetchChat: async (req, res) => {
        try {
            Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
                .populate("users", "-password")
                .populate("groupAdmin", "-password")
                .populate("latestMessage")
                .sort({ updatedAt: -1 })
                .then(async (results) => {
                    results = await userModel.populate(results, {
                        path: "latestMessage.sender",
                        select: "username img email",
                    });
                    res.status(200).send(results);
                });
        } catch (error) {
            res.send({ msg: error.message, status: 400 }).status(400);
        }
    },
    createChat: async (req, res) => {
        try {
            if (!req.user || !req.body.chatName) {
                throw new Error("Please fill all fields!");
            }
            var users = JSON.parse(req.body.users);
            if (users.length < 1) {
                throw new Error("More than 2 users can create group!");
            }
            users.push(req.user);
            const groupChat = await Chat.create({
                chatName: req.body.chatName,
                users: users,
                isGroupChat: true,
                groupAdmin: req.user,
            });
            const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
                .populate("users", "-password")
                .populate("groupAdmin", "-password");
            res.status(200).json(fullGroupChat);
        } catch (error) {
            res.send({ msg: error.message, status: 400 }).status(400);
        }
    },
    addToGroup: async (req, res) => {
        try {
            const { userId, chatId } = req.body;
            const added = await Chat.findByIdAndUpdate(
                chatId,
                {
                    $push: { users: userId },
                },
                { new: true }
            )
                .populate("users", "-password")
                .populate("groupAdmin", "-password");
            if (!added) {
                throw new Error("Chat Not Found");
            } else {
                res.json(added);
            }
        } catch (error) {
            res.send({ msg: error.message, status: 400 }).status(400);
        }
    },
    renameChat: async (req, res) => {
        try {
            const { chatName } = req.body;
            const { chatId } = req.params;
            const updatedChat = await Chat.findByIdAndUpdate(
                chatId,
                {
                    chatName,
                },
                {
                    new: true,
                }
            )
                .populate("users", "-password")
                .populate("groupAdmin", "-password");

            if (!updatedChat) {
                throw new Error("Chat Not Found");
            } else {
                res.json(updatedChat);
            }
        } catch (error) {
            res.send({ msg: error.message, status: 400 }).status(400);
        }
    },
    removeFromChat: async (req, res) => {
        try {
            const { userId, chatId } = req.body;
            const removed = await Chat.findByIdAndUpdate(
                chatId,
                {
                    $pull: { users: userId },
                },
                {
                    new: true,
                }
            )
                .populate("users", "-password")
                .populate("groupAdmin", "-password");

            if (!removed) {
                throw new Error("Chat Not Found");
            } else {
                res.json(removed);
            }
        } catch (error) {
            res.send({ msg: error.message, status: 400 }).status(400);
        }
    }
}

