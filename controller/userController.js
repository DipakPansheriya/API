
const registerListchema = require('../schema/userschema')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

let secretKey = "sjhgsjgfssghjxcxzcvvsadsjghdwywgdjsxnbzcxcxzcvsahgdshdwydghjdsxzncvxmxcnnxcnxcnsdfgdjsfgewufdshvbfxcnvbcsdhfgeliefdsf"

exports.createUser = async (req, res) => {
    try {
        const user = new registerListchema({
            email: req.body.email,
            contactNumber: req.body.contactNumber,
            userName: req.body.userName,
            password: req.body.password
        })
        await user.save()
        return res.status(200).json({ data: user, message: "user created successful" });
    } catch (error) {
        res.send(error)

    }
}

exports.upadteUser = async (req, res) => {
    try {
        const user_Id = req.query.user_Id
        const allUser = await registerListchema.findByIdAndUpdate(user_Id, {
            userName: req.body.userName,
            password: req.body.password
        })
        res.status(200).json({ data: allUser, message: "user Update successful" });
    } catch (error) {
        res.send(error)

    }
}

exports.DeleteUser = async (req, res) => {
    try {
        const user_Id = req.query.user_Id
        const user = await registerListchema.findByIdAndDelete(user_Id)
        res.status(200).json({ data: user, message: "user Delete successful" });
    } catch (error) {
        res.send(error)
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await registerListchema.find()
        res.send(user)
    } catch (error) {
        res.send(error)
    }
}

exports.loginUser = async (req, res) => {
    const { userName, password } = req.body;

    // Check if username and password are valid (this is a basic example, use a proper authentication mechanism)
    const user = await registerListchema.findOne({ userName : userName });
    if (!user) {
        res.status(401).json({ message: 'Invalid user credentials' });
    } else {
        if (user.userName === userName && user.password === password) {
    
            const token = jwt.sign({ userId: user._id, username: user.userName }, secretKey, { expiresIn: '24h' });
            // Generate a JWT token
            const userData = {
                userName: user.userName,
                // token: token,
                userId: user._id
            }
            res.status(200).json({ data: userData, message: "user login successful" });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    }
};

exports.protected = async (req, res) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    // Verify the JWT token
    jwt.verify(token, secretKey, (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Token is valid
        res.json({ message: 'Protected route accessed', user: decoded });

    });
};

exports.sendMailOTP = async (req, res) => {
    try {
        const generateOTP = () => {
            // Generate a 6-digit OTP
            return Math.floor(100000 + Math.random() * 900000);
          }; 

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'luciano.emmerich0@ethereal.email',
                pass: 'J4nHUgDnmvpWWMXrNV'
            }
        });
        const otp = generateOTP();
        const userData = await registerListchema.findOneAndUpdate({ email : req.body.email} , {otp : otp})
        const mailOptions = {
            from: 'luciano.emmerich0@ethereal.email',
            to: req.body.email,
            subject: ` ${req.body.email} Your Email Code`,
            text: `Your OTP code is: ${otp}`
          };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                    res.status(500).send('Error sending email');
            } else {
                res.status(200).json({ email: req.body.email, message: "Resignation email send otp successfully" });
            }
        });
       
    } catch (error) {
        res.send(error)

    }
}

exports.forgotPassword = async (req,res) => {
    try {
        const userData = await registerListchema.findOne({ email : req.body.email})
        if (userData.otp === req.body.otp) {
            const userData12 = await registerListchema.findOneAndUpdate({ email : userData.email} , {password : req.body.newPassword})
        res.status(200).json({message: "New Password change successfully" });
        } else {
        res.send({ message : "Invalid code received for user"})
        }
    } catch (error) {
        res.send(error)
    }
}
