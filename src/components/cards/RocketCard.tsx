import { memo } from "react";
import type { Rocket } from "../../types/Rocket";
import { Button } from "../ui";
import { Link } from "react-router-dom";

type RocketProps = {
  rocket: Rocket;
};

const RocketCard = ({ rocket }: RocketProps) => {
  return (
    <div className="min-w-[300px] mx-auto rounded-xl overflow-hidden border glass duration-200 shadow-[0px_4px_30px_0px_rgba(31,_38,_135,_0.15)]">
      <img
        className="w-full h-48 object-cover"
        src={rocket?.flickr_images[0] || rocket?.flickr_images[1] || ""}
        alt={rocket.name}
        loading="lazy"
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold text-white">{rocket.name}</h2>
        <p className="text-sm text-gray-500 mb-4">
          {rocket.company} • {rocket.country}
        </p>

        <Button className="w-full">
          <Link to={`/rockets/${rocket.id}`} className="w-full">
            View
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default memo(RocketCard);
