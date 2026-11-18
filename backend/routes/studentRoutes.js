
const express = require("express");
const mongoose = require("mongoose");
const Student = require("../models/Student");

const {
    verifyToken,
    verifyAdmin
} = require("../middleware/authMiddleware");

const router = express.Router();

// GET LOGGED-IN STUDENT PROFILE
router.get("/me", verifyToken, async (req, res) => {
    try {
        const student = await Student.findById(req.user.id)
            .select("-password");

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json(student);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch profile"
        });
    }
});

// GET ALL STUDENTS (ADMIN ONLY)
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
    try {
        // Fetch only student accounts, excluding administrators
        const students = await Student.find({ role: "student" })
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: students.length,
            students
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch students"
        });
    }
});

// UPDATE STUDENT (ADMIN ONLY)
router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid student ID"
            });
        }

        const allowedFields = [
            "fullName",
            "email",
            "phone",
            "dob",
            "gender",
            "course",
            "enrollment",
            "address"
        ];

        const updates = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });

        const student = await Student.findOneAndUpdate(
            {
                _id: req.params.id,
                role: "student"
            },
            updates,
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student updated successfully",
            student
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update student"
        });
    }
});

// DELETE STUDENT (ADMIN ONLY)
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid student ID"
            });
        }

        const student = await Student.findOneAndDelete({
            _id: req.params.id,
            role: "student"
        });

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete student"
        });
    }
});

module.exports = router;
