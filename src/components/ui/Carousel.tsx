type LaunchProps = {
  data: Launch[] | ServiceError;
};

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Launch } from "../../types/Launch";
import { ArrowLeft, ArrowRight } from "../../assets/icons/common";
import type { ServiceError } from "../../types/Api";
import Button from "./Button";

const Carousel = ({ data }: LaunchProps) => {
  const [current, setCurrent] = useState(0);
  console.log(data);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 && Array.isArray(data) ? data?.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) =>
      Array.isArray(data) && prev === data?.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden">
      {/* Slides */}
      <motion.div
        className="flex"
        animate={{ x: `-${current * 100}%` }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
      >
        {data &&
          Array.isArray(data) &&
          data.map((item, idx) => (
            <div
              key={idx}
              className="w-full flex-shrink-0 glass flex flex-col items-center justify-center py-5"
            >
              <span className="text-white font-light sm:xl md:text-3xl uppercase">
                {item.name}
              </span>
              <div>
                <img
                  src={item.links.patch.small || ""}
                  alt={`Slide ${idx}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
                {/* <Button>Visit Launch</Button> */}
              </div>
            </div>
          ))}
      </motion.div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 -translate-y-1/2 p-2 rounded-full shadow hover:bg-white/10 duration-200"
      >
        <ArrowLeft className="text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 -translate-y-1/2  p-2 rounded-full shadow hover:bg-white/20 duration-200"
      >
        <ArrowRight className="text-white" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
        {Array.isArray(data) &&
          data.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full ${
                current === idx ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
      </div>
    </div>
  );
};

export default Carousel;
