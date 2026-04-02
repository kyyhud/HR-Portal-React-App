import { Link, Outlet, useNavigate } from "react-router-dom";

export function EmployeeDashboard() {
  const emailId = sessionStorage.getItem("emailId");

  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("emailId");
    navigate("/");
  };

  return (
    <>
      <h2>Employee Dashboard: {emailId}</h2>
      <Link to="employee-view">View Your Details</Link> |<Link to="apply-leave">Apply for Leave</Link>
      <br />
      <input type="button" value="logout" onClick={logout} />
      <Outlet />
    </>
  );
}
