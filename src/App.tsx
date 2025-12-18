import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GamePage } from "./pages/GamePage";
import { HostPage } from "./pages/HostPage";
import { AdminPage } from "./pages/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/host" replace />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/host" element={<HostPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
