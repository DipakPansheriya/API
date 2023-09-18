
const db = require('mongoose')

const registerData = new db.Schema(
    {
      userName: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      contactNumber: {
        type: Number,
        required: true,
      },
    },

  );
 const doctorModel = db.model("RegisterList", registerData);

 module.exports = doctorModel