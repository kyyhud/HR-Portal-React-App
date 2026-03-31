// import './App.css'
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { EmployeeDashboard } from "./components/EmployeeDashboard";
import { HrDashboard } from "./components/HrDashboard";

function App() {
  return (
    <>
      <h1>HR Portal - React App</h1>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />

        <Route path="/hr/dashboard" element={<HrDashboard />} />
      </Routes>
    </>
  );
}

export default App;
