const {Router} = require('express');
const userController = require('../controllers/userController');


const router = Router();



router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.post('/add-tag', userController.addTag);

router.get('/tags', userController.getTags);

router.post('/ask', userController.askQuestion);

router.get('/getquestions', userController.getQuestions);

router.post('/addcomment', userController.addComment);

router.post('/vote', userController.vote);

router.post('/answer', userController.answerQuestion);

// TODO
/* 
 add answer
 edit question (author or admin)
 change password
 


*/
module.exports = router;