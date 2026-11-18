
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Default Route */}
                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Student Protected Route */}
                <Route element={<ProtectedRoute allowedRole="student" />}>
                    <Route
                        path="/student-dashboard"
                        element={<StudentDashboard />}
                    />
                </Route>

                {/* Admin Protected Route */}
                <Route element={<ProtectedRoute allowedRole="admin" />}>
                    <Route
                        path="/admin-dashboard"
                        element={<AdminDashboard />}
                    />
                </Route>

                {/* 404 Not Found Route */}
                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
