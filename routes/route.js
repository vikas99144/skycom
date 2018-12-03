const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signup_controller');
const loginController = require('../controllers/login_controller');
const indexController = require('../controllers/index_controller');
const dashboardController = require('../controllers/dashboard_controller');
router.get('/',indexController.indexPage);


router.get('/signup',signupController.getSignup);
router.post('/signup',signupController.postSignup);

router.get('/login', loginController.getLogin);
router.post('/login', loginController.postLogin);

router.get('/dashboard', dashboardController.getDashboard);

module.exports = router;
