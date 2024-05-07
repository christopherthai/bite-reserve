import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import RestaurantDetail from "./components/Restaurants/RestaurantDetail";
import ReservationsPage from "./pages/ReservationsPage";
import ReservationDetail from "./components/Reservations/ReservationDetail";
import ReservationForm from "./components/Reservations/ReservationForm";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ManageRestaurants from "./components/Admin/ManageRestaurants";
import ManageReservations from "./components/Admin/ManageReservations";
import NotFoundPage from "./pages/NotFoundPage";
import UserContext from "./UserContext";
import ReviewsList from "./components/Reviews/ReviewsList";
import { useState } from "react";
import ReviewsList from "./components/Reviews/ReviewsList";

function App() {
  const [isLogin, setIsLogin] = useState(false); // State to store the login status

  return (
    <>
      <UserContext.Provider value={{ isLogin, setIsLogin }}>
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
            <Route path="/reservationsform/:id" element={<ReservationForm />} />
            <Route path="/admindashboard" element={<AdminDashboardPage />} />
            <Route path="/manage-restaurants" element={<ManageRestaurants />} />
            <Route
              path="/manage-reservations"
              element={<ManageReservations />}
            />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/restaurants/:id/reviews" element={<ReviewsList />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </>
  );
}

export default App;
