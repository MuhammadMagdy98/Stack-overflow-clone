const User = require('../model/user');
const Tags = require('../model/tags');
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
        
        console.log(user.isAdmin, user.reputation);
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
            isAdmin: user.isAdmin,
        })


    } else {
        res.status(400);
        throw new Error("username or password is incorrect");
    }
    
});

const addTag = asyncHandler(async(req, res) => {
    const {name, description, token} = req.body;

    
    if (!token) {
        res.status(400);
        throw new Error("no token");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);


    const user = await User.findOne({_id: decodedToken.id});


    
    console.log(`Is admin? ${user.isAdmin} and user = ${user}`)

    if (!user || !user.isAdmin) {
        
        res.status(400);
        
        throw new Error("Not authorized");
    }

    const createdTag = await Tags.create({name, description});

    if (!createdTag) {
        res.status(400);
        throw new Error("tag already exists");
    } else {
        res.status(201).send("Tag is added successfully");
    }
    
});


const filterTags = (allTags) => {
    let filteredData = [];


    for (let i = 0; i < allTags.length; i++) {
        filteredData.push({name: allTags[i].name, description: allTags[i].description, numberOfAskedQuestions: allTags[i].numberOfAskedQuestions});
    }

    return filteredData;
}


const getTags = asyncHandler(async(req, res) => {
    const allTags = await Tags.find({});
    const filteredData = filterTags(allTags);
    
    res.status(201).send(filteredData);



    
});


const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}


module.exports = {
    signup,
    login,
    addTag,
    getTags,
};