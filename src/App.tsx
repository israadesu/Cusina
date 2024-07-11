import FavoritesPage from "./pages/FavoritesPage";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Homepage from "./pages/Homepage";


function App() {
  return (
    <div className="flex bg-gray-900">
      <Sidebar />
      <Routes>
        <Route path="/home" element={<Homepage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </div>
  );
}

export default App;
