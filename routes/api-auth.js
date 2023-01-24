const AuthController = require("../app/controllers/AuthController");
const AuthService = require("../app/services/AuthService");
const router = require('express').Router();

router.post('/login',(req, res) => AuthController.login(req, res));
router.post('/get-token',(req, res) => AuthController.getToken(req, res));
router.post('/verify-token',(req, res) => AuthController.verifyToken(req, res));
router.post('/register',(req, res) => AuthController.register(req, res));
router.post('/logout',(req, res) => AuthController.logout(req, res));

module.exports = router;
