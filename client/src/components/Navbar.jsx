// Top navigation shown on every page inside MainLayout.
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes.js";

export default function Navbar() {
  return (
    <header className="border-b border-border bg-surface">
      <nav className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3">
        <Link to={ROUTES.HOME} className="font-semibold text-primary">
          [App Name]
        </Link>
        <Link to={ROUTES.SEARCH}>Search</Link>
        <Link to={ROUTES.COMPARE}>Compare</Link>
        <Link to={ROUTES.CHAT}>Messages</Link>
        <Link to={ROUTES.SCAN_REQUEST} className="ml-auto">
          List your property
        </Link>
      </nav>
    </header>
  );
}
