const db = require("../models")
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({message: "No token provided"});
    }

    jwt.verify(token, "SECRET!", (err, decoded) => {
        if(err){
            return res.status(401).send({message: "Unauthorized"});
        }
        req.userId = decoded.id;
        next();
    })
}

const verifyUserAbsence = (req, res, next) => {
    db.user.findOne({email: req.body.email}).then((user) => {
        if(!user){
            next();
        }
        else{
            return res.status(403).send({message: `User with email ${req.body.email} already exists`});
        }

    }).catch((err) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }
    })
}

module.exports = {
    verifyToken, 
    verifyUserAbsence,
}