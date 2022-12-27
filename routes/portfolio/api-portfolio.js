const UserController = require("../../app/controllers/UserController");
const MyContactsController = require("../../app/controllers/MyContactsController");
const MyKnowledgesController = require("../../app/controllers/KnowledgeController");
const MyPortfolioCategoriesController = require("../../app/controllers/PortfolioCategoriesController");
const MyPersonalProjectsController = require("../../app/controllers/PersonalProjectsController");
const MyProfessionalExperienceController = require("../../app/controllers/ProfessionalExperienceController");

const router = require('express').Router();
const AuthService = require('../../app/services/AuthService');

router.get('/my-information', async (req, res) => UserController.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token')), false));
router.get('/my-contacts', async (req, res) => MyContactsController.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token')), false));
router.get('/my-knowledges', async (req, res) => MyKnowledgesController.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token')), false));
router.get('/my-portfolio-categories', async (req, res) => MyPortfolioCategoriesController.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token')), false));
router.get('/my-personal-projects', async (req, res) => MyPersonalProjectsController.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token')), false));
router.get('/my-professional-experiences', async (req, res) => MyProfessionalExperienceController.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token')), false));

module.exports = router;