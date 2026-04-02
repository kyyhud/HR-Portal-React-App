import { useState } from "react";
import axios from "axios";

export function AddEmployee() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [ssn, setSsn] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [leaveBalance, setLeaveBalance] = useState("");
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
    setLeaveBalance("");
    setTypeOfUser("employee");
  };

  return (
    <>
      <h2>Add Employee</h2>
      <p>Please complete all fields.</p>
      <br />
      <form onSubmit={AddEmployee}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <br />
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <label>Position:</label>
        <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
        <br />
        <label>Salary:</label>
        <input type="text" value={salary} onChange={(e) => setSalary(e.target.value)} required />
        <br />
        <label>Hire Date:</label>
        <input type="date" value={hireDate} onChange={(e) => setHireDate(e.target.value)} required />
        <br />
        <label>SSN:</label>
        <input type="text" value={ssn} onChange={(e) => setSsn(e.target.value)} required />
        <br />
        <label>Date of Birth:</label>
        <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
        <br />
        <label>Leave Balance:</label>
        <input type="text" value={leaveBalance} onChange={(e) => setLeaveBalance(e.target.value)} required />
        <br />
        <label>Type of User:</label>
        <select value={typeOfUser} onChange={(e) => setTypeOfUser(e.target.value)} required>
          <option value="employee">Employee</option>
          <option value="hr">HR</option>
        </select>
        <br />
        <input type="submit" value="Add Employee" />
        <br />
        <p>{msg}</p>
      </form>
    </>
  );
}
