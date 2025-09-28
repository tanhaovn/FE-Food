import { Link } from "react-router-dom";
import { FaHome, FaExclamationTriangle } from "react-icons/fa"; 
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <div className="error-icon">
          <FaExclamationTriangle />
        </div>
        
        <h1 className="error-title">404</h1>
        <h2 className="error-subtitle">Page Not Found</h2>
        <p className="error-message">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/" className="error-btn">
          <FaHome className="home-icon" /> 
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
