import { Link } from "react-router-dom";
import { Applayout } from "../layout";
import { COMPANY_INFO, NAVIGATION } from "../lib/constants/appConstants";
import { Carousel, SkeletonLoading } from "../components/ui";
import { useUpcomingLaunches } from "../hooks/useLaunches";

const Home = () => {
  const { data, isLoading } = useUpcomingLaunches();

  return (
    <Applayout>
      <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
      <div className="text-center">
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
          {COMPANY_INFO.name}
        </h1>
        <p className="mt-8 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">
          {COMPANY_INFO.summary}
        </p>
        <div className="py-6 flex flex-col items-center justify-center gap-4">
          <h3 className="text-balance text-3xl font-light tracking-tight text-white sm:text-5xl">
            Upcoming Launches
          </h3>
          {isLoading && <SkeletonLoading />}
          {data && <Carousel data={data} />}
        </div>

        <div className="mt-4 flex items-center justify-center gap-x-6">
          <Link
            to={NAVIGATION[1].href}
            className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Check out Rockets!
          </Link>
          <Link
            to={COMPANY_INFO.links.website}
            className="text-sm/6 font-semibold text-white"
          >
            Learn more <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </Applayout>
  );
};

export default Home;
