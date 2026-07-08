import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";

// Layout
// ------
// Shared page shell: Navbar on top, Sidebar on the left, and the current
// route's page rendered as "children" on the right. Wrap any page that
// needs the standard app chrome with this component (see AppRoutes.jsx).
//
// Kept intentionally simple/presentational — no auth guarding here yet.
export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
