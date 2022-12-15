const Controller = require("../app/controllers/ProfessionalExperienceController");
const router = require('express').Router();
const AuthService = require('../app/services/AuthService');


router.get('/professional-experience', async (req, res) => Controller.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));
router.put('/professional-experience/:id', async (req, res) => Controller.update(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));
router.delete('/professional-experience/:id', async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));


module.exports = router;