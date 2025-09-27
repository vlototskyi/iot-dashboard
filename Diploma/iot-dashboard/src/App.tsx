import { Routes, Route } from "react-router-dom";
import AppShell from "./components/AppShell";
import Home from "./pages/Home";
import DeviceDetail from "./pages/DeviceDetail";

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/device/:deviceId" element={<DeviceDetail />} />
      </Routes>
    </AppShell>
  );
}
