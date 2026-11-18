
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../App.css";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        course: "",
        enrollment: "",
        address: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        // Full name validation
        if (formData.fullName.trim().length < 3) {
            setError("Full name must contain at least 3 characters.");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {
            setError("Please enter a valid email address.");
            return;
        }

        // Phone number validation
        if (!/^[0-9]{10}$/.test(formData.phone)) {
            setError("Phone number must contain exactly 10 digits.");
            return;
        }

        // Date of birth validation
        if (!formData.dob || new Date(formData.dob) >= new Date()) {
            setError("Please enter a valid date of birth in the past.");
            return;
        }

        // Password validation
        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        if (!/[A-Z]/.test(formData.password)) {
            setError("Password must contain at least one uppercase letter.");
            return;
        }

        if (!/[0-9]/.test(formData.password)) {
            setError("Password must contain at least one number.");
            return;
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
            setError("Password must contain at least one special character.");
            return;
        }

        setLoading(true);

        try {
            await API.post("/auth/register", formData);

            setSuccess(
                "Registration successful! Redirecting to login..."
            );

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Registration failed. Try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card register-card">
                <h1>EduManage</h1>
                <p>Student Registration</p>

                {error && (
                    <p className="error-message">{error}</p>
                )}

                {success && (
                    <p className="success-message">{success}</p>
                )}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number (10 digits)"
                        value={formData.phone}
                        onChange={handleChange}
                        maxLength="10"
                        required
                    />

                    <label>Date of Birth</label>

                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        max={new Date().toISOString().split("T")[0]}
                        required
                    />

                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>

                    <input
                        type="text"
                        name="course"
                        placeholder="Course (e.g. B.Tech CSE)"
                        value={formData.course}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="enrollment"
                        placeholder="Enrollment Number"
                        value={formData.enrollment}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Create Password (minimum 8 characters)"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p>
                    Already registered?{" "}
                    <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
