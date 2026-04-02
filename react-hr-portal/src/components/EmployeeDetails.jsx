import { useEffect, useState } from "react";
import axios from "axios";

export function EmployeeDetails() {
  const [allEmployees, setAllEmployees] = useState([]);

  const EMPLOYEE_URL = "http://localhost:3001/employeeDetails";
  useEffect(() => {
    viewAllEmployees();
  }, []);

  const viewAllEmployees = async () => {
    const response = await axios.get(EMPLOYEE_URL);
    setAllEmployees(response.data);
  };

  return (
    <>
      <h2>All Employee Details</h2>
      <table border="2">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Leave Balance</th>
          </tr>
        </thead>
        <tbody>
          {allEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.position}</td>
              <td>{employee.salary}</td>
              <td>{employee.leaveBalance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
