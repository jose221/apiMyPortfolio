const Controller = require("../app/controllers/FilesController");
const router = require('express').Router();
const AuthService = require('../app/services/AuthService');

let path = "/upload";

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Sube un archivo
 *     tags:
 *       - files
 *     description: Permite subir un archivo al servidor.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Archivo subido correctamente
 */
router.post(path, async (req, res) => await Controller.add(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

/**
 * @swagger
 * /upload:
 *   delete:
 *     summary: Elimina un archivo
 *     tags:
 *       - files
 *     description: Elimina un archivo del servidor mediante la información enviada en el cuerpo de la petición.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filename:
 *                 type: string
 *                 description: Nombre del archivo a eliminar
 *     responses:
 *       200:
 *         description: Archivo eliminado correctamente
 */
router.delete(path, async (req, res) => await Controller.remove(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));

module.exports = router;