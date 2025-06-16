const Controller = require("../app/controllers/ModulesController");
const router = require('express').Router();
const AuthService = require('../app/services/AuthService');

let path = "/modules";

/**
 * @swagger
 * /modules:
 *   get:
 *     summary: Obtiene todos los módulos
 *     tags:
 *       - modules
 *     description: Retorna una lista de todos los módulos registrados.
 *     responses:
 *       200:
 *         description: Lista de módulos.
 */
router.get(`${path}`, async (req, res) => Controller.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /modules:
 *   post:
 *     summary: Crea un nuevo módulo
 *     tags:
 *       - modules
 *     description: Registra un nuevo módulo con los datos proporcionados.
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
 *         description: Módulo creado correctamente
 */
router.post(`${path}`, async (req, res) => Controller.create(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /modules/{id}:
 *   put:
 *     summary: Actualiza un módulo por ID
 *     tags:
 *       - modules
 *     description: Actualiza los datos de un módulo identificado por el ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del módulo
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
 *         description: Módulo actualizado correctamente
 */
router.put(`${path}/:id`, async (req, res) => Controller.update(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /modules/{id}:
 *   delete:
 *     summary: Elimina un módulo por ID
 *     tags:
 *       - modules
 *     description: Elimina el módulo correspondiente al ID dado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del módulo
 *     responses:
 *       200:
 *         description: Módulo eliminado correctamente
 */
router.delete(`${path}/:id`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /modules/delete:
 *   post:
 *     summary: Elimina un módulo desde el body
 *     tags:
 *       - modules
 *     description: Elimina un módulo proporcionando el ID mediante el cuerpo de la petición.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID del módulo a eliminar
 *     responses:
 *       200:
 *         description: Módulo eliminado correctamente
 */
router.post(`${path}/delete`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));


/**
 * @swagger
 * /modules/by-role:
 *   get:
 *     summary: Obtiene los módulos asignados al rol del usuario autenticado
 *     tags:
 *       - modules
 *     description: Retorna una lista de módulos accesibles según el rol del usuario que realiza la petición. Se requiere autenticación mediante el token enviado en el header `auth-token`.
 *     security:
 *       - auth-token: []
 *     responses:
 *       200:
 *         description: Lista de módulos accesibles por el rol.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID del módulo
 *                   nombre:
 *                     type: string
 *                     description: Nombre del módulo
 *                   descripcion:
 *                     type: string
 *                     description: Descripción del módulo
 *       401:
 *         description: Token de autenticación inválido o ausente
 */
router.get(`${path}/by-role`, async (req, res) => Controller.getByRole(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));
module.exports = router;