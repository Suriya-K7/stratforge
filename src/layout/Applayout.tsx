import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { MenuIcon, XmarkIcon } from "../assets/icons/common";
import { BgBanner } from "../assets/icons/ui";
import { CompanyLogo } from "../assets/icons/logo";
import ROUTES from "../lib/constants/routes";
import { Link } from "react-router-dom";
import { NavBar, NavBarMobile } from "../components/ui";

const NAVIGATION = [
  { name: "Home", href: ROUTES.HOME },
  { name: "Rockets", href: ROUTES.ROCKETS },
  { name: "Launches", href: ROUTES.LAUNCHES },
  { name: "History", href: ROUTES.HISTORY },
];

export default function Applayout(props: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-gray-900 min-h-screen">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <Link to={NAVIGATION[0].href} className="-m-1.5 p-1.5">
              <CompanyLogo className="w-40" />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
            >
              <MenuIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <NavBar />
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
            <div className="flex items-center justify-between">
              <Link to={NAVIGATION[0].href} className="-m-1.5 p-1.5">
                <CompanyLogo className="w-40" />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-200"
              >
                <XmarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <NavBarMobile />
          </DialogPanel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <BgBanner />
        <div className="mx-auto ">{props.children}</div>
      </div>
    </div>
  );
}
