const studentfeesschem = require('../schema/studentfeesschem')
const studentschema = require('../schema/studentschema')
const registerListchema = require('../schema/userschema')

exports.getStudentfees = async (req, res) => {
    try {
        const student = await studentfeesschem.find(req.headers.user_Id)
        res.send({data: student})
    } catch (error) {
        res.send(error)
    }
}

exports.createStudentfees = async (req, res) => {
    try {
        const loginuser = await registerListchema.findOne(req.headers.user_Id)
        const user = new studentfeesschem({
            students_id: req.body.students_id,
            amount: req.body.amount,
            userId : loginuser._id
        })
 
        await user.save()
        return res.status(200).json({ data: user, message: "Students fees add successful" });
    } catch (error) {
        res.send(error)
    }
}

exports.upadteStudentfees = async (req, res) => {
    try {
        const student_Id = req.query.student_Id
        const allUser = await studentfeesschem.findByIdAndUpdate(student_Id, {
            students_id: req.body.students_id,
            amount: req.body.amount,
        })
        res.status(200).json({ data: allUser, message: "Student fees update successful" });
    } catch (error) {
        res.send(error)

    }
}

exports.deleteStudentfees = async (req, res) => {
    try {
        const student_Id = req.query.student_Id
        const user = await studentfeesschem.findByIdAndDelete(student_Id)
        res.status(200).json({ data: user, message: "Student fees successful" });
    } catch (error) {
        res.send(error)
    }
}