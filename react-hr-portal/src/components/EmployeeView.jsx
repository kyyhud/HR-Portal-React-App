import { useEffect, useState } from "react";
import axios from "axios";
import "./EmployeeView.css";

export function EmployeeView() {
  const [employee, setEmployee] = useState([]);

  const EMPLOYEE_URL = "http://localhost:3001/employeeDetails";
  useEffect(() => {
    viewAllEmployees();
  }, []);

  const viewAllEmployees = async () => {
    const response = await axios.get(EMPLOYEE_URL);
    const emailId = sessionStorage.getItem("emailId");
    const currentEmployee = response.data.find((employee) => employee.email === emailId);
    setEmployee(currentEmployee);
  };

  return (
    <section className="page page-employee-view">
      <h2>Your Employee Details</h2>

      <div className="panel employee-view-panel">
        <div className="info-list">
          <p className="info-item">
            <strong>Name</strong>
            <span>{employee.name}</span>
          </p>
          <p className="info-item">
            <strong>Email</strong>
            <span>{employee.email}</span>
          </p>
          <p className="info-item">
            <strong>Address</strong>
            <span>{employee.address}</span>
          </p>
          <p className="info-item">
            <strong>Phone Number</strong>
            <span>{employee.phone}</span>
          </p>
          <p className="info-item">
            <strong>Emergency Contact</strong>
            <span>{employee.emergencyContact}</span>
          </p>
          <p className="info-item">
            <strong>Emergency Contact Phone</strong>
            <span>{employee.emergencyContactPhone}</span>
          </p>
          <p className="info-item">
            <strong>Position</strong>
            <span>{employee.position}</span>
          </p>
          <p className="info-item">
            <strong>Salary</strong>
            <span>{employee.salary}</span>
          </p>
          <p className="info-item">
            <strong>Hire Date</strong>
            <span>{employee.hireDate}</span>
          </p>
          <p className="info-item">
            <strong>Leave Balance</strong>
            <span>{employee.leaveBalance}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
