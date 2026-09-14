import { NavLink } from "react-router-dom";

const links = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: "🏠",
  },
  {
    to: "/company-questions",
    label: "Company Questions",
    icon: "💼",
  },
  {
    to: "/dsa-tracker",
    label: "DSA Tracker",
    icon: "📚",
  },
  {
    to: "/notes",
    label: "Notes",
    icon: "📝",
  },
  {
    to: "/resume",
    label: "Resume",
    icon: "📄",
  },
  {
    to: "/profile",
    label: "Profile",
    icon: "👤",
  },
  {
    to: "/bookmarks",
    label: "Bookmarks",
    icon: "🔖",
  },
  {
    to: "/solved",
    label: "Solved Questions",
    icon: "✅",
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col w-56 shrink-0 bg-white border-r border-slate-200 px-3 py-5 min-h-screen">
      {/* Logo */}
      <div className="px-3 mb-6">
        <h2 className="text-lg font-bold text-indigo-600 tracking-tight">
          InterviewPrep <span className="text-indigo-400">AI</span>
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            <span className="text-base leading-none">
              {link.icon}
            </span>

            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}