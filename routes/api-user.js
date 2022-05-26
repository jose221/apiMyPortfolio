const Controller = require("../app/controllers/UserController");
const router = require('express').Router();
const AuthService = require('../app/services/AuthService');
const validateTokenAdmin = require("../app/middlewares/validateTokenAdmin");
router.get('/user', async (req, res) => Controller.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));
router.put('/user/:id', async (req, res) => Controller.update(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));
router.delete('/user/:id', async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

module.exports = router;
