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

// TODO
/* 
 upvote
 downvote
 add comment
 add answer
 edit question (author or admin)
 change password
 


*/
module.exports = router;