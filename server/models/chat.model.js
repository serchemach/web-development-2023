const mongoose = require("mongoose");

const Chat = mongoose.model("Chat", new mongoose.Schema({
    chatname: String,
    participants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    moderator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    messages: [{
        text: String,
        authorName: String,
        date: String,
    }]
}));

module.exports = Chat;

