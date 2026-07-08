import { NavLink } from "react-router-dom";

// Sidebar
// -------
// Left-hand navigation for the authenticated app area (dashboard and
// related feature pages). Uses NavLink so the active route can be
// styled automatically. Purely presentational for now — no permission
// checks or dynamic menu logic yet.
const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/company-questions", label: "Company Questions" },
  { to: "/dsa-tracker", label: "DSA Tracker" },
  { to: "/notes", label: "Notes" },
  { to: "/profile", label: "Profile" },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col w-60 shrink-0 bg-white border-r border-slate-200 p-4 gap-1">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-600 hover:bg-slate-100"
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </aside>
  );
}
