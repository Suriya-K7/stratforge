import { Routes, Route } from "react-router-dom";
import { History, Home, Launch, Rocket, RocketDetails } from "../pages";
import ROUTES from "../lib/constants/routes";

/**
 * AppRouter
 * Handles all route definitions for the SpaceX Info WebApp
 *
 * @returns JSX with route config
 */
const AppRouter = () => {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path={ROUTES.HOME} element={<Home />} />

      {/* Menu Pages */}
      <Route path={ROUTES.HISTORY} element={<History />} />
      <Route path={ROUTES.LAUNCHES} element={<Launch />} />
      <Route path={ROUTES.ROCKETS} element={<Rocket />} />
      <Route path={ROUTES.ROCKET_DETAIL} element={<RocketDetails />} />

      {/* Page not found */}
      <Route
        path={ROUTES.NOT_FOUND}
        element={
          <h1 className="text-center mt-10 text-2xl">404 - Page Not Found</h1>
        }
      />
    </Routes>
  );
};

export default AppRouter;
