
const Student = require("../models/Student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// STUDENT REGISTRATION
const registerStudent = async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            dob,
            gender,
            course,
            enrollment,
            address,
            password
        } = req.body;

        if (
            !fullName || !email || !phone || !dob ||
            !gender || !course || !enrollment ||
            !address || !password
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingStudent = await Student.findOne({
            $or: [
                { email: email.toLowerCase() },
                { enrollment }
            ]
        });

        if (existingStudent) {
            return res.status(409).json({
                message: "Email or enrollment number already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const student = await Student.create({
            fullName,
            email,
            phone,
            dob,
            gender,
            course,
            enrollment,
            address,
            password: hashedPassword,
            role: "student"
        });

        res.status(201).json({
            message: "Student registered successfully",
            student: {
                id: student._id,
                fullName: student.fullName,
                email: student.email,
                role: student.role
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Registration failed"
        });
    }
};

// STUDENT LOGIN
const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const student = await Student.findOne({
            email: email.toLowerCase()
        });

        if (!student) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            student.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: student._id,
                role: student.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            student: {
                id: student._id,
                fullName: student.fullName,
                email: student.email,
                role: student.role
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Login failed"
        });
    }
};

module.exports = {
    registerStudent,
    loginStudent
};
