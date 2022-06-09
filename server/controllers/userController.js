const User = require('../model/user');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');


const signup = asyncHandler(async(req, res) => {
    const {email, username, password} = req.body;
    
    if (!email || !username || !password) {
        res.status(400);
        throw new Error("invalid data");
    }

    const userExists = await User.findOne({email});

    if (userExists) {
        res.status(400);
        throw new Error("email already exists");
    }

    const userNameExists = await User.findOne({username});
    if (userNameExists) {
        res.status(400);
        throw new Error("username already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        email,
        username,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error("invalid user data");
    }
    
});

const login = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    console.log(req.body);
    
    if (!email  || !password) {
        res.status(400);
        throw new Error("invalid data");
    }

    const user = await User.findOne({email});

    if (!user) {
        
        res.status(400);
        
        throw new Error("username or password is incorrect");
    }

    if (await bcrypt.compare(password, user.password)) {
        console.log("user not found");
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error("username or password is incorrect");
    }
    
});

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}


module.exports = {
    signup,
    login
};