const AuthController = require("../app/controllers/AuthController");
const AuthService = require("../app/services/AuthService");
const router = require('express').Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Inicia sesión de usuario
 *     tags:
 *       - auth
 *     description: Valida las credenciales y genera un token de autenticación.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *       401:
 *         description: Credenciales incorrectas
 */
router.post('/login',(req, res) => AuthController.login(req, res));

/**
 * @swagger
 * /get-token:
 *   post:
 *     summary: Genera un nuevo token
 *     tags:
 *       - auth
 *     description: Solicita un nuevo token de autenticación.
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Token generado correctamente
 */
router.post('/get-token',(req, res) => AuthController.getToken(req, res));

/**
 * @swagger
 * /verify-token:
 *   post:
 *     summary: Verifica la validez de un token
 *     tags:
 *       - auth
 *     description: Valida si un token es correcto y sigue vigente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token válido
 *       401:
 *         description: Token inválido o expirado
 */
router.post('/verify-token',(req, res) => AuthController.verifyToken(req, res));

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags:
 *       - auth
 *     description: Crea una cuenta de usuario nueva.
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
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/register',(req, res) => AuthController.register(req, res));

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Cierra la sesión del usuario
 *     tags:
 *       - auth
 *     description: Cierra la sesión y anula el token actual.
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente
 */
router.post('/logout',(req, res) => AuthController.logout(req, res));

module.exports = router;