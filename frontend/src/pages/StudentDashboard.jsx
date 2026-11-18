
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../App.css";

function StudentDashboard() {
    const navigate = useNavigate();

    const [student, setStudent] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await API.get("/students/me");

                setStudent(response.data);

            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Unable to load student profile."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("student");

        navigate("/login", { replace: true });
    };

    if (loading) {
        return (
            <h2 className="loading">
                Loading Dashboard...
            </h2>
        );
    }

    if (!student) {
        return (
            <div className="dashboard-container">
                <p className="error-message">
                    {error || "Unable to load student profile."}
                </p>

                <button onClick={handleLogout}>
                    Back to Login
                </button>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>EduManage</h1>

                <button onClick={handleLogout}>
                    Logout
                </button>
            </header>

            <main className="dashboard-content">
                <h2>Welcome, {student.fullName}!</h2>

                <p>Your Student Dashboard</p>

                <div className="profile-card">
                    <h3>My Profile</h3>

                    <div className="profile-grid">
                        <p>
                            <strong>Full Name:</strong>{" "}
                            {student.fullName}
                        </p>

                        <p>
                            <strong>Email:</strong>{" "}
                            {student.email}
                        </p>

                        <p>
                            <strong>Phone:</strong>{" "}
                            {student.phone}
                        </p>

                        <p>
                            <strong>Date of Birth:</strong>{" "}
                            {new Date(student.dob).toLocaleDateString()}
                        </p>

                        <p>
                            <strong>Gender:</strong>{" "}
                            {student.gender}
                        </p>

                        <p>
                            <strong>Course:</strong>{" "}
                            {student.course}
                        </p>

                        <p>
                            <strong>Enrollment:</strong>{" "}
                            {student.enrollment}
                        </p>

                        <p>
                            <strong>Address:</strong>{" "}
                            {student.address}
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default StudentDashboard;
