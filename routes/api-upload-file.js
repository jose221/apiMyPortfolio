const Controller = require("../app/controllers/FilesController");
const router = require('express').Router();
const AuthService = require('../app/services/AuthService');


let path = "/upload";

router.post(path, async (req, res, )=> await Controller.add(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));
router.delete(path, async (req, res, )=> await Controller.remove(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));
module.exports = router;