
const { default: mongoose } = require('mongoose');
const db = require('mongoose')

const studentslist = new db.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RegisterList',
            required: true
        },
        first_name: {
            type: String,
            required: true,
        },
        middle_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        date_of_birth: {
            type: String,
            required: true,
        },
    },

);
const doctorModel = db.model("Studentslist", studentslist);

module.exports = doctorModel