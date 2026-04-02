import axios from "axios";
import { useState, Link, useEffect } from "react";

export function ViewAllLeaveInfo() {
  const [leaveInfo, setLeaveInfo] = useState([]);
  const [msg, setMsg] = useState("");

  const LEAVE_INFO_URL = "http://localhost:3001/leaveInformation";

  useEffect(() => {
    allLeaveDetails();
  }, [msg]);

  const allLeaveDetails = async () => {
    const allLeaveInfo = await axios.get(LEAVE_INFO_URL);
    const pendingLeaveInfo = allLeaveInfo.data.filter((leaveInfo) => leaveInfo.leaveStatus === "Pending");
    setLeaveInfo(pendingLeaveInfo);
  };

  const updateLeaveStatus = async (id, status) => {
    setMsg("");
    await axios.patch(`${LEAVE_INFO_URL}/${id}`, { leaveStatus: status });
    setMsg(`Leave ${status}`);
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
            <input type="button" value="Approve" onClick={() => updateLeaveStatus(leave.id, "Approved")} />
            <input type="button" value="Reject" onClick={() => updateLeaveStatus(leave.id, "Rejected")} />
            <br />
          </li>
        ))}
      </ul>
    </>
  );
}
