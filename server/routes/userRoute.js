const {Router} = require('express');
const userController = require('../controllers/userController');
const validateSignUpData = require('../middleware/validateSignUpData');

const router = Router();

router.post('/signup', validateSignUpData, userController.signup);

router.post('/login', userController.login);

router.post('/add-tag', userController.addTag);

router.get('/tags', userController.getTags);

router.post('/ask', userController.askQuestion);

router.get('/getquestions', userController.getQuestions);

router.post('/addcomment', userController.addComment);

router.post('/vote', userController.vote);

router.post('/answer', userController.answerQuestion);

router.post('/question/:id', userController.viewQuestion);

// TODO
/* 
 edit question (author or admin)
 change password
 update views
 


*/
module.exports = router;