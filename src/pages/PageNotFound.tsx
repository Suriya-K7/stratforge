import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui";
import { Applayout } from "../layout";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Applayout>
      <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
      <div className="text-center h-[calc(100vh-20vh)] flex items-center justify-center flex-col gap-4">
        <p className="text-3xl font-semibold text-indigo-400">404</p>
        <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button onClick={() => navigate("/")}>Go back home</Button>
        </div>
      </div>

      <div className="py-10 flex flex-wrap gap-10 items-start justify-center"></div>
    </Applayout>
  );
};

export default PageNotFound;
