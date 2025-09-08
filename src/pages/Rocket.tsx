import { RocketCard } from "../components/cards";
import { RocketCardSkeleton } from "../components/ui";
import { useAllRockets } from "../hooks/useRockets";
import { Applayout } from "../layout";
import type { Rocket } from "../types/Rocket";

const Rocket = () => {
  const { data, isLoading } = useAllRockets();

  return (
    <Applayout>
      <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
      <div className="text-center">
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
          Rockets
        </h1>
      </div>
      <div className="py-10 flex flex-wrap gap-10 items-start justify-center">
        {isLoading && (
          <>
            <RocketCardSkeleton />
            <RocketCardSkeleton />
            <RocketCardSkeleton />
            <RocketCardSkeleton />
          </>
        )}

        {data &&
          Array.isArray(data) &&
          data.map((rocket) => <RocketCard key={rocket.id} rocket={rocket} />)}
      </div>
    </Applayout>
  );
};

export default Rocket;
