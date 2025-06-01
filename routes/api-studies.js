const Controller = require("../app/controllers/StudiesController");
const router = require('express').Router();
const AuthService = require('../app/services/AuthService');

let path = "/studies";

/**
 * @swagger
 * /studies:
 *   get:
 *     summary: Obtiene todos los estudios
 *     tags:
 *       - studies
 *     description: Retorna una lista de todos los estudios registrados.
 *     responses:
 *       200:
 *         description: Lista de estudios.
 */
router.get(`${path}`, async (req, res) => Controller.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /studies:
 *   post:
 *     summary: Crea un nuevo estudio
 *     tags:
 *       - studies
 *     description: Registra un nuevo estudio con los datos proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               institucion:
 *                 type: string
 *               titulo:
 *                 type: string
 *               fecha_inicio:
 *                 type: string
 *                 format: date
 *               fecha_fin:
 *                 type: string
 *                 format: date
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Estudio creado correctamente
 */
router.post(`${path}`, async (req, res) => Controller.create(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /studies/{id}:
 *   put:
 *     summary: Actualiza un estudio por ID
 *     tags:
 *       - studies
 *     description: Actualiza los datos de un estudio identificado por el ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del estudio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               institucion:
 *                 type: string
 *               titulo:
 *                 type: string
 *               fecha_inicio:
 *                 type: string
 *                 format: date
 *               fecha_fin:
 *                 type: string
 *                 format: date
 *               descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Estudio actualizado correctamente
 */
router.put(`${path}/:id`, async (req, res) => Controller.update(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /studies/{id}:
 *   delete:
 *     summary: Elimina un estudio por ID
 *     tags:
 *       - studies
 *     description: Elimina el estudio correspondiente al ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del estudio
 *     responses:
 *       200:
 *         description: Estudio eliminado correctamente
 */
router.delete(`${path}/:id`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /studies/delete:
 *   post:
 *     summary: Elimina un estudio desde el body
 *     tags:
 *       - studies
 *     description: Elimina un estudio proporcionando el ID mediante el cuerpo de la petición.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID del estudio a eliminar
 *     responses:
 *       200:
 *         description: Estudio eliminado correctamente
 */
router.post(`${path}/delete`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

module.exports = router;