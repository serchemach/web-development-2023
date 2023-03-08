const mongoose = require("mongoose");

const Message = mongoose.model("Message", new mongoose.Schema({
    content: String,
    sendDate: Date,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    readBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
}));

module.export = Message;

/*
content 
date
author
who read
*/

