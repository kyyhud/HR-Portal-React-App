import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Onboarding.css";

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
    <section className="page page-onboarding">
      <div className="page-title">
        <h2>Onboarding</h2>
        <p>Verify your profile and complete your employee details.</p>
      </div>

      {flag ? (
        <div className="form-card onboarding-card">
          <form onSubmit={verifyEmail}>
            <p className="onboarding-heading">Verify email and date of birth to begin onboarding.</p>

            <div className="form-grid">
              <div className="input-group">
                <label htmlFor="verifyEmail">Email</label>
                <input id="verifyEmail" type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="input-group">
                <label htmlFor="verifyDob">Date of Birth</label>
                <input id="verifyDob" type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
              </div>
            </div>
            <br />
            <div className="form-actions">
              <input type="submit" value="Verify Employee" />
            </div>

            {msg ? <p className="status-message">{msg}</p> : null}
          </form>
        </div>
      ) : (
        <form className="form-card" onSubmit={handleOnboard}>
          <div className="form-grid">
            <div className="input-group">
              <label htmlFor="onboardName">Name</label>
              <input id="onboardName" type="text" name="name" value={formData.name} onChange={handleChange} readOnly />
            </div>

            <div className="input-group">
              <label htmlFor="onboardEmail">Email</label>
              <input id="onboardEmail" type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label htmlFor="onboardPassword">Password</label>
              <input id="onboardPassword" type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label htmlFor="onboardPosition">Position</label>
              <input id="onboardPosition" type="text" name="position" value={formData.position} onChange={handleChange} readOnly />
            </div>

            <div className="input-group">
              <label htmlFor="onboardSalary">Salary</label>
              <input id="onboardSalary" type="text" name="salary" value={formData.salary} onChange={handleChange} readOnly />
            </div>

            <div className="input-group">
              <label htmlFor="onboardHireDate">Hire Date</label>
              <input id="onboardHireDate" type="date" name="hireDate" value={formData.hireDate} onChange={handleChange} readOnly />
            </div>

            <div className="input-group">
              <label htmlFor="onboardSsn">SSN</label>
              <input id="onboardSsn" type="text" name="ssn" value={formData.ssn} onChange={handleChange} readOnly />
            </div>

            <div className="input-group">
              <label htmlFor="onboardAddress">Address</label>
              <input id="onboardAddress" type="text" name="address" value={formData.address} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label htmlFor="onboardPhone">Phone</label>
              <input id="onboardPhone" type="text" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label htmlFor="onboardDob">Date of Birth</label>
              <input id="onboardDob" type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} readOnly />
            </div>

            <div className="input-group">
              <label htmlFor="onboardEmergency">Emergency Contact</label>
              <input id="onboardEmergency" type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label htmlFor="onboardEmergencyPhone">Emergency Contact Phone</label>
              <input
                id="onboardEmergencyPhone"
                type="text"
                name="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="onboardLeave">Leave Balance</label>
              <input id="onboardLeave" type="number" name="leaveBalance" value={formData.leaveBalance} onChange={handleChange} readOnly />
            </div>
          </div>
          <br />
          <div className="form-actions">
            <input type="submit" value="Complete Onboarding" />
          </div>

          {msg ? <p className="status-message">{msg}</p> : null}
        </form>
      )}

      <Link className="onboarding-back" to="/">
        Back to Login
      </Link>
    </section>
  );
}
