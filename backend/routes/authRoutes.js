
const express = require("express");

const router = express.Router();

const {
    registerStudent,
    loginStudent
} = require("../controllers/authController");

// Student Registration API
router.post("/register", registerStudent);

// Student Login API
router.post("/login", loginStudent);

module.exports = router;
