// import './App.css'
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Onboarding } from "./components/Onboarding";
import { EmployeeDashboard } from "./components/EmployeeDashboard";
import { HrDashboard } from "./components/HrDashboard";
import { AddEmployee } from "./components/AddEmployee";
import { EmployeeDetails } from "./components/EmployeeDetails";
import { EmployeeView } from "./components/EmployeeView";
import { ApplyLeave } from "./components/ApplyLeave";
import { ViewAllLeaveInfo } from "./components/ViewAllLeaveInfo";
import { ViewLeaveStatus } from "./components/ViewLeaveStatus";

function App() {
  return (
    <>
      <h1>HR Portal - React App</h1>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />

        <Route path="/employee/dashboard" element={<EmployeeDashboard />}>
          <Route path="employee-view" element={<EmployeeView />} />
          <Route path="apply-leave" element={<ApplyLeave />} />
          <Route path="view-leave-status" element={<ViewLeaveStatus />} />
        </Route>

        <Route path="/hr/dashboard" element={<HrDashboard />}>
          <Route path="add-employee" element={<AddEmployee />} />
          <Route path="all-employees" element={<EmployeeDetails />} />
          <Route path="all-leave-info" element={<ViewAllLeaveInfo />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
