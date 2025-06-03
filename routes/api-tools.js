const Controller = require("../app/controllers/ToolController");
const router = require('express').Router();
const AuthService = require('../app/services/AuthService');

/**
 * @swagger
 * /tools/translate:
 *   get:
 *     summary: Traduce un texto al idioma especificado
 *     tags:
 *       - Tools
 *     parameters:
 *       - in: query
 *         name: language
 *         required: true
 *         schema:
 *           type: string
 *         description: Código del idioma al que se traducirá el texto (por ejemplo, "en", "es")
 *       - in: query
 *         name: text
 *         required: true
 *         schema:
 *           type: string
 *         description: Texto que será traducido
 *       - in: header
 *         name: auth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de autenticación
 *     responses:
 *       200:
 *         description: Traducción exitosa del texto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 translated:
 *                   type: string
 *                   description: Texto traducido
 *       400:
 *         description: Solicitud inválida
 *       401:
 *         description: No autorizado
 *       
 * /tools/corrector-text:
 *   get:
 *     summary: Corrige el texto enviado
 *     tags:
 *       - Tools
 *     parameters:
 *       - in: query
 *         name: text
 *         required: true
 *         schema:
 *           type: string
 *         description: Texto que será corregido
 *       - in: header
 *         name: auth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de autenticación
 *     responses:
 *       200:
 *         description: Corrección exitosa del texto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 corrected:
 *                   type: string
 *                   description: Texto corregido
 *       400:
 *         description: Solicitud inválida
 *       401:
 *         description: No autorizado
 */
let path = "/tools";

router.get(`${path}/translate`, async (req, res) => Controller.translate(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));
router.get(`${path}/corrector-text`, async (req, res) => Controller.correctorText(req, res, await AuthService.getTokenDecrypt(req.header('auth-token'))));


module.exports = router;