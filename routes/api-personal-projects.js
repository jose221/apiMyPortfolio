const Controller = require("../app/controllers/PersonalProjectsController");
const router = require('express').Router();
const AuthService = require('../app/services/AuthService');

let path = "/personal-projects";

/**
 * @swagger
 * /personal-projects:
 *   get:
 *     summary: Obtiene todos los proyectos personales
 *     tags:
 *       - personal-projects
 *     description: Retorna una lista de todos los proyectos personales registrados.
 *     responses:
 *       200:
 *         description: Lista de proyectos personales.
 */
router.get(`${path}`, async (req, res) => Controller.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /personal-projects:
 *   post:
 *     summary: Crea un nuevo proyecto personal
 *     tags:
 *       - personal-projects
 *     description: Registra un nuevo proyecto personal con los datos proporcionados.
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
 *               fecha_inicio:
 *                 type: string
 *                 format: date
 *               fecha_fin:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Proyecto personal creado correctamente
 */
router.post(`${path}`, async (req, res) => Controller.create(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /personal-projects/{id}:
 *   put:
 *     summary: Actualiza un proyecto personal por ID
 *     tags:
 *       - personal-projects
 *     description: Actualiza los datos de un proyecto personal identificado por el ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del proyecto personal
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
 *               fecha_inicio:
 *                 type: string
 *                 format: date
 *               fecha_fin:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Proyecto personal actualizado correctamente
 */
router.put(`${path}/:id`, async (req, res) => Controller.update(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /personal-projects/{id}:
 *   delete:
 *     summary: Elimina un proyecto personal por ID
 *     tags:
 *       - personal-projects
 *     description: Elimina el proyecto personal correspondiente al ID dado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del proyecto personal
 *     responses:
 *       200:
 *         description: Proyecto personal eliminado correctamente
 */
router.delete(`${path}/:id`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /personal-projects/delete:
 *   post:
 *     summary: Elimina un proyecto personal desde el body
 *     tags:
 *       - personal-projects
 *     description: Elimina un proyecto proporcionando el ID mediante el cuerpo de la petición.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID del proyecto personal a eliminar
 *     responses:
 *       200:
 *         description: Proyecto personal eliminado correctamente
 */
router.post(`${path}/delete`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

module.exports = router;