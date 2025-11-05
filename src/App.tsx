import { Routes, Route, useLocation } from "react-router-dom";
import Layoutt from "./components/Layoutt";
import Dashboard from "./pages/Dashboard";
import Member from "./pages/Member";
import Loans from "./pages/Loans";
import View from "./pages/Member/View";
// import Settings from "./pages/Settings";
import AddNewMembers from "./pages/Member/AddNewMembers";
import LoanApplicationForm from "./pages/Member/LoanApplicationForm";

function App() {
  const location = useLocation();

  // Dynamic titles per page
  const getNavbarTitle = () => {
    switch (location.pathname) {
      case "/":
      case "/dashboard":
        return "Welcome, Admin";
      case "/members":
        return "Members Overview";
      case "/loans":
        return "Loans Management";
      case "/savings":
        return "Savings Management";
      case "/shares":
        return "Shares Management";
      case "/transactions":
        return "Transactions";
      case "/settings":
        return "System Settings";
      case "/members/view":
        return "Edit Member";
      case "/members/AddNewMembers":
        return "Add New Members";
      case "/loans/LoanApplicationForm":
        return "Loan Application Form";
      default:
        return "Dashboard";
    }
  };

  return (
    <Layoutt navbarTitle={getNavbarTitle()}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/members" element={<Member />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/members/view" element={<View />} />
        <Route path="/members/AddNewMembers" element={<AddNewMembers />} />
        <Route
          path="/loans/LoanApplicationForm"
          element={<LoanApplicationForm />}
        />

        {/* <Route path="/settings" element={<Settings />} /> */}
      </Routes>
    </Layoutt>
  );
}

export default App;
