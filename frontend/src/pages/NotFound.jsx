import { Link } from "react-router-dom";
import "../App.css";

function NotFound() {
    return (
        <div className="login-container">
            <div className="login-card">
                <h1>404</h1>
                <h2>Page Not Found!</h2>

                <p>
                    Sorry, the page you are looking for does not exist.
                </p>

                <Link to="/login">
                    <button>Go to Login</button>
                </Link>
            </div>
        </div>
    );
}

export default NotFound;