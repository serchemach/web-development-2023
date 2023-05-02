const controller = require("../controllers/chats.controller")

module.exports = (app) => {
    app.post("/chats", controller.createChat)
    app.get("/chats/:userId", controller.getChats)
    app.delete("/chats/:id", controller.deleteChat)
    app.put("/chats/:id", controller.updateChat)
}
