import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [typeOfUser, setTypeOfUser] = useState("employee");
  let [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const LOGIN_URL = "http://localhost:3001/logins";

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
        navigate("/employee/dashboard");
      } else {
        navigate("/hr/dashboard");
      }
    } catch (error) {
      setMsg("Unable to connect to login API. Make sure JSON server is running.");
    }
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={signIn}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <label>Type of User:</label>
        <select value={typeOfUser} onChange={(e) => setTypeOfUser(e.target.value)}>
          <option value="employee">Employee</option>
          <option value="hr">HR</option>
        </select>
        <br />
        <input type="submit" value="Login" />
      </form>
      <p>{msg}</p>
    </>
  );
}
