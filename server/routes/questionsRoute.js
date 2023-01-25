const {Router} = require('express');
const questionsController = require('../controllers/questionsController');

const router = Router();

router.get('/questions', questionsController.getQuestions);

module.exports = router;