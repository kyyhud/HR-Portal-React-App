import { useNavigate, Link, Outlet } from "react-router-dom";

export function HrDashboard() {
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
  };

  return (
    <>
      <h2>HR Dashboard</h2>
      <Link to="add-employee">Add New Employee</Link> | <Link to="all-employees">View All Employees</Link>
      <br />
      <input type="button" value="logout" onClick={logout} />
      <br />
      <Outlet />
    </>
  );
}
