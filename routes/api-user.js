const Controller = require("../app/controllers/UserController");
const router = require('express').Router();
const AuthService = require('../app/services/AuthService');
const validateTokenAdmin = require("../app/middlewares/validateTokenAdmin");

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags:
 *       - user
 *     description: Retorna una lista de usuarios.
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get('/user', async (req, res) => Controller.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Obtiene información de un usuario por ID
 *     tags:
 *       - user
 *     description: Retorna la información del usuario correspondiente al ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Detalle del usuario
 */
router.get('/user/:id', async (req, res) => Controller.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Actualiza información de un usuario
 *     tags:
 *       - user
 *     description: Actualiza los datos de un usuario por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 */
router.put('/user/:id', async (req, res) => Controller.update(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     tags:
 *       - user
 *     description: Elimina el usuario correspondiente al ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 */
router.delete('/user/:id', async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /user/delete:
 *   post:
 *     summary: Elimina un usuario usando el body
 *     tags:
 *       - user
 *     description: Elimina un usuario recibiendo datos en el body de la petición.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 */
router.post('/user/delete', async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

module.exports = router;