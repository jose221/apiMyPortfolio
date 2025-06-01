const Controller = require("../app/controllers/PortfoliosController");
const router = require('express').Router();
const AuthService = require('../app/services/AuthService');

let path = "/portfolios";

/**
 * @swagger
 * /portfolios:
 *   get:
 *     summary: Obtiene todos los portafolios
 *     tags:
 *       - portfolios
 *     description: Retorna una lista de todos los portafolios registrados.
 *     responses:
 *       200:
 *         description: Lista de portafolios.
 */
router.get(`${path}`, async (req, res) => Controller.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /portfolios:
 *   post:
 *     summary: Crea un nuevo portafolio
 *     tags:
 *       - portfolios
 *     description: Registra un nuevo portafolio con los datos proporcionados.
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
 *               categoria_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Portafolio creado correctamente
 */
router.post(`${path}`, async (req, res) => Controller.create(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /portfolios/{id}:
 *   put:
 *     summary: Actualiza un portafolio por ID
 *     tags:
 *       - portfolios
 *     description: Actualiza los datos de un portafolio identificado por el ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del portafolio
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
 *               categoria_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Portafolio actualizado correctamente
 */
router.put(`${path}/:id`, async (req, res) => Controller.update(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /portfolios/{id}:
 *   delete:
 *     summary: Elimina un portafolio por ID
 *     tags:
 *       - portfolios
 *     description: Elimina el portafolio correspondiente al ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del portafolio
 *     responses:
 *       200:
 *         description: Portafolio eliminado correctamente
 */
router.delete(`${path}/:id`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /portfolios/delete:
 *   post:
 *     summary: Elimina un portafolio desde el body
 *     tags:
 *       - portfolios
 *     description: Elimina un portafolio proporcionando el ID mediante el cuerpo de la petición.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID del portafolio a eliminar
 *     responses:
 *       200:
 *         description: Portafolio eliminado correctamente
 */
router.post(`${path}/delete`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

module.exports = router;