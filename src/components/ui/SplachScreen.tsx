import { CompanyLogo } from "../../assets/icons/logo";

const SplachScreen = () => {
  return (
    <div
      className="flex items-center justify-center bg-gray-900 min-h-screen "
      id="splash-screen-page"
    >
      <div className="flex flex-col items-center splash-contents">
        <CompanyLogo className="block h-10" />
      </div>
    </div>
  );
};

export default SplachScreen;
