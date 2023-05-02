const db = require("../models")

const Chat = db.chat;

// This request takes an object
// {
//     moderator: string;
//     participantsIds: [string];
//     chatName: string;
// }
const createChat = (req, res) => {
    // console.log(req.body, req.body.username, req.body.nickname, req.body.email, req.body.password);
    const chat = new Chat({
        chatname: req.body.chatName,
        participants: req.body.participantIds,
        moderator: req.body.moderatorId,
        messages: []
    });
    chat.save().then((result, err) => {
        if(err){
            res.status(500).send({message: err});
        }
        else{
            res.status(200).send({message: "Chat created successfully"});
            console.log(`Chat with name ${user.chatName} added`);
        }
    })
}

// This request takes a user id as a url parameter
const getChats = (req, res) => {
    Chat.find({participants: req.params.userId}).then((chats) => {
        if(!chats){
            res.status(404).send({message: `Chat with user ${req.params.userId} not found`})
            return;
        }

        res.status(200).send({
            message: "Chats found", payload: chats
        })

    }).catch((err) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }
    })
}

// This request takes a chat id as a url parameter and an object
// {
//     moderatorId: string;
// }
const deleteChat = (req, res) => {
    const id = req.params.id
    Chat.findOne({_id: id}).then((chat) => {
        if(!chat){
            res.status(404).send({message: "Chat not found"})
            return ;
        }

        if(chat.moderator === req.body.moderatorId){
            Chat.findByIdAndRemove(id).then(
                (chat)=>console.log(chat)
            ).catch((err) => console.log(err))
            
            res.status(200).send({
                message: "Chat deleted"
            })
        }
        else{
            res.status(401).send({message: "The user is not the moderator of the chat"})
        }

    }).catch((err) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }
    })
}

// This request takes a chat id as a url parameter and an object
// {
//     chatName: string;
//     participantIds: string;
//     moderatorId: string;
//     message: string;
// }
const updateChat = (req, res) => {
    Chat.updateOne({_id: req.params.id}, {
        chatname: req.body.chatName,
        participants: req.body.participantIds,
        moderator: req.body.moderatorId,
        messages: req.body.message,
    }).then((chat) => {
        if(!chat){
            res.status(404).send({message: `Chat with name ${req.body.chatName} not found`})
            return ;
        }

        res.status(200).send({
            message: "Chat updated", payload: chat
        })

    }).catch((err) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }
    })
}

const getUsers = (req, res) => {
    Chat.find({}).then((users) => {
        if(!users){
            res.status(404).send({message: "users not found"})
            return ;
        }

        res.status(401).send({message: "Users", payload: users})
    }).catch((err) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }
    })
}

module.exports = {
    updateChat,
    deleteChat,
    createChat,
    getChats,
    getUsers,
}
