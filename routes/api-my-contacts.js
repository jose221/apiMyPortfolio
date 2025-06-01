const Controller = require("../app/controllers/MyContactsController");
const router = require('express').Router();
const AuthService = require('../app/services/AuthService');

let path = "/my-contacts";

/**
 * @swagger
 * /my-contacts:
 *   get:
 *     summary: Obtiene todos los contactos
 *     tags:
 *       - my-contacts
 *     description: Retorna una lista de todos los contactos asociados al usuario.
 *     responses:
 *       200:
 *         description: Lista de contactos.
 */
router.get(`${path}`, async (req, res) => Controller.get(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /my-contacts:
 *   post:
 *     summary: Crea un nuevo contacto
 *     tags:
 *       - my-contacts
 *     description: Registra un nuevo contacto para el usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               telefono:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contacto creado correctamente
 */
router.post(`${path}`, async (req, res) => Controller.create(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /my-contacts/{id}:
 *   put:
 *     summary: Actualiza un contacto por ID
 *     tags:
 *       - my-contacts
 *     description: Actualiza la información de un contacto identificado por el ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del contacto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               telefono:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contacto actualizado correctamente
 */
router.put(`${path}/:id`, async (req, res) => Controller.update(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /my-contacts/{id}:
 *   delete:
 *     summary: Elimina un contacto por ID
 *     tags:
 *       - my-contacts
 *     description: Elimina el contacto correspondiente al ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del contacto
 *     responses:
 *       200:
 *         description: Contacto eliminado correctamente
 */
router.delete(`${path}/:id`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /my-contacts/delete:
 *   post:
 *     summary: Elimina un contacto desde el body
 *     tags:
 *       - my-contacts
 *     description: Elimina un contacto proporcionando el ID mediante el cuerpo de la petición.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID del contacto a eliminar
 *     responses:
 *       200:
 *         description: Contacto eliminado correctamente
 */
router.post(`${path}/delete`, async (req, res) => Controller.delete(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

module.exports = router;