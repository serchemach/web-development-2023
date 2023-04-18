const middlewares = require("../middlewares/auth.middleware")

module.exports = (app) => {
    app.post("/auth/requireAuth", [middlewares.verifyToken], (req, res) => {
        res.status(200).send("requireAuth route, authorized")
    })
    app.post("/auth/notRequireAuth", (req, res) => {
        res.status(200).send("notRequireAuth route")
    })
    app.post("/auth/newUserAuth", [middlewares.verifyUserAbsence], (req, res) => {
        res.status(200).send(`User absence route for email ${req.body.email}`)
    })
}
