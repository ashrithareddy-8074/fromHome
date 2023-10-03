const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports.anyOneLoggedIn = async (req, res, next) => {
    const header = req.header('auth-token');
    if(!token) return res.status(401).send({message: "something went wrong"});
    try{
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = payload;
        next();
    }
    catch(e)
    {
        console.log(e);
        return res.status(401).send({message: "unauthorized accesss"});
    }
}

module.exports.verifyProvider = async (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send({message: "something went wrong"});
    try{
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if(payload.role === "Provider")
        {
            req.user = payload;
            next();
        }
        else{
            throw new Error({message: "user is not provider"});
        }
    }
    catch(e)
    {
        return res.status(401).send({error, message: "unauthorized accesss"});
    }
}

module.exports.verifyReceiver = async (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send({message: "something went wrong"});
    try{
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if(payload.role === "Receiver")
        {
            req.user = payload;
            next();
        }
        else{
            throw new Error({message: "user is not receiver"});
        }
    }
    catch(e)
    {
        return res.status(401).send({error, message: "unauthorized accesss"});
    }
} 