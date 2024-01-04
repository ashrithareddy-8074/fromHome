const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.register = async (req, res) => {
    const { password} = req.body;
    const salt = bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(password, salt);
    const user = new User({...req.body, password: hashedPassword});
    const user1 = await user.save();
    const user2 = {
        _id: user1._id,
        username: user1.name,
        role: user1.role
    };
    const accessToken = jwt.sign(user2, process.env.ACCESS_TOKEN_SECRET);
    const refreshToken = jwt.sign(user2, process.env.REFRESH_TOKEN_SECRET);
    res.cookie('refresh_token', refreshToken);
    res.header('refresh-token', refreshToken);
    res.header('auth-token', accessToken).send({
        status: "Success",
        payload: {
            user: {
                ...user2, accessToken: accessToken,
                refreshToken:refreshToken
            }
        }
    });
    return res.status(200).json({message:"successfully registered user"});
}

module.exports.login = async (req, res) => {
    const {password} = req.body;
    const user = await User.findOne({username});
    if(!user) return res.status(401).json({message:"incorrect username"});
    const passwordMatch = bcrypt.compare(password, user.password);
    if(!passwordMatch) return res.status(401).json({message:"incorrect username or password"});
    const user2 = {
        _id: user._id,
        username: user.username,
        role: user.role
    }
    const accessToken = jwt.sign(user2, process.env.ACCESS_TOKEN_SECRET);
    const refreshToken = jwt.sign(user2, process.env.REFRESH_TOKEN_SECRET);
    res.cookie('refresh_token', refreshToken);
    res.header('refresh-token', refreshToken);
    res.header('auth-token', accessToken).send({
        status: "Success",
        payload: {
            user: {
                ...user2, accessToken: accessToken,
                refreshToken:refreshToken
            }
        }
    });
    return res.status(200).json({message:"successfully logged in"});
}

module.exports.renewToken = async(req, res) => {
    const refreshToken = req.cookies.refresh_token;
    if(!refreshToken) return res.status(401).send({status:"Fail", message:"unauthorize access"});
    const {_id} = jwt.decode(refreshToken);
    if(!_id) return res.status(401).send({status:"Fail", message:"unauthorize access"});
    const user = await User.findById(_id);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user2 = {
        _id: user._id,
        username: user.username,
        role: user.role
    }
    const accessToken = jwt.sign(user2, process.env.ACCESS_TOKEN_SECRET);
    const newrefreshToken = jwt.sign(user2, process.env.REFRESH_TOKEN_SECRET);
    res.cookie('refresh-token', newrefreshToken);
    res.header('refresh-token', newrefreshToken);
    res.header('auth-token', accessToken).send({
        status: "Success",
        payload: {
            user: {
                ...user2, accessToken: accessToken,
                refreshToken:newrefreshToken
            }
        }
    });
}

module.exports.logout = async (req, res) => {
    res.clearCookie('refresh_token');
    res.send({ status: "Success", message: "Logged Out Sucessfully" });
}
