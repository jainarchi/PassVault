const express = require('express')
const authControllers = require('../controllers/auth.controllers')

const authRouter = express.Router()


// POST /api/auth/register
authRouter.post('/register', authControllers.registerUser )


// POST /api/auth/login
authRouter.post('/login', authControllers.loginUser )


// POST /api/auth/logout

authRouter.post('/logout' , authControllers.logoutUser)


module.exports = authRouter