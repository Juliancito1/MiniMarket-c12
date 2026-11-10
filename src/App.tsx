import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { AdminDashboard } from "./pages/AdminDashboard";
import { useAuth } from "./context/AuthContext";
import { Register } from "./pages/Register";

const AdminRoute = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;

  return <AdminDashboard />;
};

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/admin" element={<AdminRoute />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
