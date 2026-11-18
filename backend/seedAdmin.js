const connectDB = require("./db");
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Student = require("./models/Student");

const createAdmin = async () => {
    try {
        await connectDB();

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            throw new Error("Admin credentials are missing from .env");
        }

        const existingAdmin = await Student.findOne({
            email: adminEmail.toLowerCase()
        });

        if (existingAdmin) {
            console.log("An account with this email already exists.");
            return;
        }

        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        await Student.create({
            fullName: "EduManage Administrator",
            email: adminEmail,
            phone: "0000000000",
            dob: new Date("2000-01-01"),
            gender: "Other",
            course: "Administration",
            enrollment: "ADMIN001",
            address: "EduManage Administration",
            password: hashedPassword,
            role: "admin"
        });

        console.log("Admin account created successfully!");

    } catch (error) {
        console.error("Admin creation failed:", error.message);
    } finally {
        await mongoose.disconnect();
    }
};

createAdmin();
