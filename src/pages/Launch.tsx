// import { useUpcomingLaunches } from "../hooks/useLaunches";
import { Applayout } from "../layout";

const Launch = () => {
  // const {data, isLoading} = useUpcomingLaunches();
  return (
    <Applayout>
      <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
      <div className="text-center">
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
          Launches
        </h1>
      </div>
      <div className="py-10 flex flex-wrap gap-10 items-start justify-center"></div>
    </Applayout>
  );
};

export default Launch;
