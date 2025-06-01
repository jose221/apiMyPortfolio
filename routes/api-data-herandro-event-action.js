const Controller = require("../app/controllers/DataHerandroEventActionController");
const router = require('express').Router();
const AuthService = require('../app/services/AuthService');

let path = "/data-herandro-event-action";

/**
 * @swagger
 * /data-herandro-event-action:
 *   get:
 *     summary: Obtiene todas las acciones de eventos Herandro
 *     tags:
 *       - data-herandro-event-action
 *     description: Retorna una lista de todas las acciones de eventos Herandro.
 *     responses:
 *       200:
 *         description: Lista de acciones de eventos Herandro
 */
router.get(`${path}`, async (req, res) => Controller.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /data-herandro-event-action:
 *   post:
 *     summary: Crea una nueva acción de evento Herandro
 *     tags:
 *       - data-herandro-event-action
 *     description: Crea una nueva acción asociada a un evento Herandro.
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
 *               eventoId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Acción creada correctamente
 */
router.post(`${path}`, async (req, res) => Controller.create(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /data-herandro-event-action/{id}:
 *   put:
 *     summary: Actualiza una acción de evento Herandro por ID
 *     tags:
 *       - data-herandro-event-action
 *     description: Actualiza los datos de una acción de evento Herandro usando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la acción de evento Herandro
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
 *               eventoId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Acción actualizada correctamente
 */
router.put(`${path}/:id`, async (req, res) => Controller.update(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /data-herandro-event-action/{id}:
 *   delete:
 *     summary: Elimina una acción de evento Herandro por ID
 *     tags:
 *       - data-herandro-event-action
 *     description: Elimina la acción de evento Herandro correspondiente al ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la acción de evento Herandro
 *     responses:
 *       200:
 *         description: Acción eliminada correctamente
 */
router.delete(`${path}/:id`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /data-herandro-event-action/delete:
 *   post:
 *     summary: Elimina una acción de evento Herandro desde el body
 *     tags:
 *       - data-herandro-event-action
 *     description: Elimina una acción de evento Herandro recibiendo el ID por el cuerpo de la petición.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID de la acción de evento a eliminar
 *     responses:
 *       200:
 *         description: Acción eliminada correctamente
 */
router.post(`${path}/delete`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

module.exports = router;
