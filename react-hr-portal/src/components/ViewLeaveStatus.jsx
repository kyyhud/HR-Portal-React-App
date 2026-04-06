import axios from "axios";
import { useState, useEffect } from "react";
import "./ViewLeaveStatus.css";

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
    <section className="page page-leave-status">
      <div className="page-title">
        <h2>View Leave Status</h2>
        <p>Requests submitted: {leaveInfo.length}</p>
      </div>

      <div className="cards">
        {leaveInfo.map((leave, index) => (
          <div className="card" key={leave.id || index}>
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
          </div>
        ))}
      </div>
    </section>
  );
}
