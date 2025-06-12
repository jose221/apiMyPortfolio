const Controller = require("../app/controllers/RolesController");
const router = require('express').Router();
const AuthService = require('../app/services/AuthService');

let path = "/roles";

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Obtiene todos los roles
 *     tags:
 *       - roles
 *     description: Retorna una lista de todos los roles registrados.
 *     responses:
 *       200:
 *         description: Lista de roles.
 */
router.get(`${path}`, async (req, res) => Controller.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Crea un nuevo rol
 *     tags:
 *       - roles
 *     description: Registra un nuevo rol con los datos proporcionados.
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
 *         description: Rol creado correctamente
 */
router.post(`${path}`, async (req, res) => Controller.create(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Actualiza un rol por ID
 *     tags:
 *       - roles
 *     description: Actualiza los datos de un rol identificado por el ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del rol
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
 *         description: Rol actualizado correctamente
 */
router.put(`${path}/:id`, async (req, res) => Controller.update(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Elimina un rol por ID
 *     tags:
 *       - roles
 *     description: Elimina el rol correspondiente al ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Rol eliminado correctamente
 */
router.delete(`${path}/:id`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /roles/delete:
 *   post:
 *     summary: Elimina un rol desde el body
 *     tags:
 *       - roles
 *     description: Elimina un rol proporcionando el ID mediante el cuerpo de la petición.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID del rol a eliminar
 *     responses:
 *       200:
 *         description: Rol eliminado correctamente
 */
router.post(`${path}/delete`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

module.exports = router;