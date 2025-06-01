const UserController = require("../../app/controllers/UserController");
const MyContactsController = require("../../app/controllers/MyContactsController");
const MyKnowledgesController = require("../../app/controllers/KnowledgeController");
const MyPortfolioCategoriesController = require("../../app/controllers/PortfolioCategoriesController");
const MyPersonalProjectsController = require("../../app/controllers/PersonalProjectsController");
const MyProfessionalExperienceController = require("../../app/controllers/ProfessionalExperienceController");
const HerandroDataController = require("../../app/controllers/HerandroDataController");

const router = require('express').Router();
const AuthService = require('../../app/services/AuthService');

/**
 * @swagger
 * /my-information:
 *   get:
 *     summary: Obtiene información personal del usuario autenticado
 *     tags:
 *       - user
 *     responses:
 *       200:
 *         description: Información personal del usuario
 */
router.get('/my-information', async (req, res) => UserController.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token')), false));

/**
 * @swagger
 * /my-contacts:
 *   get:
 *     summary: Obtiene los contactos del usuario autenticado
 *     tags:
 *       - user
 *     responses:
 *       200:
 *         description: Contactos del usuario
 */
router.get('/my-contacts', async (req, res) => MyContactsController.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token')), false));

/**
 * @swagger
 * /my-knowledges:
 *   get:
 *     summary: Obtiene los conocimientos del usuario autenticado
 *     tags:
 *       - user
 *     responses:
 *       200:
 *         description: Conocimientos del usuario
 */
router.get('/my-knowledges', async (req, res) => MyKnowledgesController.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token')), false));

/**
 * @swagger
 * /my-portfolio-categories:
 *   get:
 *     summary: Obtiene las categorías de portafolio del usuario autenticado
 *     tags:
 *       - user
 *     responses:
 *       200:
 *         description: Categorías de portafolio del usuario
 */
router.get('/my-portfolio-categories', async (req, res) => MyPortfolioCategoriesController.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token')), false));

/**
 * @swagger
 * /my-personal-projects:
 *   get:
 *     summary: Obtiene los proyectos personales del usuario autenticado
 *     tags:
 *       - user
 *     responses:
 *       200:
 *         description: Proyectos personales del usuario
 */
router.get('/my-personal-projects', async (req, res) => MyPersonalProjectsController.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token')), false));

/**
 * @swagger
 * /my-professional-experiences:
 *   get:
 *     summary: Obtiene la experiencia profesional del usuario autenticado
 *     tags:
 *       - user
 *     responses:
 *       200:
 *         description: Experiencia profesional del usuario
 */
router.get('/my-professional-experiences', async (req, res) => MyProfessionalExperienceController.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token')), false));

/**
 * @swagger
 * /data-herandro:
 *   post:
 *     summary: Envía evento/data personalizada a Herandro
 *     tags:
 *       - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Evento recibido correctamente
 */
router.post('/data-herandro', async (req, res) => HerandroDataController.event(req, res));

module.exports = router;