const asyncHandler = require("express-async-handler");
const question = require("../model/question");
const Question = require("../model/question");

const getQuestions = asyncHandler(async (req, res) => {
  // get the number of questions and question content based
  // on filter and number of questions per page
  let { tab, page, perpage } = req.query;
  page = parseInt(page);
  perpage = parseInt(perpage);
  if (
    !tab ||
    !page ||
    !perpage ||
    !(perpage === 15 || perpage === 30 || perpage === 50)
  ) {
    res.status(400).send("invalid");
    return;
  }

  const questions = await Question.find({});
  const totalPages = Math.ceil(questions.length / perpage);
  if (page > totalPages) {
    res.status(400).send("invalid page number");
    return;
  }
  const questionsCount = questions.length;
  const startIndex = (page - 1) * perpage;
  const endIndex = Math.min(startIndex + perpage, questions.length);
  console.log(startIndex, endIndex);
 
  const result = {questionsCount: questionsCount, questions: questions.slice(startIndex, endIndex)};
  res.status(200).send(result);
  switch (tab) {
    case "newest":

    case "active":

    case "unanswered":

    case "score":

    default:
    // TODO
  }
  console.log(req.query);
  console.log("heyyyooo");
});

module.exports = {
  getQuestions,
};
