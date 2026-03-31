import { useNavigate } from "react-router-dom";

export function EmployeeDashboard() {
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
  };

  return (
    <>
      <h2>Employee Dashboard</h2>

      <input type="button" value="logout" onClick={logout} />
    </>
  );
}
