import { Routes, Route } from "react-router-dom";
import {
  History,
  Home,
  Launch,
  PageNotFound,
  Rocket,
  RocketDetails,
} from "../pages";
import ROUTES from "../lib/constants/routes";
import { Suspense } from "react";
import { SplachScreen } from "../components/ui";

/**
 * AppRouter
 * Handles all route definitions for the SpaceX Info WebApp
 *
 * @returns JSX with route config
 */
const AppRouter = () => {
  return (
    <Suspense fallback={<SplachScreen />}>
      <Routes>
        {/* Landing Page */}
        <Route path={ROUTES.HOME} element={<Home />} />

        {/* Menu Pages */}
        <Route path={ROUTES.HISTORY} element={<History />} />
        <Route path={ROUTES.LAUNCHES} element={<Launch />} />
        <Route path={ROUTES.ROCKETS} element={<Rocket />} />
        <Route path={ROUTES.ROCKET_DETAIL} element={<RocketDetails />} />

        {/* Page not found */}
        <Route path={ROUTES.NOT_FOUND} element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
