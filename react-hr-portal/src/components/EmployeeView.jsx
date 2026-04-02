import { useEffect, useState } from "react";
import axios from "axios";

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
    <>
      <h2>Your Employee Details</h2>
      <div>
        <p>
          <strong>Name:</strong> {employee.name}
        </p>
        <p>
          <strong>Email:</strong> {employee.email}
        </p>
        <p>
          <strong>Address:</strong> {employee.address}
        </p>
        <p>
          <strong>Phone Number:</strong> {employee.phone}
        </p>
        <p>
          <strong>Emergency Contact:</strong> {employee.emergencyContact}
        </p>
        <p>
          <strong>Emergency Contact Phone:</strong> {employee.emergencyContactPhone}
        </p>
        <p>
          <strong>Position:</strong> {employee.position}
        </p>
        <p>
          <strong>Salary:</strong> {employee.salary}
        </p>
        <p>
          <strong>Hire Date:</strong> {employee.hireDate}
        </p>
        <p>
          <strong>Leave Balance:</strong> {employee.leaveBalance}
        </p>
      </div>
    </>
  );
}
