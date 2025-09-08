import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa"; 
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className="error-container">
      <h1 className="error-title">404 - Không tìm thấy trang</h1>
      <p className="error-message">Oops! Đường dẫn bạn nhập không tồn tại.</p>
      <Link to="/" className="error-btn">
        <FaHome className="home-icon" /> Về Trang chủ
      </Link>
    </div>
  );
};

export default ErrorPage;
