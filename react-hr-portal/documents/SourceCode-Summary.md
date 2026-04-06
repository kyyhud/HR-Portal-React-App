# React HR Portal - Source Code Summary

## Project Structure

- src/App.jsx: Main route configuration and app shell layout
- src/index.css: Global design tokens and reusable shared classes
- src/components/: Functional components and component-level CSS files
- server/db.json: Mock backend data for employees and leave requests

## Key Modules

- Login: Validates credentials and routes user by role
- Onboarding: Verifies existing employee and completes onboarding fields
- EmployeeDashboard: Entry point for employee actions
- HrDashboard: Entry point for HR actions
- AddEmployee: HR adds new employee records
- EmployeeDetails: HR view of all employees
- EmployeeView: Employee view of own profile details
- ApplyLeave: Employee leave request creation and balance update
- ViewLeaveStatus: Employee leave status history
- ViewAllLeaveInfo: HR pending leave decisions with approve/reject actions

## Data Flow

- Frontend requests are sent through Axios to JSON Server endpoints.
- Employee data endpoint: /employeeDetails
- Leave data endpoint: /leaveInformation

## Styling Implementation

- Shared styles are centralized in index.css for consistency.
- App shell styles are managed in App.css.
- Each component has its own external CSS file in src/components.

## AI Usage Statement

GenAI was used to assist in producing styling elements and in creating this source code summary document.

## Notes

This project is intended for learning and practice, not production deployment.
