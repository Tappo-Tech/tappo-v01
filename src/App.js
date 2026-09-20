// COMPONENTS
import Menu from "./pages/Menu";
import CashierDashboard from "./pages/CashierDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import NotFound from "./components/NotFound";

// STYLES
import "./App.css";

// ROUTING
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/menu/:tableNumber?" element={<Menu />} />
        <Route path="/dashboard" element={<CashierDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route
          path="*"
          element={
            <NotFound
              title="صفحة غير موجودة"
              message="الرابط الذي تحاول الوصول إليه غير صحيح."
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
