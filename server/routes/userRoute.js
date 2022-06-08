const {Router} = require('express');
const userController = require('../controllers/userController');


const router = Router();

router.post('/signup', userController.signup);

router.post('/login', userController.login);

module.exports = router;