const AuthController = require("../app/controllers/AuthController");
const router = require('express').Router();

router.post('/login',(req, res) => AuthController.login(req, res));
router.post('/register',(req, res) => AuthController.register(req, res));
router.post('/logout',(req, res) => AuthController.logout(req, res));

module.exports = router;
