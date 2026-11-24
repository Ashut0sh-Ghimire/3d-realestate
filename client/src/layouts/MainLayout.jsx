// Wraps every page that should show the navbar. The page renders in <Outlet />.
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
