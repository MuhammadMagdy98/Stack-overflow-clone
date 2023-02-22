const User = require("../model/user");
const Tags = require("../model/tags");
const Question = require("../model/question");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const question = require("../model/question");
const moment = require("moment");

const signup = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res
      .status(400)
      .json({ message: "This email already exists", success: false });
    return;
  }

  const userNameExists = await User.findOne({ username });
  if (userNameExists) {
    res
      .status(400)
      .json({ message: "This username already exists", success: false });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    email,
    username,
    password: hashedPassword,
    tagList: [],
    votesList: [],
    questionsList: [],
    answersList: [],
    votesList: [],
    isAdmin: false,
  });

  if (user) {
    res.status(201).json({
      token: generateToken({
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        votesList: user.votesList,
      }),
    });
  } else {
    res.status(400).json({ message: "invalid user data", success: false });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .json({ message: "Please enter username and password", success: false });
    return;
  }

  const user = await User.findOne({ email });

  if (!user) {
    console.log("beep");
    res
      .status(400)
      .json({ message: "email or password is incorrect", success: false });
    return;
  }

  if (await bcrypt.compare(password, user.password)) {
    res.status(201).json({
      token: generateToken({
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        votesList: user.votesList,
      }),
    });
  } else {
    res
      .status(400)
      .json({ message: "email or password is incorrect", success: false });
    return;
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
  const { title, body, tags, token } = req.body;
  if (!title || !body || !tags || !token) {
    res.status(400).send("Invalid data");
    return;
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedToken) {
    res.status(400).send("Unauthorized");
    return;
  }
  const user = await User.findOne({ _id: decodedToken.data.id });

  if (!user) {
    res.status(400).send("Unauthorized");
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
    author: user.username,
    id: newId,
    createdAt: moment(),
    answerList: [],
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
  const { token, body, questionId, answerId } = req.body;
  if (!body || !questionId || !token) {
    res.status(400);
    throw new Error("Invalid data");
    return;
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const validUserName = await User.findOne({
    username: decodedToken.data.username,
  });
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
  const commentId = await Question.findOne({ id: questionId });

  if (!commentId) {
    res.status(400);
    throw new Error("Something went wrong");
    return;
  }
  if (!answerId) {
    const createdComment = await Question.updateOne(
      { id: questionId },
      {
        $push: {
          comments: {
            body: body,
            user: decodedToken.data.username,
            createdAt: moment().toString(),
          },
        },
      }
    );
    const question = await Question.find({ id: questionId });
    res.status(201).send({ question: question });
  } else {
    if (answerId < 0 || answerId > commentId.answerList.length) {
      res.status(400);
      throw new Error("Invalid data");
      return;
    }

    console.log(commentId.answerList);
    commentId.answerList[answerId - 1].comments.push({
      body: body,
      user: decodedToken.data.username,
      createdAt: moment().toString(),
    });
    await commentId.save();
    const questions = await Question.find({ id: questionId });
    res.status(201).send(questions);
  }
});

const getQuestions = asyncHandler(async (req, res) => {
  const allQuestions = await Question.find({});
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

const answerQuestion = asyncHandler(async (req, res) => {
  let { questionId, body, token } = req.body;

  if (!questionId || !body || !token) {
    res.status(400);
    throw new Error("Invalid data");
    return;
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const validUserName = await User.findOne({
    username: decodedToken.data.username,
  });
  if (!validUserName) {
    res.status(400).send("Unauthorized");
    return;
  }

  let validQuestion = await Question.findOne({ id: questionId });

  if (!validQuestion) {
    res.status(400);
    throw new Error("Something went wrong");
    return;
  }

  if (body.length < 20) {
    res.status(400);
    throw new Error("Answer length must be at least 20 characters");
    return;
  }

  validQuestion.answerList.push({
    body: body,
    votes: 0,
    author: decodedToken.data.username,
    createdAt: moment(),
  });

  await validQuestion.save();

  res.status(201).send(validQuestion.answerList);
});

const vote = asyncHandler(async (req, res) => {
  // const {questionId, voteValue, answerId}
  let { questionId, voteValue, token } = req.body;
  if (!questionId || !voteValue || !token) {
    res.status(400).send("Invalid data");
    return;
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  if (!decodedToken) {
    res.status(400).send("Invalid token");
    return;
  }
  let user = await User.findById(decodedToken.data.id);
  if (!user) {
    res.status(400).send("Invalid token");
    return;
  }
  let question = await Question.findOne({ id: questionId });
  if (!question) {
    res.status(400).send("Invalid question id");
    return;
  }
  const obj = req.body;

  if (Object.hasOwn(obj, "answerId")) {
    let { questionId, voteValue, answerId, token } = req.body;
    if (answerId < 0 || answerId > question.answerList.length) {
      res.status(400).send("Invalid data");
      return;
    }
    if (question.answerList[answerId - 1].author === user.username) {
      console.log(answerId);

      res.status(400).send("Cannot vote to your answer");
      return;
    }
    let votesList = user.votesList;

    const alreadyVoted = votesList.find((obj) => {
      return obj.id === questionId && obj.answerId === answerId;
    });
    let isUpVote = true;
    if (Math.abs(voteValue) !== 1) {
      if (voteValue === -1) isUpVote = false;
      res.status(400).send("Something went wrong");
      return;
    }
    let response = {
      state: "done",
      voteCount: question.answerList[answerId - 1].votes,
    };
    let add = voteValue;
    if (alreadyVoted) {
      // if the same as the previous vote, reset the vote
      if (alreadyVoted.voteValue === voteValue) {
        add = -alreadyVoted.voteValue;
        response.state = "reset";
        const newArray = votesList.filter((elem) => {
          return elem.isQuestionVote || elem.answerId !== answerId;
        });

        user.votesList = newArray;
        await user.save();
      } else {
        add = voteValue === 1 ? 2 : -2;
        let index = votesList.findIndex((elem) => {
          return elem.id === questionId && elem.answerId === answerId;
        });

        votesList[index].voteValue = voteValue;
        user.votesList = votesList;
        await user.save();
      }
    } else {
      console.log(votesList);
      votesList.push({
        isQuestionVote: false,
        id: questionId,
        voteValue: voteValue,
        answerId: answerId,
      });
      user.voteList = votesList;
      await user.save();
    }

    question.answerList[answerId - 1].votes =
      question.answerList[answerId - 1].votes + add;
    await question.save();
    response.voteCount = question.answerList[answerId - 1].votes;
    console.log(user);
    response.votesList = user.votesList;
    response.token = generateToken({
      id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      votesList: user.votesList,
    });

    res.status(200).send(response);
  } else {
    let questionData = await Question.findOne({ id: questionId });

    if (question.author === user.username) {
      res.status(400).send("Cannot vote to yourself");
      return;
    }

    let votesList = user.votesList;
    const alreadyVoted = votesList.find((obj) => {
      return obj.id === questionId;
    });

    let isUpVote = true;
    if (Math.abs(voteValue) !== 1) {
      if (voteValue === -1) isUpVote = false;
      res.status(400).send("Something went wrong");
      return;
    }
    let response = { state: "done", voteCount: question.votes };
    let add = voteValue;
    if (alreadyVoted) {
      // if the same as the previous vote, reset the vote
      if (alreadyVoted.voteValue === voteValue) {
        add = -alreadyVoted.voteValue;
        response.state = "reset";
        const newArray = votesList.filter((elem) => {
          return elem.id !== questionId;
        });
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
      votesList.push({
        isQuestionVote: true,
        id: questionId,
        voteValue: voteValue,
      });
      user.voteList = votesList;
      await user.save();
    }
    question.votes = question.votes + add;
    await question.save();
    response.voteCount = question.votes;
    response.votesList = user.votesList;
    response.token = generateToken({
      id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      votesList: user.votesList,
    });

    res.status(200).send(response);
  }
});

const viewQuestion = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const ip = req.ip;
  if (!id) {
    res.status(400).send("invalid data");
    return;
  }
  if (!ip) {
    res.status(400).send("invalid data");
    return;
  }

  const question = await Question.findOne({ id: id });
  if (!question) {
    res.status(400).send("Invalid question id");
    return;
  }

  let viewsList = question.viewsList;
  const alreadyExists = viewsList.find((elem) => {
    return elem.ip == ip;
  });
  if (!alreadyExists) {
    question.viewsList.push({ ip: ip });
    await question.save();
  }

  res
    .status(200)
    .send({ viewsList: JSON.stringify(question.viewsList), question });
});
const getTags = asyncHandler(async (req, res) => {
  const allTags = await Tags.find({});
  const filteredData = filterTags(allTags);

  res.status(201).send(filteredData);
});

const generateToken = (data) => {
  return jwt.sign({ data }, process.env.JWT_SECRET, {
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
  answerQuestion,
  viewQuestion,
};
