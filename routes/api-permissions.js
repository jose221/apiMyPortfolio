const Controller = require("../app/controllers/PermissionsController");
const router = require('express').Router();
const AuthService = require('../app/services/AuthService');

let path = "/permissions";

/**
 * @swagger
 * /permissions:
 *   get:
 *     summary: Obtiene todos los permisos
 *     tags:
 *       - permissions
 *     description: Retorna una lista de todos los permisos disponibles.
 *     responses:
 *       200:
 *         description: Lista de permisos.
 */
router.get(`${path}`, async (req, res) => Controller.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /permissions:
 *   post:
 *     summary: Crea un nuevo permiso
 *     tags:
 *       - permissions
 *     description: Registra un nuevo permiso con los datos proporcionados.
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
 *         description: Permiso creado correctamente
 */
router.post(`${path}`, async (req, res) => Controller.create(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /permissions/{id}:
 *   put:
 *     summary: Actualiza un permiso por ID
 *     tags:
 *       - permissions
 *     description: Actualiza los datos de un permiso identificado por el ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del permiso
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
 *         description: Permiso actualizado correctamente
 */
router.put(`${path}/:id`, async (req, res) => Controller.update(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /permissions/{id}:
 *   delete:
 *     summary: Elimina un permiso por ID
 *     tags:
 *       - permissions
 *     description: Elimina el permiso correspondiente al ID dado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del permiso
 *     responses:
 *       200:
 *         description: Permiso eliminado correctamente
 */
router.delete(`${path}/:id`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /permissions/delete:
 *   post:
 *     summary: Elimina un permiso desde el body
 *     tags:
 *       - permissions
 *     description: Elimina un permiso proporcionando el ID mediante el cuerpo de la petición.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID del permiso a eliminar
 *     responses:
 *       200:
 *         description: Permiso eliminado correctamente
 */
router.post(`${path}/delete`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

module.exports = router;