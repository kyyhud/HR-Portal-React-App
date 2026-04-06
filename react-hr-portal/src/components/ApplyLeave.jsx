import axios from "axios";
import { useEffect, useState } from "react";
import "./ApplyLeave.css";

export function ApplyLeave() {
  const [leaveReason, setReason] = useState("");
  const [numberOfDays, setNumberOfDays] = useState("");
  const [dateOfLeave, setDateOfLeave] = useState("");
  const [leaveStatus, setLeaveStatus] = useState("Pending");
  const [msg, setMsg] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [leaveBalance, setLeaveBalance] = useState(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const LEAVE_INFO_URL = "http://localhost:3001/leaveInformation";
  const EMPLOYEE_URL = "http://localhost:3001/employeeDetails";
  const emailId = sessionStorage.getItem("emailId");

  const loadCurrentEmployee = async () => {
    if (!emailId) {
      setMsg("Please login again to apply for leave.");
      setIsLoadingBalance(false);
      return;
    }
    try {
      setIsLoadingBalance(true);
      const response = await axios.get(EMPLOYEE_URL);
      const currentEmployee = response.data.find((employee) => employee.email === emailId);
      if (!currentEmployee) {
        setMsg("Employee details not found. Please contact HR.");
        setEmployeeId("");
        setLeaveBalance(null);
        return;
      }
      setEmployeeId(currentEmployee.id);
      setLeaveBalance(Number(currentEmployee.leaveBalance) || 0);
    } catch (error) {
      setMsg("Failed to load leave balance. Please refresh and try again.");
      console.error("Failed loading employee details:", error);
    } finally {
      setIsLoadingBalance(false);
    }
  };

  useEffect(() => {
    loadCurrentEmployee();
  }, []);

  const applyLeaveDetails = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!employeeId || leaveBalance === null) {
      setMsg("Employee details are not loaded yet. Please try again.");
      return;
    }

    const requestedDays = Number(numberOfDays);
    if (!Number.isInteger(requestedDays) || requestedDays <= 0) {
      setMsg("Number of days should be a positive whole number.");
      return;
    }
    if (requestedDays > leaveBalance) {
      setMsg(`You only have ${leaveBalance} leave day(s) available.`);
      return;
    }

    const updatedLeaveBalance = leaveBalance - requestedDays;
    const leaveDetails = {
      emailId,
      leaveReason,
      numberOfDays: requestedDays,
      dateOfLeave,
      leaveStatus,
    };

    try {
      setIsSubmitting(true);
      await axios.post(LEAVE_INFO_URL, leaveDetails);

      try {
        await axios.patch(`${EMPLOYEE_URL}/${employeeId}`, { leaveBalance: updatedLeaveBalance });
        setLeaveBalance(updatedLeaveBalance);
        setMsg(`Leave applied successfully. Remaining leave balance: ${updatedLeaveBalance}`);
        setReason("");
        setNumberOfDays("");
        setDateOfLeave("");
        setLeaveStatus("Pending");
      } catch (balanceError) {
        setMsg("Leave request was created, but balance update failed. Balance is being refreshed.");
        console.error("Leave balance update failed:", balanceError);
        await loadCurrentEmployee();
      }
    } catch (error) {
      setMsg("Failed to apply leave. Please try again.");
      console.error("Apply leave failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const requestedDays = Number(numberOfDays);
  const showProjectedBalance = leaveBalance !== null && Number.isInteger(requestedDays) && requestedDays > 0;
  const projectedBalance = showProjectedBalance ? leaveBalance - requestedDays : null;

  return (
    <section className="page page-apply-leave">
      <div className="page-title">
        <h2>Apply Leave</h2>
        <p>
          <strong>Current Leave Balance:</strong> {isLoadingBalance ? "Loading..." : (leaveBalance ?? "N/A")}
        </p>
      </div>

      <form className="form-card" onSubmit={applyLeaveDetails}>
        <div className="form-grid apply-leave-grid">
          <div className="input-group">
            <label htmlFor="leaveReason">Reason for Leave</label>
            <input
              id="leaveReason"
              type="text"
              name="reason"
              value={leaveReason}
              onChange={(e) => setReason(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="input-group">
            <label htmlFor="leaveDays">Number of Days</label>
            <input
              id="leaveDays"
              type="number"
              name="numberOfDays"
              value={numberOfDays}
              onChange={(e) => setNumberOfDays(e.target.value)}
              min="1"
              max={leaveBalance ?? undefined}
              required
              disabled={isLoadingBalance || leaveBalance === 0 || isSubmitting}
            />
          </div>

          <div className="input-group">
            <label htmlFor="leaveDate">Start Date of Leave</label>
            <input
              id="leaveDate"
              type="date"
              name="dateOfLeave"
              value={dateOfLeave}
              onChange={(e) => setDateOfLeave(e.target.value)}
              required
              disabled={isLoadingBalance || leaveBalance === 0 || isSubmitting}
            />
          </div>
        </div>
        <br />
        <div className="form-actions">
          <input type="submit" value={isSubmitting ? "Applying..." : "Apply for Leave"} disabled={isLoadingBalance || leaveBalance === 0 || isSubmitting} />
        </div>
      </form>

      {showProjectedBalance ? (
        <p className="panel apply-leave-balance">
          <strong>Projected Balance:</strong> {projectedBalance}
        </p>
      ) : null}

      {msg ? <p className="status-message">{msg}</p> : null}
    </section>
  );
}
