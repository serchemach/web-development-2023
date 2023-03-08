const mongoose = require("mongoose");
mongoose.Promise = gloal.Promise;

const db = {};

db.user = requre("./user.model");
db.chat = requre("./chat.model");
db.message = requre("./message.model");

module.exports = db;
