
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ allowedRole }) {
    const token = localStorage.getItem("token");
    const studentData = localStorage.getItem("student");

    if (!token || !studentData) {
        return <Navigate to="/login" replace />;
    }

    let student;

    try {
        student = JSON.parse(studentData);
    } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("student");

        return <Navigate to="/login" replace />;
    }

    if (!student || !student.role) {
        localStorage.removeItem("token");
        localStorage.removeItem("student");

        return <Navigate to="/login" replace />;
    }

    if (student.role !== allowedRole) {
        if (student.role === "admin") {
            return <Navigate to="/admin-dashboard" replace />;
        }

        return <Navigate to="/student-dashboard" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
