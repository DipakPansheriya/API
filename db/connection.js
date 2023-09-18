const mongoose = require('mongoose');
const db =  mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => console.log( "DataBase"));
module.exports = db