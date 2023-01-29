const asyncHandler = require("express-async-handler");
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

  let questions = await Question.find({});
  if (tab === "score") {
    questions.sort((a, b) => {
      if (a.votes !== b.votes)
        return b.votes - a.votes;
      
      a = new Date(a.createdAt);
      b = new Date(b.createdAt);
      return b.getTime() - a.getTime();
      
    });
  } else if (tab === "unanswered") {
    questions = questions.filter((elem) => {
      return elem.answerList.length === 0;
    });
    questions.reverse();
  } else if (tab === "newest") {
    questions.reverse();
  }
  const totalPages = Math.ceil(questions.length / perpage);
  if (page > totalPages) {
    res.status(400).send("invalid page number");
    return;
  }
  let questionsCount = questions.length;

  const startIndex = (page - 1) * perpage;
  const endIndex = Math.min(startIndex + perpage, questions.length);
  console.log(startIndex, endIndex);

  const result = {
    questionsCount: questionsCount,
    questions: questions.slice(startIndex, endIndex),
  };
  res.status(200).send(result);
});

module.exports = {
  getQuestions,
};
