const chatsModel = require("../models/chats.model");
const messageModel = require("../models/message.model");

module.exports = {
    sendMessage: async (req, res) => {
        try {
            const { content, chatId } = req.body;
            if (!content || !chatId) {
                throw new Error(`Invalid Data!`);
            }
            var newMessage = {
                sender: req.user._id,
                content: content,
                chat: chatId
            }
            var message = await messageModel.create(newMessage);
            message = await message.populate("sender", "username img_path")
            message = await message.populate("chat")
            message = await Users.populate(message, {
                path: "chat.users",
                select: "username img_path email"
            })
            await chatsModel.findByIdAndUpdate(req.body.chatId, {
                latestMessage: message
            })

            res.json(message)
        } catch (error) {
            res.send({ message: `Error: ${error.message}`, status: 400 });
        }
        webpush.sendNotification(newMessage)
    },
    allMessages: async (req, res) => {
        try {
            const messages = await messageModel.find({ chat: req.params.chatId }).populate(
                "sender",
                "username img_path email"
            ).populate('chat');
            res.json(messages)
        } catch (error) {
            res.send({ message: `Error: ${error.message}`, status: 400 });
        }
    }
}