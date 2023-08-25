const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
    const bearHeader = req.headers["authorization"]
    console.log(bearHeader)
    if(typeof bearHeader == "undefined") {
        res.status(403).json([{ message: "token required" }])
    }
    else {
        try {
            const bearer = bearHeader.split(' ')
            const token = bearer[1]
            req.token = token
            req.decoded = jwt.verify(token, process.env.MY_SECRET)

            next();
        }
        catch (err) {
            console.log("invalid Token")
            res.status(403).json([{ message: "invalid Token" }])
        }
    }
}
module.exports = { verifyAuth }