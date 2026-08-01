import { NavLink } from "react-router-dom";

const links = [
  {
    to: "/dashboard",
    label: "🏠 Dashboard",
  },
  {
    to: "/company-questions",
    label: "💼 Company Questions",
  },
  {
    to: "/dsa-tracker",
    label: "📚 DSA Tracker",
  },
  {
    to: "/notes",
    label: "📝 Notes",
  },
  {
    to: "/resume",
    label: "📄 Resume",
  },
  {
    to: "/profile",
    label: "👤 Profile",
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-slate-200 p-4">

      <h2 className="text-xl font-bold text-indigo-600 mb-6">
        InterviewPrep AI
      </h2>

      <nav className="flex flex-col gap-2">

        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `px-4 py-3 rounded-lg font-medium transition-all ${
                isActive
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-700 hover:bg-slate-100"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}

      </nav>

    </aside>
  );
}