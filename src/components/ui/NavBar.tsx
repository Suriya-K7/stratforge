import { NAVIGATION } from "../../lib/constants/appConstants";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="hidden lg:flex lg:gap-x-12">
      {NAVIGATION.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          className={({ isActive }) =>
            `text-sm/6 font-semibold ${
              isActive
                ? "text-cyan-400 border-b-2 border-cyan-400"
                : "text-white hover:text-cyan-300"
            } duration-200`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

export default NavBar;
