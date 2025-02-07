import "./form.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");

    dispatch(loginUser({ email, password }))
  };

  return (
    <section className="form-container">
      <h1 className="form-title">Login to your account</h1>
      <form onSubmit={formSubmitHandler} className="form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <div className="input-with-icon">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="form-input"
            />
            <i className="bi bi-person-fill"></i>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="input-with-icon">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="form-input"
            />
            <i className="bi bi-lock-fill"></i>
          </div>
        </div>
        <button type="submit" className="form-btn">
          Login
        </button>
      </form>
      <div className="form-footer">
        Did you forget your password?{" "}
        <Link to="/forgot-password">Forgot Password</Link>
      </div>
      <div className="form-footer">
        Don't Have An Account?{" "}
        <Link to="/register">Register</Link>
      </div>
    </section>
  );
};

export default Login;