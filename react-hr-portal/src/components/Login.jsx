import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [typeOfUser, setTypeOfUser] = useState("employee");
  let [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const LOGIN_URL = "http://localhost:3001/employeeDetails";

  const signIn = async (e) => {
    e.preventDefault();
    if (email.length == 0 || password.length == 0) {
      setMsg("All fields are required");
      return;
    }

    try {
      const response = await axios.get(LOGIN_URL);
      const matchedUser = response.data.find((user) => user.email === email && user.password === password && user.typeOfUser === typeOfUser);
      if (!matchedUser) {
        setMsg("Invalid email, password, or user type.");
        return;
      }

      setMsg("Login successful.");
      if (typeOfUser === "employee") {
        sessionStorage.setItem("emailId", matchedUser.email);
        navigate("/employee/dashboard");
      } else {
        navigate("/hr/dashboard");
      }
    } catch (error) {
      setMsg("Unable to connect to login API. Make sure JSON server is running.");
    }
  };

  return (
    <section className="page page-login">
      <div className="page-title">
        <h2>Login</h2>
        <p>Sign in to continue to your dashboard.</p>
      </div>

      <form className="form-card login-card" onSubmit={signIn}>
        <div className="form-grid login-grid">
          <div className="input-group">
            <label htmlFor="loginEmail">Email</label>
            <input id="loginEmail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="input-group">
            <label htmlFor="loginPassword">Password</label>
            <input id="loginPassword" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="loginType">Type of User</label>
          <select id="loginType" value={typeOfUser} onChange={(e) => setTypeOfUser(e.target.value)}>
            <option value="employee">Employee</option>
            <option value="hr">HR</option>
          </select>
        </div>

        <div className="form-actions login-actions">
          <input type="submit" value="Login" />
          <Link className="login-link" to="/onboarding">
            New Employee Onboarding
          </Link>
        </div>
      </form>

      {msg ? <p className="status-message">{msg}</p> : null}
    </section>
  );
}
