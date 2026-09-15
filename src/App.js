// COMPONENTS
import Menu from "./pages/Menu";
import Dashboard from "./pages/Dashboard";
import Manager from "./pages/Manager";
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manager" element={<Manager />} />
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
