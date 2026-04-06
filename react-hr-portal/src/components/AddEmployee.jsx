import { useState } from "react";
import axios from "axios";
import "./AddEmployee.css";

export function AddEmployee() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [ssn, setSsn] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [leaveBalance, setLeaveBalance] = useState(0);
  const [typeOfUser, setTypeOfUser] = useState("employee");
  const [msg, setMsg] = useState("");
  const EMPLOYEE_URL = "http://localhost:3001/employeeDetails";

  const AddEmployee = async (e) => {
    e.preventDefault();
    const newEmployee = {
      email,
      name,
      position,
      salary,
      hireDate,
      ssn,
      dateOfBirth,
      leaveBalance,
      typeOfUser,
    };
    const response = await axios.get(EMPLOYEE_URL);
    const existingEmployee = response.data.find((employee) => employee.email === email);
    if (existingEmployee === undefined) {
      await axios.post(EMPLOYEE_URL, newEmployee);
      setMsg("Employee added successfully.");
    } else {
      setMsg("Employee already present.");
    }

    setEmail("");
    setName("");
    setPosition("");
    setSalary("");
    setHireDate("");
    setSsn("");
    setDateOfBirth("");
    setLeaveBalance(0);
    setTypeOfUser("employee");
  };

  return (
    <section className="page page-add-employee">
      <div className="page-title">
        <h2>Add Employee</h2>
        <p>Please complete all fields.</p>
      </div>

      <form className="form-card" onSubmit={AddEmployee}>
        <div className="form-grid">
          <div className="input-group">
            <label htmlFor="addEmpName">Name</label>
            <input id="addEmpName" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="input-group">
            <label htmlFor="addEmpEmail">Email</label>
            <input id="addEmpEmail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="input-group">
            <label htmlFor="addEmpPosition">Position</label>
            <input id="addEmpPosition" type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
          </div>

          <div className="input-group">
            <label htmlFor="addEmpSalary">Salary</label>
            <input id="addEmpSalary" type="text" value={salary} onChange={(e) => setSalary(e.target.value)} required />
          </div>

          <div className="input-group">
            <label htmlFor="addEmpHireDate">Hire Date</label>
            <input id="addEmpHireDate" type="date" value={hireDate} onChange={(e) => setHireDate(e.target.value)} required />
          </div>

          <div className="input-group">
            <label htmlFor="addEmpSsn">SSN</label>
            <input id="addEmpSsn" type="text" value={ssn} onChange={(e) => setSsn(e.target.value)} required />
          </div>

          <div className="input-group">
            <label htmlFor="addEmpDob">Date of Birth</label>
            <input id="addEmpDob" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
          </div>

          <div className="input-group">
            <label htmlFor="addEmpLeave">Leave Balance</label>
            <input id="addEmpLeave" type="number" value={leaveBalance} onChange={(e) => setLeaveBalance(Number(e.target.value))} required />
          </div>

          <div className="input-group add-employee-user-type">
            <label htmlFor="addEmpType">Type of User</label>
            <select id="addEmpType" value={typeOfUser} onChange={(e) => setTypeOfUser(e.target.value)} required>
              <option value="employee">Employee</option>
              <option value="hr">HR</option>
            </select>
          </div>
        </div>
        <br />
        <div className="form-actions">
          <input type="submit" value="Add Employee" />
        </div>

        {msg ? <p className="status-message">{msg}</p> : null}
      </form>
    </section>
  );
}
