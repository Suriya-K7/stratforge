import { NavLink } from "react-router-dom";
import { NAVIGATION } from "../../lib/constants/appConstants";

const NavBarMobile = () => {
  return (
    <div className="mt-6 flow-root">
      <div className="-my-6 divide-y divide-white/10">
        <div className="space-y-2 py-6">
          {NAVIGATION.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold ${
                  isActive
                    ? "bg-white/10 text-cyan-400"
                    : "text-white hover:bg-white/5"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavBarMobile;
