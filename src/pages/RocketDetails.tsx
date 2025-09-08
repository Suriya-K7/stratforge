import { useNavigate, useParams } from "react-router-dom";
import { useRocketById } from "../hooks/useRockets";
import { Applayout } from "../layout";
import type { Rocket } from "../types/Rocket";
import { Button, RocketDetailsSkeleton } from "../components/ui";

const RocketDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useRocketById(id || "");
  const navigate = useNavigate();

  const rocketData = data as Rocket;

  return (
    <Applayout>
      <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
      <div className="text-center">
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
          Rockets Details
        </h1>
      </div>

      {isLoading && <RocketDetailsSkeleton />}
      {/* Hero Section */}
      {rocketData?.id && (
        <div className="relative w-full h-[400px] overflow-hidden rounded-xl shadow-lg mt-4">
          <img
            src={
              rocketData.flickr_images[0] || rocketData.flickr_images[1] || ""
            }
            alt={rocketData.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
            <h1 className="text-4xl sm:text-6xl font-bold text-white">
              {rocketData.name}
            </h1>
            <p className="text-lg text-gray-300">
              {rocketData.company} • {rocketData.country}
            </p>
          </div>
        </div>
      )}

      {/* Details Section */}
      {rocketData?.id ? (
        <div className="py-12 max-w-4xl mx-auto text-center">
          <p className="text-lg sm:text-xl text-gray-400 leading-relaxed">
            {rocketData.description}
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
            <div className="bg-white/5 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-white mb-2">
                Dimensions
              </h3>
              <p className="text-gray-300">
                Height: {rocketData.height.meters} m / {rocketData.height.feet}{" "}
                ft
              </p>
              <p className="text-gray-300">
                Diameter: {rocketData.diameter.meters} m /{" "}
                {rocketData.diameter.feet} ft
              </p>
              <p className="text-gray-300">
                Mass: {rocketData.mass.kg.toLocaleString()} kg /{" "}
                {rocketData.mass.lb.toLocaleString()} lb
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-white mb-2">Specs</h3>
              <p className="text-gray-300">
                Cost per Launch: ${rocketData.cost_per_launch.toLocaleString()}
              </p>
              <p className="text-gray-300">
                Success Rate: {rocketData.success_rate_pct}%
              </p>
              <p className="text-gray-300">Stages: {rocketData.stages}</p>
              <p className="text-gray-300">
                First Flight:{" "}
                {new Date(rocketData.first_flight).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Wikipedia Link */}
          <div className="mt-8">
            <a
              href={rocketData.wikipedia}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>Learn More</Button>
            </a>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </div>
        </div>
      ) : (
        <div className="text-center h-[calc(100vh-40vh)] flex items-center justify-center flex-col gap-4">
          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Data Not Found
          </h1>
          <p className="mt-6 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">
            Sorry, we couldn’t find the data you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button onClick={() => navigate(-1)}>Go back</Button>
          </div>
        </div>
      )}
    </Applayout>
  );
};

export default RocketDetails;
