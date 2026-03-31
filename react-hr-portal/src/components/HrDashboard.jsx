import { useNavigate } from "react-router-dom";

export function HrDashboard() {
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
  };

  return (
    <>
      <h2>HR Dashboard</h2>

      <input type="button" value="logout" onClick={logout} />
    </>
  );
}
