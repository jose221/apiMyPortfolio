const jwt = require('jsonwebtoken')
const Response = require('../../modules/response');
const APIToken = require('../../config/APIToken');
const AuthService = require('../services/AuthService');
// middleware to validate token (rutas protegidas)
const verifyToken = async (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(401).json(Response.error(401, null, 'Acceso denegado'))
    try {
        const user = await AuthService.verifyToken(token);
        if(user) next() // continuamos
        else res.status(400).json({error: 'token no es válido'});
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }
}

module.exports = verifyToken;
