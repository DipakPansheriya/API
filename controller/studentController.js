const studentschema = require('../schema/studentschema')
const registerListchema = require('../schema/userschema')

exports.getStudent = async (req, res) => {
    try {
        const student = await studentschema.find(req.headers.user_Id)
        res.send({data: student})
    } catch (error) {
        res.send(error)
    }
}

exports.createStudent = async (req, res) => {
    try {
        const loginuser = await registerListchema.findOne(req.headers.user_Id)
        const user = new studentschema({
            first_name: req.body.first_name,
            middle_name: req.body.middle_name,
            last_name: req.body.last_name,
            date_of_birth: req.body.date_of_birth,
            std: req.body.std,
            students_free : req.body.students_free ,
            userId : loginuser._id
        })
        await user.save()
        return res.status(200).json({ data: user, message: "Students created successful" });
    } catch (error) {
        res.send(error)
    }
}

exports.upadteStudent = async (req, res) => {
    try {
        const student_Id = req.query.student_Id
        const allUser = await studentschema.findByIdAndUpdate(student_Id, {
            first_name: req.body.first_name,
            middle_name: req.body.middle_name,
            last_name: req.body.last_name,
            date_of_birth: req.body.date_of_birth,
            std: req.body.std,
            students_free : req.body.students_free ,
        })
        res.status(200).json({ data: allUser, message: "Student update successful" });
    } catch (error) {
        res.send(error)

    }
}

exports.deleteStudent = async (req, res) => {
    try {
        const student_Id = req.query.student_Id
        const user = await studentschema.findByIdAndDelete(student_Id)
        res.status(200).json({ data: user, message: "Student Delete successful" });
    } catch (error) {
        res.send(error)
    }
}