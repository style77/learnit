import { FC, useState } from "react";
import NavLink from "./navlink";

export const Navbar: FC = () => {
  const [dropdownToggle, setDropdownToggle] = useState(false);

const toggleDropdown = () => {
    setDropdownToggle(!dropdownToggle);
}

  return (
    <>
      <nav className="bg-white px-2 sm:px-4 py-4 xl:py-0 fixed w-full z-20 top-0 left-0 border-b border-gray-200 ">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a href="/" className="flex items-center">
            <img
              src="/_images/logo_full.svg"
              className="static lg:absolute h-6 sm:h-9"
              alt="LearnIT logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap sr-only">
              LearnIT
            </span>
          </a>
          <div className="flex md:order-2">
            <a
                href="/login"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 transition focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
            >
              Zaloguj się
            </a>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => toggleDropdown()}
            >
              <span className="sr-only">Otwórz menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={`${
              dropdownToggle ? "" : "hidden"
            } justify-between items-center w-full md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-2 md:py-6 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-lg md:font-medium md:border-0 md:bg-white">
              <li>
                <NavLink
                  href="/courses"
                  activeClassName="bg-blue-700 text-white md:bg-transparent md:text-blue-700 md:p-0"
                >
                  <span className="block py-2 pr-4 pl-3 text-gray-800 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 transition">
                    Kursy
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/faq"
                  activeClassName="bg-blue-700 text-white md:bg-transparent md:text-blue-700 md:p-0"
                >
                  <span className="block py-2 pr-4 pl-3 text-gray-800 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 transition">
                    FAQ
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
