const express = require('express');
const route = express.Router()
const userController = require('../controller/userController')

route.post('/createUser', userController.createUser )
route.get('/getUser', userController.getUser )
route.put('/upadteUser', userController.upadteUser )
route.delete('/deleteUser', userController.DeleteUser )
route.post('/loginUser', userController.loginUser )
route.post('/protected', userController.protected )
route.post('/sendMailOTP', userController.sendMailOTP )
route.post('/forgotPassword', userController.forgotPassword )

module.exports = route