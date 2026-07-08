import AppRoutes from "./routes/AppRoutes.jsx";

// App
// ---
// Root component. Intentionally minimal: it just renders the route
// tree. Global providers (auth context, query client, etc.) will wrap
// <AppRoutes /> here once they're introduced.
export default function App() {
  return <AppRoutes />;
}
