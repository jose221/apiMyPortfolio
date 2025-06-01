const Controller = require("../app/controllers/ProfessionalExperienceController");
const router = require('express').Router();
const AuthService = require('../app/services/AuthService');

let path = "/professional-experience";

/**
 * @swagger
 * /professional-experience:
 *   get:
 *     summary: Obtiene toda la experiencia profesional
 *     tags:
 *       - professional-experience
 *     description: Retorna una lista de toda la experiencia profesional registrada.
 *     responses:
 *       200:
 *         description: Lista de experiencias profesionales.
 */
router.get(`${path}`, async (req, res) => Controller.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /professional-experience:
 *   post:
 *     summary: Crea una nueva experiencia profesional
 *     tags:
 *       - professional-experience
 *     description: Registra una nueva experiencia profesional con los datos proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               puesto:
 *                 type: string
 *               empresa:
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
 *         description: Experiencia profesional creada correctamente
 */
router.post(`${path}`, async (req, res) => Controller.create(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /professional-experience/{id}:
 *   put:
 *     summary: Actualiza una experiencia profesional por ID
 *     tags:
 *       - professional-experience
 *     description: Actualiza los datos de una experiencia profesional identificada por el ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la experiencia profesional
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               puesto:
 *                 type: string
 *               empresa:
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
 *         description: Experiencia profesional actualizada correctamente
 */
router.put(`${path}/:id`, async (req, res) => Controller.update(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /professional-experience/{id}:
 *   delete:
 *     summary: Elimina una experiencia profesional por ID
 *     tags:
 *       - professional-experience
 *     description: Elimina la experiencia profesional correspondiente al ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la experiencia profesional
 *     responses:
 *       200:
 *         description: Experiencia profesional eliminada correctamente
 */
router.delete(`${path}/:id`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /professional-experience/delete:
 *   post:
 *     summary: Elimina una experiencia profesional desde el body
 *     tags:
 *       - professional-experience
 *     description: Elimina una experiencia profesional proporcionando el ID mediante el cuerpo de la petición.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID de la experiencia profesional a eliminar
 *     responses:
 *       200:
 *         description: Experiencia profesional eliminada correctamente
 */
router.post(`${path}/delete`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

module.exports = router;