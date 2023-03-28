const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
const dbConfig = require('./config/db.config')

const db = require('./models')

const User = db.user;

const initial = () => {
    User.estimatedDocumentCount().then((result, err) =>{
        console.log("user's count is ", result, err)
        if(!err && result == 0){
            new User({
                username: "Admin",
                nickname: "Admin",
                email: "Admin",
                password: "root",
            }).save().then((result, err) => {
                if(err){
                    console.log("While adding admin: ", err)
                }
                else {
                    console.log("Admin was created: ", result);
                }
            });
        }
    })
}

db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log("DB is connected");
    initial();
}).catch((err) => {
    console.log("Couldn't connect to the DB");
    console.log(err);
    process.exit();
})

// require("./routes/auth.routes")(app);
// require("./routes/authCheck.routes")(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
