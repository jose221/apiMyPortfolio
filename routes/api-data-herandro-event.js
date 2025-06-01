const Controller = require("../app/controllers/DataHerandroEventController");
const router = require('express').Router();
const AuthService = require('../app/services/AuthService');

let path = "/data-herandro-event";

/**
 * @swagger
 * /data-herandro-event:
 *   get:
 *     summary: Obtiene todos los eventos Herandro
 *     tags:
 *       - data-herandro-event
 *     description: Retorna una lista de todos los eventos Herandro.
 *     responses:
 *       200:
 *         description: Lista de eventos Herandro
 */
router.get(`${path}`, async (req, res) => Controller.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /data-herandro-event:
 *   post:
 *     summary: Crea un nuevo evento Herandro
 *     tags:
 *       - data-herandro-event
 *     description: Crea un nuevo evento Herandro con los datos especificados.
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
 *               fecha:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Evento creado correctamente
 */
router.post(`${path}`, async (req, res) => Controller.create(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /data-herandro-event/{id}:
 *   put:
 *     summary: Actualiza un evento Herandro por ID
 *     tags:
 *       - data-herandro-event
 *     description: Actualiza los datos de un evento Herandro usando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del evento Herandro
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
 *               fecha:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Evento actualizado correctamente
 */
router.put(`${path}/:id`, async (req, res) => Controller.update(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /data-herandro-event/{id}:
 *   delete:
 *     summary: Elimina un evento Herandro por ID
 *     tags:
 *       - data-herandro-event
 *     description: Elimina el evento Herandro correspondiente al ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del evento Herandro
 *     responses:
 *       200:
 *         description: Evento eliminado correctamente
 */
router.delete(`${path}/:id`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /data-herandro-event/delete:
 *   post:
 *     summary: Elimina un evento Herandro desde el body
 *     tags:
 *       - data-herandro-event
 *     description: Elimina un evento Herandro recibiendo el ID en el cuerpo de la petición.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID del evento a eliminar
 *     responses:
 *       200:
 *         description: Evento eliminado correctamente
 */
router.post(`${path}/delete`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

module.exports = router;