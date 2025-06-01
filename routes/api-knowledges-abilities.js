const Controller = require("../app/controllers/KnowledgesAbilitiesController");
const router = require('express').Router();
const AuthService = require('../app/services/AuthService');

let path = "/knowledges-abilities";

/**
 * @swagger
 * /knowledges-abilities:
 *   get:
 *     summary: Obtiene todas las habilidades asociadas a conocimientos
 *     tags:
 *       - knowledges-abilities
 *     description: Retorna una lista de todas las habilidades vinculadas a conocimientos.
 *     responses:
 *       200:
 *         description: Lista de habilidades de conocimientos.
 */
router.get(`${path}`, async (req, res) => Controller.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /knowledges-abilities:
 *   post:
 *     summary: Crea una nueva habilidad asociada a un conocimiento
 *     tags:
 *       - knowledges-abilities
 *     description: Registra una nueva habilidad para un conocimiento específico.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               knowledgeId:
 *                 type: string
 *               habilidad:
 *                 type: string
 *     responses:
 *       201:
 *         description: Habilidad creada correctamente
 */
router.post(`${path}`, async (req, res) => Controller.create(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /knowledges-abilities/{id}:
 *   put:
 *     summary: Actualiza una habilidad de conocimiento por ID
 *     tags:
 *       - knowledges-abilities
 *     description: Actualiza una habilidad asociada a conocimiento identificada por el ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la habilidad de conocimiento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               habilidad:
 *                 type: string
 *     responses:
 *       200:
 *         description: Habilidad actualizada correctamente
 */
router.put(`${path}/:id`, async (req, res) => Controller.update(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /knowledges-abilities/{id}:
 *   delete:
 *     summary: Elimina una habilidad de conocimiento por ID
 *     tags:
 *       - knowledges-abilities
 *     description: Elimina la habilidad de conocimiento correspondiente al ID dado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la habilidad de conocimiento
 *     responses:
 *       200:
 *         description: Habilidad eliminada correctamente
 */
router.delete(`${path}/:id`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /knowledges-abilities/delete:
 *   post:
 *     summary: Elimina una habilidad de conocimiento desde el body
 *     tags:
 *       - knowledges-abilities
 *     description: Elimina una habilidad de conocimiento proporcionando el ID en el cuerpo de la petición.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID de la habilidad a eliminar
 *     responses:
 *       200:
 *         description: Habilidad eliminada correctamente
 */
router.post(`${path}/delete`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

module.exports = router;