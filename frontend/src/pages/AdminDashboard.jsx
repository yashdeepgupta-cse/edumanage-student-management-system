
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../App.css";

function AdminDashboard() {
    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        course: "",
        enrollment: "",
        address: ""
    });

    // FETCH STUDENTS
    const fetchStudents = useCallback(async () => {
        try {
            setError("");

            const response = await API.get("/students");

            setStudents(response.data.students);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to load students."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    // SEARCH STUDENTS
    const filteredStudents = students.filter((student) => {
        const search = searchTerm.toLowerCase();

        return (
            student.fullName?.toLowerCase().includes(search) ||
            student.email?.toLowerCase().includes(search) ||
            student.course?.toLowerCase().includes(search) ||
            student.enrollment?.toLowerCase().includes(search)
        );
    });

    // EDIT STUDENT
    const handleEdit = (student) => {
        setEditingId(student._id);

        setFormData({
            fullName: student.fullName || "",
            email: student.email || "",
            phone: student.phone || "",
            dob: student.dob
                ? new Date(student.dob).toISOString().split("T")[0]
                : "",
            gender: student.gender || "",
            course: student.course || "",
            enrollment: student.enrollment || "",
            address: student.address || ""
        });
    };

    // HANDLE FORM CHANGES
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // UPDATE STUDENT
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await API.put(`/students/${editingId}`, formData);

            alert("Student updated successfully!");

            setEditingId(null);
            await fetchStudents();
        } catch (err) {
            alert(
                err.response?.data?.message ||
                "Failed to update student."
            );
        }
    };

    // DELETE STUDENT
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) return;

        try {
            await API.delete(`/students/${id}`);

            setStudents((previous) =>
                previous.filter((student) => student._id !== id)
            );

            alert("Student deleted successfully!");
        } catch (err) {
            alert(
                err.response?.data?.message ||
                "Failed to delete student."
            );
        }
    };

    // LOGOUT
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("student");

        navigate("/login", { replace: true });
    };

    return (
        <div className="admin-container">
            <header className="dashboard-header">
                <h1>EduManage Admin</h1>
                <button onClick={handleLogout}>Logout</button>
            </header>

            <main className="admin-content">
                <h2>Admin Dashboard</h2>
                <p>Manage all registered students.</p>

                <div className="admin-stats">
                    <div className="stat-card">
                        <h3>Total Students</h3>
                        <h1>{students.length}</h1>
                    </div>
                </div>

                {/* EDIT STUDENT FORM */}
                {editingId && (
                    <div className="edit-student-card">
                        <h3>Edit Student Details</h3>

                        <form onSubmit={handleUpdate}>
                            <input
                                name="fullName"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <input
                                name="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />

                            <label>Date of Birth</label>

                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
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
                                name="course"
                                placeholder="Course"
                                value={formData.course}
                                onChange={handleChange}
                                required
                            />

                            <input
                                name="enrollment"
                                placeholder="Enrollment"
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

                            <div className="edit-actions">
                                <button
                                    type="submit"
                                    className="save-btn"
                                >
                                    Save Changes
                                </button>

                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() => setEditingId(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* STUDENT RECORDS */}
                <div className="student-table-container">
                    <h3>Student Records</h3>

                    {/* SEARCH */}
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search by name, email, course or enrollment..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {loading && <p>Loading students...</p>}

                    {error && (
                        <p className="error-message">{error}</p>
                    )}

                    {!loading && !error && (
                        <table className="student-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Course</th>
                                    <th>Enrollment</th>
                                    <th>Phone</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredStudents.map((student) => (
                                    <tr key={student._id}>
                                        <td>{student.fullName}</td>
                                        <td>{student.email}</td>
                                        <td>{student.course}</td>
                                        <td>{student.enrollment}</td>
                                        <td>{student.phone}</td>

                                        <td>
                                            <button
                                                className="edit-btn"
                                                onClick={() => handleEdit(student)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() => handleDelete(student._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {filteredStudents.length === 0 && (
                                    <tr>
                                        <td colSpan="6">
                                            No matching students found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
        </div>
    );
}

export default AdminDashboard;
