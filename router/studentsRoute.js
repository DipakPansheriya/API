const express = require('express');
const route = express.Router()
const studentController = require('../controller/studentController')

route.post('/createStudent', studentController.createStudent )
route.get('/getStudent', studentController.getStudent )
route.put('/upadteStudent', studentController.upadteStudent )
route.delete('/deleteStudent', studentController.deleteStudent )


module.exports = route