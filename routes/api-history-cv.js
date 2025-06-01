const Controller = require("../app/controllers/HistoryCurriculumVitaeController");
const router = require('express').Router();
const AuthService = require('../app/services/AuthService');

let path = "/history-curriculum-vitae";

/**
 * @swagger
 * /history-curriculum-vitae:
 *   get:
 *     summary: Obtiene todos los historiales de curriculum vitae
 *     tags:
 *       - history-curriculum-vitae
 *     description: Retorna una lista de todos los historiales de curriculum vitae.
 *     responses:
 *       200:
 *         description: Lista de currículums.
 */
router.get(`${path}`, async (req, res) => Controller.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /history-curriculum-vitae/{id}:
 *   get:
 *     summary: Obtiene un historial de curriculum vitae por ID
 *     tags:
 *       - history-curriculum-vitae
 *     description: Retorna la información de un historial de curriculum vitae usando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del historial de curriculum vitae
 *     responses:
 *       200:
 *         description: Detalle del historial
 */
router.get(`${path}/:id`, async (req, res) => Controller.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /history-curriculum-vitae:
 *   post:
 *     summary: Crea un nuevo historial de curriculum vitae
 *     tags:
 *       - history-curriculum-vitae
 *     description: Crea un nuevo historial de curriculum vitae con los datos especificados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: string
 *               experiencia:
 *                 type: string
 *               educacion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Currículum creado correctamente
 */
router.post(`${path}`, async (req, res) => Controller.create(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /history-curriculum-vitae/{id}:
 *   put:
 *     summary: Actualiza un historial de curriculum vitae por ID
 *     tags:
 *       - history-curriculum-vitae
 *     description: Actualiza los datos del historial de curriculum vitae identificado por el ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del historial de curriculum vitae
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               experiencia:
 *                 type: string
 *               educacion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Currículum actualizado correctamente
 */
router.put(`${path}/:id`, async (req, res) => Controller.update(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /history-curriculum-vitae/{id}:
 *   delete:
 *     summary: Elimina un historial de curriculum vitae por ID
 *     tags:
 *       - history-curriculum-vitae
 *     description: Elimina un historial de curriculum vitae según el ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del historial de curriculum vitae
 *     responses:
 *       200:
 *         description: Currículum eliminado correctamente
 */
router.delete(`${path}/:id`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /history-curriculum-vitae/delete:
 *   post:
 *     summary: Elimina un historial de curriculum vitae desde el body
 *     tags:
 *       - history-curriculum-vitae
 *     description: Elimina un historial de curriculum vitae recibiendo el ID por el cuerpo de la petición.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID del historial de curriculum vitae a eliminar
 *     responses:
 *       200:
 *         description: Currículum eliminado correctamente
 */
router.post(`${path}/delete`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

module.exports = router;