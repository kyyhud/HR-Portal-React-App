import { Link, Outlet, useNavigate } from "react-router-dom";
import "./EmployeeDashboard.css";

export function EmployeeDashboard() {
  const emailId = sessionStorage.getItem("emailId");

  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("emailId");
    navigate("/");
  };

  return (
    <section className="page page-dashboard">
      <div className="page-title">
        <h2>Employee Dashboard</h2>
        <p>{emailId}</p>
      </div>

      <div className="panel dashboard-panel">
        <nav className="dashboard-nav" aria-label="Employee dashboard menu">
          <Link to="employee-view">View Your Details</Link>
          <Link to="apply-leave">Apply for Leave</Link>
          <Link to="view-leave-status">View Leave Status</Link>
        </nav>

        <div className="form-actions">
          <input type="button" value="Logout" onClick={logout} />
        </div>
      </div>

      <div className="dashboard-content">
        <Outlet />
      </div>
    </section>
  );
}
