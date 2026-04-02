import axios from "axios";
import { useState, Link } from "react";

export function ApplyLeave() {
  const [leaveReason, setReason] = useState("");
  const [numberOfDays, setNumberOfDays] = useState("");
  const [dateOfLeave, setDateOfLeave] = useState("");
  const [leaveStatus, setLeaveStatus] = useState("Pending");
  const [msg, setMsg] = useState("");

  const LEAVE_INFO_URL = "http://localhost:3001/leaveInformation";
  const emailId = sessionStorage.getItem("emailId");

  const applyLeaveDetails = async (e) => {
    e.preventDefault();
    const leaveDetails = {
      emailId,
      leaveReason,
      numberOfDays: Number(numberOfDays),
      dateOfLeave,
      leaveStatus,
    };

    try {
      await axios.post(LEAVE_INFO_URL, leaveDetails);
      setMsg("Leave applied successfully.");
      setReason("");
      setNumberOfDays("");
      setDateOfLeave("");
      setLeaveStatus("Pending");
    } catch (error) {
      setMsg("Failed to apply leave. Please try again.");
      console.error("Apply leave failed:", error);
    }
  };

  return (
    <>
      <h2>Apply Leave</h2>
      <form onSubmit={applyLeaveDetails}>
        <label>Reason for Leave: </label>
        <input type="text" name="reason" value={leaveReason} onChange={(e) => setReason(e.target.value)} required />
        <br />
        <label>Number of Days: </label>
        <input type="number" name="numberOfDays" value={numberOfDays} onChange={(e) => setNumberOfDays(e.target.value)} required />
        <br />
        <label>Start Date of Leave: </label>
        <input type="date" name="dateOfLeave" value={dateOfLeave} onChange={(e) => setDateOfLeave(e.target.value)} required />
        <br />
        <input type="submit" value="Apply for Leave" />
      </form>
      <p>{msg}</p>
    </>
  );
}
