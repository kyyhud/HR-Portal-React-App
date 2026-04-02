import axios from "axios";
import { useState, Link, useEffect } from "react";

export function ViewLeaveStatus() {
  const [leaveInfo, setLeaveInfo] = useState([]);

  const LEAVE_INFO_URL = "http://localhost:3001/leaveInformation";
  const emailId = sessionStorage.getItem("emailId");

  useEffect(() => {
    viewLeaveInfo();
  }, []);

  const viewLeaveInfo = async () => {
    const allLeaveInfo = await axios.get(LEAVE_INFO_URL);
    const leaveStatus = allLeaveInfo.data.filter((leaveInfo) => leaveInfo.emailId === emailId);
    setLeaveInfo(leaveStatus);
  };

  return (
    <>
      <h2>View Leave Status</h2>
      {leaveInfo.map((leave, index) => (
        <div key={leave.id || index}>
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
          <br />
        </div>
      ))}
    </>
  );
}
