const Controller = require("../app/controllers/HistoryCurriculumVitaeController");
const router = require('express').Router();
const AuthService = require('../app/services/AuthService');

let path = "/history-curriculum-vitae";

router.get(`${path}`, async (req, res) => Controller.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));
router.get(`${path}/:id`, async (req, res) => Controller.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));
router.post(`${path}`, async (req, res) => Controller.create(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));
router.put(`${path}/:id`, async (req, res) => Controller.update(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));
router.delete(`${path}/:id`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));
router.post(`${path}/delete`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

module.exports = router;