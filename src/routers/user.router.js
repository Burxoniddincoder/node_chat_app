const userController = require('../controllers/user.controller')
const userAuth = require('../middlewares/user.auth')
module.exports = require('express').Router()
    .post('/login', userController.SignIn)
    .post('/sign-up', userController.SignUp)
    .get('/verify-session', userAuth.user, userController.verifySession)
    .get('/getById', userController.getbyid)
    .put('/edit:id', userController.edit)