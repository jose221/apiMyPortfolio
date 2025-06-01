const Controller = require("../app/controllers/PortfolioCategoriesController");
const router = require('express').Router();
const AuthService = require('../app/services/AuthService');

let path = "/portfolio-categories";

/**
 * @swagger
 * /portfolio-categories:
 *   get:
 *     summary: Obtiene todas las categorías de portafolio
 *     tags:
 *       - portfolio-categories
 *     description: Retorna una lista de todas las categorías de portafolio disponibles.
 *     responses:
 *       200:
 *         description: Lista de categorías de portafolio.
 */
router.get(`${path}`, async (req, res) => Controller.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /portfolio-categories/{id}:
 *   get:
 *     summary: Obtiene una categoría de portafolio por ID
 *     tags:
 *       - portfolio-categories
 *     description: Retorna una única categoría de portafolio identificada por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría de portafolio
 *     responses:
 *       200:
 *         description: Categoría encontrada
 */
router.get(`${path}/:id`, async (req, res) => Controller.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /portfolio-categories:
 *   post:
 *     summary: Crea una nueva categoría de portafolio
 *     tags:
 *       - portfolio-categories
 *     description: Registra una nueva categoría de portafolio con los datos proporcionados.
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
 *         description: Categoría de portafolio creada correctamente
 */
router.post(`${path}`, async (req, res) => Controller.create(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /portfolio-categories/{id}:
 *   put:
 *     summary: Actualiza una categoría de portafolio por ID
 *     tags:
 *       - portfolio-categories
 *     description: Actualiza una categoría de portafolio identificada por el ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría de portafolio
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
 *         description: Categoría de portafolio actualizada correctamente
 */
router.put(`${path}/:id`, async (req, res) => Controller.update(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /portfolio-categories/{id}:
 *   delete:
 *     summary: Elimina una categoría de portafolio por ID
 *     tags:
 *       - portfolio-categories
 *     description: Elimina una categoría de portafolio identificada por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría de portafolio
 *     responses:
 *       200:
 *         description: Categoría de portafolio eliminada correctamente
 */
router.delete(`${path}/:id`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /portfolio-categories/delete:
 *   post:
 *     summary: Elimina una categoría de portafolio desde el body
 *     tags:
 *       - portfolio-categories
 *     description: Elimina una categoría de portafolio proporcionando el ID mediante el cuerpo de la petición.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID de la categoría de portafolio a eliminar
 *     responses:
 *       200:
 *         description: Categoría de portafolio eliminada correctamente
 */
router.post(`${path}/delete`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

module.exports = router;