const User = require("../model/user");
const Tags = require("../model/tags");
const Question = require("../model/question");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { restart } = require("nodemon");
const question = require("../model/question");
const moment = require("moment");

const signup = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    res.status(400);
    throw new Error("invalid data");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("email already exists");
  }

  const userNameExists = await User.findOne({ username });
  if (userNameExists) {
    res.status(400);
    throw new Error("username already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    email,
    username,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  if (!email || !password) {
    res.status(400);
    throw new Error("invalid data");
  }

  const user = await User.findOne({ email });

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
    });
  } else {
    res.status(400);
    throw new Error("username or password is incorrect");
  }
});

const addTag = asyncHandler(async (req, res) => {
  const { name, description, token } = req.body;

  if (!token) {
    res.status(400);
    throw new Error("no token");
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({ _id: decodedToken.id });

  console.log(`Is admin? ${user.isAdmin} and user = ${user}`);

  if (!user || !user.isAdmin) {
    res.status(400);

    throw new Error("Not authorized");
  }

  const createdTag = await Tags.create({ name, description });

  if (!createdTag) {
    res.status(400);
    throw new Error("tag already exists");
  } else {
    res.status(201).send("Tag is added successfully");
  }
});

const validTags = async (tags) => {
  if (!(tags instanceof Array)) {
    return false;
  }

  const allTags = await Tags.find({});
  const filteredTags = filterTags(allTags);

  tags.forEach((elem) => {
    let validTag = false;
    for (let i = 0; i < filteredTags.length; i++) {
      if (elem === filteredTags[i].name) {
        validTag = true;
      }
    }
    if (!validTag) {
      return false;
    }
  });

  return true;
};

const updateTagsAskedQuestion = async (tags) => {
  tags.forEach(async (elem) => {
    const tag = await Tags.findOne({ name: elem });
    tag.numberOfAskedQuestions = tag.numberOfAskedQuestions + 1;

    await tag.save();
  });
};

const askQuestion = asyncHandler(async (req, res) => {
  const { title, body, tags, author } = req.body;
  if (!title || !body || !tags || !author) {
    res.status(400);
    throw new Error("Invalid data");
    return;
  }

  const validAuthor = await User.findOne({ username: author });

  if (!validAuthor) {
    res.status(400);
    throw new Error("Unauthorized");
    return;
  }

  const areValidTags = await validTags(tags);
  if (!areValidTags) {
    res.status(400);
    throw new Error("Invalid tags");
    return;
  }

  await updateTagsAskedQuestion(tags);
  const newId = (await Question.findOne({}).count()) + 1;

  const createdQuestion = await Question.create({
    title,
    body,
    tags,
    author,
    id: newId,
    createdAt: moment(),
  });
  if (!createdQuestion) {
    res.status(400);
    throw new Error("Something went wrong");
  } else {
    console.log("question added");
    res.status(201).send("Question is added successfully");
  }
});

const addComment = asyncHandler(async (req, res) => {
  const { username, body, id } = req.body;
  if (!username || !body || !id) {
    res.status(400);
    throw new Error("Invalid data");
    return;
  }

  const validUserName = await User.findOne({ id: id });

  if (!validUserName) {
    res.status(400);
    throw new Error("Unauthorized");
    return;
  }
  if (body.length < 15) {
    res.status(400);
    throw new Error("Please enter at least 15 characters");
    return;
  }

  const commentId = await Question.findOne({ id: id });

  if (!commentId) {
    res.status(400);
    throw new Error("Something went wrong");
    return;
  }
  const createdComment = await Question.updateOne(
    { id: id },
    { $push: { comments: { body: body, user: username, id: id } } }
  );

  const questions = await Question.find({});

  res.status(201).send(questions);
});

const getQuestions = asyncHandler(async (req, res) => {
  const allQuestions = await Question.find({});
  console.log(allQuestions);
  console.log("get all questions");
  res.status(201).send(allQuestions);
});

const filterTags = (allTags) => {
  let filteredData = [];

  for (let i = 0; i < allTags.length; i++) {
    filteredData.push({
      name: allTags[i].name,
      description: allTags[i].description,
      numberOfAskedQuestions: allTags[i].numberOfAskedQuestions,
    });
  }

  return filteredData;
};

const vote = asyncHandler(async (req, res) => {
  // const {questionId, voteValue, answerId}
  const obj = req.body;
  if (Object.hasOwn(obj, "answerId")) {
    let { questionId, voteValue, answerId } = req.body;
    const question = Question.findOne({ id: questionId });
    if (!question) {
      throw new Error("Invalid question id");
      return;
    }

    if (Math.abs(voteValue) === 1) {
      question.votes = voteValue;
    } else {
      throw new Error("Something went wrong");
    }
  } else {
    let { questionId, voteValue, token } = req.body;
    if (!questionId || !voteValue || !token) {
      throw new Error("Invalid data");
      return;
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      throw new Error("Invalid token");
      return;
    }
    let questionData = await Question.findOne({ id: questionId });

    // if (decodedToken.user === await Question.findOne)

    let user = await User.findById(decodedToken.id);
    if (!user) {
      res.status(400).send("Invalid token");
      return;
    }
    if (questionData.author === user.username) {
      res.status(400).send("Cannot vote to yourself");
      return;
    }

    let votesList = user.votesList;

    const alreadyVoted = votesList.find((obj) => {
      return obj.id === questionId;
    });
    const question = await Question.findOne({ id: questionId });
    let isUpVote = true;
    if (Math.abs(voteValue) !== 1) {
      throw new Error("Something went wrong");
      if (voteValue === -1) isUpVote = false;
      return;
    }
    let response = { state: "done", voteCount: question.votes };
    let add = voteValue;
    if (alreadyVoted) {
      // if the same as the previous vote, reset the vote
      if (alreadyVoted.voteValue === voteValue) {
        add = -alreadyVoted.voteValue;
        response.state = "reset";
        console.log("heeeeeeey");
        const newArray = votesList.filter((elem) => {
          return elem.id !== questionId;
        });

        console.log("beeep");
        console.log(newArray);
        user.votesList = newArray;
        await user.save();
      } else {
        add = voteValue === 1 ? 2 : -2;
        let index = votesList.findIndex((elem) => {
          return elem.id === questionId;
        });

        votesList[index].voteValue = voteValue;
        user.votesList = votesList;
        await user.save();
      }
    } else {
      console.log(votesList);
      votesList.push({
        isQuestionVote: true,
        id: questionId,
        voteValue: voteValue,
      });
      user.voteList = votesList;
      console.log(votesList);
      await user.save();
    }
    question.votes = question.votes + add;
    await question.save();
    response.voteCount = question.votes;
    console.log(user);

    res.status(200).send(response);
  }
});
const getTags = asyncHandler(async (req, res) => {
  const allTags = await Tags.find({});
  const filteredData = filterTags(allTags);

  res.status(201).send(filteredData);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  signup,
  login,
  addTag,
  getTags,
  askQuestion,
  getQuestions,
  addComment,
  vote,
};
