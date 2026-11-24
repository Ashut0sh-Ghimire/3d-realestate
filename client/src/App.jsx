// The only place screens are wired to URLs. To add a screen:
// 1) add its path to constants/routes.js  2) create pages/<Name>/<Name>.jsx  3) add a <Route> here.
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/routes.js";
import MainLayout from "./layouts/MainLayout.jsx";
import Splash from "./pages/Splash/Splash.jsx";
import Onboarding from "./pages/Onboarding/Onboarding.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Login from "./pages/Login/Login.jsx";
import Otp from "./pages/Otp/Otp.jsx";
import Home from "./pages/Home/Home.jsx";
import Search from "./pages/Search/Search.jsx";
import Listing from "./pages/Listing/Listing.jsx";
import Tour from "./pages/Tour/Tour.jsx";
import Compare from "./pages/Compare/Compare.jsx";
import Booking from "./pages/Booking/Booking.jsx";
import Chat from "./pages/Chat/Chat.jsx";
import ScanRequest from "./pages/ScanRequest/ScanRequest.jsx";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      {/* Full-screen pages, no navbar */}
      <Route path={ROUTES.SPLASH} element={<Splash />} />
      <Route path={ROUTES.ONBOARDING} element={<Onboarding />} />
      <Route path={ROUTES.SIGNUP} element={<Signup />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.OTP} element={<Otp />} />
      <Route path={ROUTES.TOUR} element={<Tour />} />

      {/* Pages that show the navbar */}
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.SEARCH} element={<Search />} />
        <Route path={ROUTES.LISTING} element={<Listing />} />
        <Route path={ROUTES.COMPARE} element={<Compare />} />
        <Route path={ROUTES.BOOKING} element={<Booking />} />
        <Route path={ROUTES.CHAT} element={<Chat />} />
        <Route path={ROUTES.SCAN_REQUEST} element={<ScanRequest />} />
        <Route path={ROUTES.ADMIN} element={<AdminDashboard />} />
      </Route>

      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
}
