const Controller = require("../app/controllers/KnowledgeController");
const router = require('express').Router();
const AuthService = require('../app/services/AuthService');

let path = "/knowledges";

/**
 * @swagger
 * /knowledges:
 *   get:
 *     summary: Obtiene todos los conocimientos
 *     tags:
 *       - knowledges
 *     description: Retorna una lista de todos los conocimientos registrados.
 *     responses:
 *       200:
 *         description: Lista de conocimientos.
 */
router.get(`${path}`, async (req, res) => Controller.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /knowledges/{id}:
 *   get:
 *     summary: Obtiene un conocimiento por ID
 *     tags:
 *       - knowledges
 *     description: Retorna un conocimiento específico usando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del conocimiento
 *     responses:
 *       200:
 *         description: Detalle del conocimiento
 */
router.get(`${path}/:id`, async (req, res) => Controller.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /knowledges:
 *   post:
 *     summary: Crea un nuevo conocimiento
 *     tags:
 *       - knowledges
 *     description: Registra un nuevo conocimiento con los datos proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Conocimiento creado correctamente
 */
router.post(`${path}`, async (req, res) => Controller.create(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /knowledges/{id}:
 *   put:
 *     summary: Actualiza un conocimiento por ID
 *     tags:
 *       - knowledges
 *     description: Actualiza los datos de un conocimiento existente identificado por el ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del conocimiento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Conocimiento actualizado correctamente
 */
router.put(`${path}/:id`, async (req, res) => Controller.update(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /knowledges/{id}:
 *   delete:
 *     summary: Elimina un conocimiento por ID
 *     tags:
 *       - knowledges
 *     description: Elimina el conocimiento correspondiente al ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del conocimiento
 *     responses:
 *       200:
 *         description: Conocimiento eliminado correctamente
 */
router.delete(`${path}/:id`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /knowledges/delete:
 *   post:
 *     summary: Elimina un conocimiento desde el body
 *     tags:
 *       - knowledges
 *     description: Elimina un conocimiento proporcionando el ID en el cuerpo de la petición.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID del conocimiento a eliminar
 *     responses:
 *       200:
 *         description: Conocimiento eliminado correctamente
 */
router.post(`${path}/delete`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

module.exports = router;