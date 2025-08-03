import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import RequireAdminAuth from "./components/RequireAdminAuth";

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin login page */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Protected admin dashboard */}
        <Route
          path="/admin"
          element={
            <RequireAdminAuth>
              <AdminPanel />
            </RequireAdminAuth>
          }
        />

        {/* Redirect unknown routes to admin login */}
        <Route path="*" element={<Navigate to="/admin-login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
