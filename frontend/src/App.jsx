import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import AlimentePage from "./pages/AlimentePage.jsx";
import AlimentDetaliuPage from "./pages/AlimentDetaliuPage.jsx";
import DesprePage from "./pages/DesprePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Harta paginilor aplicației tale */}
        <Route path="/" element={<AlimentePage />} />
        <Route path="/alimente/:id" element={<AlimentDetaliuPage />} />
        <Route path="/despre" element={<DesprePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}