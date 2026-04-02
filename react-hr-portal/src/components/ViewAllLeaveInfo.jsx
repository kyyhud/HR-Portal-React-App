import axios from "axios";
import { useState, useEffect } from "react";

export function ViewAllLeaveInfo() {
  const [leaveInfo, setLeaveInfo] = useState([]);
  const [msg, setMsg] = useState("");

  const LEAVE_INFO_URL = "http://localhost:3001/leaveInformation";
  const EMPLOYEE_URL = "http://localhost:3001/employeeDetails";

  useEffect(() => {
    allLeaveDetails();
  }, [msg]);

  const allLeaveDetails = async () => {
    const allLeaveInfo = await axios.get(LEAVE_INFO_URL);
    const pendingLeaveInfo = allLeaveInfo.data.filter((leaveInfo) => leaveInfo.leaveStatus === "Pending");
    setLeaveInfo(pendingLeaveInfo);
  };

  const updateLeaveStatus = async (leave, status) => {
    setMsg("");

    try {
      await axios.patch(`${LEAVE_INFO_URL}/${leave.id}`, { leaveStatus: status });

      if (status === "Rejected" && leave.leaveStatus === "Pending") {
        const employeeResponse = await axios.get(EMPLOYEE_URL);
        const currentEmployee = employeeResponse.data.find((employee) => employee.email === leave.emailId);

        if (!currentEmployee) {
          setMsg("Leave rejected, but employee details were not found for refund.");
          return;
        }

        const refundedBalance = (Number(currentEmployee.leaveBalance) || 0) + (Number(leave.numberOfDays) || 0);
        await axios.patch(`${EMPLOYEE_URL}/${currentEmployee.id}`, { leaveBalance: refundedBalance });
        setMsg("Leave Rejected and leave balance refunded.");
        return;
      }

      setMsg(`Leave ${status}`);
    } catch (error) {
      setMsg(`Failed to update leave to ${status}. Please try again.`);
      console.error("Failed to update leave status:", error);
    }
  };

  return (
    <>
      <h2>All Leave Requests</h2>
      <p>{msg}</p>
      <ul>
        {leaveInfo.map((leave) => (
          <li key={leave.id}>
            <p>
              <strong>Email ID:</strong> {leave.emailId}
            </p>
            <p>
              <strong>Reason for Leave:</strong> {leave.leaveReason}
            </p>
            <p>
              <strong>Number of Days:</strong> {leave.numberOfDays}
            </p>
            <p>
              <strong>Start Date of Leave:</strong> {leave.dateOfLeave}
            </p>
            <p>
              <strong>Leave Status:</strong> {leave.leaveStatus}
            </p>
            <input type="button" value="Approve" onClick={() => updateLeaveStatus(leave, "Approved")} />
            <input type="button" value="Reject" onClick={() => updateLeaveStatus(leave, "Rejected")} />
            <br />
          </li>
        ))}
      </ul>
    </>
  );
}
