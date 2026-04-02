import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Onboarding() {
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    password: "",
    name: "",
    position: "",
    salary: "",
    hireDate: "",
    ssn: "",
    address: "",
    phone: "",
    dateOfBirth: "",
    emergencyContact: "",
    emergencyContactPhone: "",
    leaveBalance: 0,
  });
  const [msg, setMsg] = useState("");
  const [flag, setFlag] = useState(true);
  const EMPLOYEE_DETAILS_URL = "http://localhost:3001/employeeDetails";

  const verifyEmail = async (e) => {
    e.preventDefault();
    const response = await axios.get(EMPLOYEE_DETAILS_URL);
    const existingEmployee = response.data.find((user) => user.email === formData.email);
    const enteredDOB = response.data.find((user) => user.dateOfBirth === formData.dateOfBirth);

    if (existingEmployee === undefined) {
      setMsg("Not a valid email. Please contact HR.");
      setFormData({ ...formData, email: "" });
    } else {
      setFlag(false);
      setFormData({
        ...formData,
        id: existingEmployee.id,
        email: existingEmployee.email,
        password: existingEmployee.password,
        name: existingEmployee.name,
        position: existingEmployee.position,
        salary: existingEmployee.salary,
        hireDate: existingEmployee.hireDate,
        ssn: existingEmployee.ssn,
        address: existingEmployee.address,
        phone: existingEmployee.phone,
        dateOfBirth: existingEmployee.dateOfBirth,
        emergencyContact: existingEmployee.emergencyContact,
        emergencyContactPhone: existingEmployee.emergencyContactPhone,
        leaveBalance: existingEmployee.leaveBalance,
      });
    }
  };

  const handleOnboard = async (e) => {
    e.preventDefault();
    const currentEmployee = {
      email: formData.email,
      password: formData.password,
      name: formData.name,
      position: formData.position,
      salary: formData.salary,
      hireDate: formData.hireDate,
      ssn: formData.ssn,
      address: formData.address,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      emergencyContact: formData.emergencyContact,
      emergencyContactPhone: formData.emergencyContactPhone,
      leaveBalance: formData.leaveBalance,
    };
    try {
      await axios.patch(`${EMPLOYEE_DETAILS_URL}/${formData.id}`, currentEmployee);
      setMsg("Onboarding completed successfully. Please login to continue.");
    } catch (error) {
      setMsg("Onboarding failed. Please try again.");
    }

    setFlag(true);
    setFormData({ ...formData, email: "" });
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  return (
    <>
      <h2>Onboarding</h2>
      {flag ? (
        <div>
          <form onSubmit={verifyEmail}>
            <label>Verify Email & Date of Birth to begin Onboarding:</label>
            <br />
            <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
            <input type="submit" value="Verify Employee" />
            <p>{msg}</p>
          </form>
        </div>
      ) : (
        <form onSubmit={handleOnboard}>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} readOnly />
          <br />
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <br />
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          <br />
          <label>Position:</label>
          <input type="text" name="position" value={formData.position} onChange={handleChange} readOnly />
          <br />
          <label>Salary:</label>
          <input type="text" name="salary" value={formData.salary} onChange={handleChange} readOnly />
          <br />
          <label>Hire Date:</label>
          <input type="date" name="hireDate" value={formData.hireDate} onChange={handleChange} readOnly />
          <br />
          <label>SSN:</label>
          <input type="text" name="ssn" value={formData.ssn} onChange={handleChange} readOnly />
          <br />
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          <br />
          <label>Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
          <br />
          <label>Date of Birth:</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} readOnly />
          <br />
          <label>Emergency Contact:</label>
          <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} required />
          <br />
          <label>Emergency Contact Phone:</label>
          <input type="text" name="emergencyContactPhone" value={formData.emergencyContactPhone} onChange={handleChange} required />
          <br />
          <label>Leave Balance:</label>
          <input type="number" name="leaveBalance" value={formData.leaveBalance} onChange={handleChange} readOnly />
          <br />
          <br />
          <input type="submit" value="Complete Onboarding" />
          <br />
          <p>{msg}</p>
        </form>
      )}
      <Link to="/">Back to Login</Link>
    </>
  );
}
