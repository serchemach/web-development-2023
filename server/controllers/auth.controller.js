const db = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const signup = (req, res) => {
    // console.log(req.body, req.body.username, req.body.nickname, req.body.email, req.body.password);
    const user = new db.user({
        username: req.body.username,
        nickname: req.body.nickname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });
    user.save().then((result, err) => {
        if(err){
            res.status(500).send({message: err});
        }
        else{
            res.status(200).send({message: "User created successfully"});
            console.log(`User with name ${user.username} added`);
        }
    })
}

const signin = (req, res) => {
    db.user.findOne({email: req.body.email}).then((user) => {
        if(!user){
            res.status(404).send({message: `User with ${req.body.email} not found`})
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    
        if(passwordIsValid){
            const token = jwt.sign({id: user.id}, "SECRET!", {expiresIn: 1000 * 60})
            res.status(200).send({message: "User is authenticated", user: {
                username: user.username,
                nickname: user.nickname,
                token: token,
            }})
        } else {
            res.status(404).send({message: "Invalid password"});
        }

    }).catch((err) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }
    })

}

module.exports = {
    signup,
    signin,
};
