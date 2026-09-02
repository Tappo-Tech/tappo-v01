// COMPONENTS
import Menu from "./pages/Menu";

// STYLES
import "./App.css"

// ROUTING
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/menu/:tableNumber" element={<Menu />} />
        <Route path="/menu/" element={<Menu />} />
      </Routes>
    </div>
  );
}

export default App;