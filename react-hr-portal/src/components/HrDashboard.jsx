import { useNavigate, Link, Outlet } from "react-router-dom";
import "./HrDashboard.css";

export function HrDashboard() {
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
  };

  return (
    <section className="page page-dashboard">
      <div className="page-title">
        <h2>HR Dashboard</h2>
        <p>Manage employees and leave approvals.</p>
      </div>

      <div className="panel dashboard-panel">
        <nav className="dashboard-nav" aria-label="HR dashboard menu">
          <Link to="add-employee">Add New Employee</Link>
          <Link to="all-employees">View All Employees</Link>
          <Link to="all-leave-info">View All Leave Info</Link>
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
