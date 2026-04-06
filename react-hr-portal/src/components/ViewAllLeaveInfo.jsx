import axios from "axios";
import { useState, useEffect } from "react";
import "./ViewAllLeaveInfo.css";

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
    <section className="page page-all-leave-info">
      <div className="page-title">
        <h2>All Leave Requests</h2>
        <p>Pending requests: {leaveInfo.length}</p>
      </div>

      {msg ? <p className="status-message">{msg}</p> : null}

      <ul className="cards">
        {leaveInfo.map((leave) => (
          <li className="card" key={leave.id}>
            <div className="info-list">
              <p className="info-item">
                <strong>Email ID</strong>
                <span>{leave.emailId}</span>
              </p>
              <p className="info-item">
                <strong>Reason for Leave</strong>
                <span>{leave.leaveReason}</span>
              </p>
              <p className="info-item">
                <strong>Number of Days</strong>
                <span>{leave.numberOfDays}</span>
              </p>
              <p className="info-item">
                <strong>Start Date of Leave</strong>
                <span>{leave.dateOfLeave}</span>
              </p>
              <p className="info-item">
                <strong>Leave Status</strong>
                <span>{leave.leaveStatus}</span>
              </p>
            </div>

            <div className="card-actions">
              <input type="button" value="Approve" onClick={() => updateLeaveStatus(leave, "Approved")} />
              <input className="btn-danger" type="button" value="Reject" onClick={() => updateLeaveStatus(leave, "Rejected")} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
