const Controller = require("../app/controllers/MessagesController");
const router = require('express').Router();
const AuthService = require('../app/services/AuthService');

let path = "/messages";

/**
 * @swagger
 * /messages:
 *   get:
 *     summary: Obtiene todos los mensajes
 *     tags:
 *       - messages
 *     description: Retorna una lista de todos los mensajes registrados.
 *     responses:
 *       200:
 *         description: Lista de mensajes.
 */
router.get(`${path}`, async (req, res) => Controller.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Crea un nuevo mensaje
 *     tags:
 *       - messages
 *     description: Registra un nuevo mensaje con los datos proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contenido:
 *                 type: string
 *               usuarioId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mensaje creado correctamente
 */
router.post(`${path}`, async (req, res) => Controller.create(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /messages/{id}:
 *   put:
 *     summary: Actualiza un mensaje por ID
 *     tags:
 *       - messages
 *     description: Actualiza los datos de un mensaje existente identificado por el ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del mensaje
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contenido:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mensaje actualizado correctamente
 */
router.put(`${path}/:id`, async (req, res) => Controller.update(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /messages/{id}:
 *   delete:
 *     summary: Elimina un mensaje por ID
 *     tags:
 *       - messages
 *     description: Elimina el mensaje correspondiente al ID dado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del mensaje
 *     responses:
 *       200:
 *         description: Mensaje eliminado correctamente
 */
router.delete(`${path}/:id`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

module.exports = router;