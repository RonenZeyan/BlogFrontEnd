import "./form.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import swal from "sweetalert";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { registerMSG } = useSelector(state => state.auth);

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (username.trim() === "") return toast.error("Username is required");
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");
    dispatch(registerUser({ username, email, password }));

  };

  const navigate = useNavigate();

  if (registerMSG) {
    swal({
      title: registerMSG,
      icon: "success"
    }).then(isOk => {
      if (isOk) {

        navigate("/login");
      }
    })
  }

  return (
    <section className="form-container">
      <h1 className="form-title">Create new account</h1>
      <form onSubmit={formSubmitHandler} className="form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <div className="input-with-icon">
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              id="username"
              placeholder="Enter your username"
              className="form-input"
            />
            <i className="bi bi-person-fill"></i>
          </div>

        </div>
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
            <i class="bi bi-person-vcard"></i>
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
          Register
        </button>
      </form>
      <div className="form-footer">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </section>
  );
};

export default Register;