import { FC, useEffect, useRef, useState } from "react";
import NavLink from "./navlink";
import { AiOutlineMenu } from "react-icons/ai";

import useAuth from "../hooks/useAuth";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as Tooltip from "@radix-ui/react-tooltip";

import { styled, keyframes } from "@stitches/react";
import { auth } from "../saas/firebase";
import useOnClickOutside from "../hooks/useOnClickOutside";

const scaleIn = keyframes({
  "0%": { opacity: 0, transform: "scale(0)" },
  "100%": { opacity: 1, transform: "scale(1)" },
});
const TooltipContent = styled(Tooltip.Content, {
  transformOrigin: "var(--radix-tooltip-content-transform-origin)",
  animation: `${scaleIn} 0.5s ease-out`,
});

export const Navbar = () => {
  const [dropdownToggle, setDropdownToggle] = useState(false);
  const [userDropdownToggle, setUserDropdownToggle] = useState(false);
  const { user, isLoggedIn } = useAuth();

  const userDropdown = useRef<HTMLDivElement | null>(null)

  const toggleDropdown = () => {
    setDropdownToggle(!dropdownToggle);
  };

  useOnClickOutside(userDropdown, () => setUserDropdownToggle(false));

  return (
    <>
      <nav className="bg-white/80 px-2 sm:px-4 py-4 xl:py-0 fixed w-full z-20 top-0 left-0 border-b border-gray-200 ">
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
            {isLoggedIn ? (
              <>
                <AvatarPrimitive.Root
                  onClick={() => setUserDropdownToggle(!userDropdownToggle)}
                >
                  <AvatarPrimitive.Image
                    src={user?.photoURL}
                    className="h-12 rounded-full border-2 hover:opacity-90 transition cursor-pointer"
                  />
                  <AvatarPrimitive.Fallback>{`${user?.displayName[0].toUpperCase()}`}</AvatarPrimitive.Fallback>
                </AvatarPrimitive.Root>
                <>
                  {userDropdownToggle ? (
                    <>
                      <div
                        className="absolute z-50 my-4 mt-12 -ml-20 text-base list-none bg-white rounded divide-y divide-gray-100 shadow"
                        ref={userDropdown}
                      >
                        <div className="py-3 px-4">
                          <span className="block text-sm text-gray-900">
                            {user?.displayName}
                          </span>
                          <span className="block text-sm font-medium text-gray-500 truncate">
                            {user?.email}
                          </span>
                        </div>
                        <ul className="py-1" aria-labelledby="user-menu-button">
                          <li>
                            <NavLink
                              href="/profile"
                              activeClassName="block py-2 px-4 text-sm text-blue-700 bg-gray-100"
                            >
                              <span
                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setUserDropdownToggle(false)}
                              >
                                Profil
                              </span>
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              href="/profile/courses"
                              activeClassName="block py-2 px-4 text-sm text-blue-700 bg-gray-100"
                            >
                              <span
                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setUserDropdownToggle(false)}
                              >
                                Kursy
                              </span>
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              href="/profile/settings"
                              activeClassName="block py-2 px-4 text-sm text-blue-700 bg-gray-100"
                            >
                              <span
                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setUserDropdownToggle(false)}
                              >
                                Ustawienia
                              </span>
                            </NavLink>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => {auth.signOut(); setUserDropdownToggle(false)}}
                            >
                              Wyloguj się
                            </a>
                          </li>
                        </ul>
                      </div>
                    </>
                  ) : null}
                </>
              </>
            ) : (
              <>
                <NavLink href="/login">
                  <button className="text-white font-normal bg-blue-700 hover:bg-blue-800 transition focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0">
                    Zaloguj się
                  </button>
                </NavLink>
              </>
            )}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => toggleDropdown()}
            >
              <span className="sr-only">Otwórz menu</span>
              <AiOutlineMenu />
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
                  <span className="block font-normal py-2 pr-4 pl-3 text-gray-800 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 transition">
                    Kursy
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/faq"
                  activeClassName="bg-blue-700 text-white md:bg-transparent md:text-blue-700 md:p-0"
                >
                  <span className="block font-normal py-2 pr-4 pl-3 text-gray-800 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 transition">
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
