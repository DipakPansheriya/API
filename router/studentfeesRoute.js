const express = require('express');
const route = express.Router()
const studentController = require('../controller/studentfeesController')

route.post('/createStudentfess', studentController.createStudentfees )
route.get('/getStudentfess', studentController.getStudentfees )
route.put('/upadteStudentfess', studentController.upadteStudentfees )
route.delete('/deleteStudentfess', studentController.deleteStudentfees )


module.exports = route