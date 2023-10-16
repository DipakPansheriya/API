
const { default: mongoose } = require('mongoose');
const db = require('mongoose')

const studentslist = new db.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RegisterList',
            required: true
        },
        students_id: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
    },

);
const doctorModel = db.model("studentfeeslist", studentslist);

module.exports = doctorModel