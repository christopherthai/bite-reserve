import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import RestaurantDetail from "./components/Restaurants/RestaurantDetail";
import ReservationsPage from "./pages/ReservationsPage";
import ReservationDetail from "./components/Reservations/ReservationDetail";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/reservation/:id" element={<ReservationDetail />} />
          <Route path="/admindashboard" element={<AdminDashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
