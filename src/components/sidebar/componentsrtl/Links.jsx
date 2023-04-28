/* eslint-disable */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import DashIcon from "components/icons/DashIcon";
import { FaCircle } from "react-icons/fa";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion";
// chakra imports

export function SidebarLinks(props) {
  //  Chakra color mode
  let location = useLocation();

  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  const createLinks = (routes) => {
    return routes.map((route, key) => {
      if (route.collapse) {
        return (
          <Accordion allowToggle key={key}>
            <AccordionItem mb="8px" border="none" key={key}>
              <AccordionButton
                display="flex"
                align="center"
                justify="center"
                _hover={{
                  bg: "unset",
                }}
                _focus={{
                  boxShadow: "none",
                }}
                borderRadius="8px"
                w={{
                  sm: "100%",
                  xl: "100%",
                }}
                px={route.icon ? null : "0px"}
                py="0px"
                bg={"transparent"}
                ms={0}
                mb="4px"
              >
                {route.icon ? (
                  <div className="mb-1.5 flex w-full items-center justify-center pe-7 ps-8">
                    <div>
                      <div className="align-center flex w-full justify-center">
                        <div
                          className={`flex items-center justify-center ${
                            activeRoute(route.path.toLowerCase())
                              ? "text-brand-500 dark:text-white"
                              : "text-gray-600"
                          } ${
                            activeRoute(route.path.toLowerCase())
                              ? "22px"
                              : "26px"
                          } me-3.5 `}
                        >
                          {route.icon}
                        </div>
                        <p
                          className={`me-auto ${
                            activeRoute(route.path.toLowerCase())
                              ? "text-700 font-medium text-navy-700 dark:text-white"
                              : "font-medium text-gray-600"
                          } `}
                        >
                          {route.name}
                        </p>
                      </div>
                    </div>
                    <AccordionIcon
                      ms="auto"
                      className="!text-gray-600"
                      transform={route.icon ? null : "translateX(-70%)"}
                    />
                  </div>
                ) : (
                  <div className="flex w-full items-center pt-0 pb-0 pe-7 ps-12 ms-5">
                    <div>
                      <p
                        className={`text-sm font-medium me-auto ${
                          activeRoute(route.path.toLowerCase())
                            ? "text-800 text-navy-700 dark:text-white"
                            : "text-gray-600"
                        } ${
                          activeRoute(route.path.toLowerCase())
                            ? "22px"
                            : "26px"
                        }`}
                      >
                        {route.name}
                      </p>
                    </div>
                    <AccordionIcon
                      ms="auto"
                      className="!text-gray-600"
                      transform={null}
                    />
                  </div>
                )}
              </AccordionButton>
              <AccordionPanel
                pe={route.icon ? null : "0px"}
                py="0px"
                ps={route.icon ? null : "8px"}
              >
                <list>
                  {
                    route.icon
                      ? createLinks(route.items) // for bullet accordion links
                      : createAccordionLinks(route.items) // for non-bullet accordion links
                  }
                </list>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        );
      } else {
        return (
          <Link to={route.layout + route.path} key={key}>
            {route.icon ? (
              <div>
                <div className="relative mb-2 flex hover:cursor-pointer">
                  <li className="my-[3px] flex cursor-pointer px-8" key={key}>
                    <span
                      className={`mt-0.5 ${
                        activeRoute(route.path) === true
                          ? "font-bold text-brand-500 dark:text-white"
                          : "text-gray-600"
                      }`}
                    >
                      {route.icon ? route.icon : <DashIcon />}
                    </span>
                    <span
                      className={`flex text-base ms-2 ${
                        activeRoute(route.path) === true
                          ? "font-bold text-navy-700 dark:text-white"
                          : "text-gray-600"
                      }`}
                    >
                      {route.name}
                    </span>
                  </li>
                  {activeRoute(route.path) ? (
                    <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500" />
                  ) : null}
                </div>
                <div className="w-full, mb-0 flex items-center justify-between ps-4">
                  <div>
                    <div>
                      <div>{route.icon}</div>
                      <p
                        me="auto"
                        color={
                          activeRoute(route.path.toLowerCase())
                            ? "text-70"
                            : "secondarygray-600"
                        }
                        fontWeight="500"
                      >
                        {route.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative mb-2 flex hover:cursor-pointer">
                <li
                  className="my-[3px] flex cursor-pointer items-center px-8"
                  key={key}
                >
                  <span
                    className={`flex text-sm leading-none ms-9 ${
                      activeRoute(route.path) === true
                        ? "font-medium text-navy-700 dark:text-white"
                        : "font-medium text-gray-600"
                    }`}
                  >
                    {route.name}
                  </span>
                </li>
              </div>
            )}
          </Link>
        );
      }
    });
  };
  const createAccordionLinks = (routes) => {
    return routes.map((route, index) => {
      if (
        route.layout === "/admin" ||
        route.layout === "/auth" ||
        route.layout === "/rtl"
      ) {
        return (
          <Link key={index} to={route.layout + route.path}>
            <div className="relative mb-1 flex ms-7 hover:cursor-pointer">
              <li
                className="my-[3px] flex cursor-pointer items-center px-8"
                key={index}
              >
                <span className={`text-brand-500 dark:text-white`}>
                  <FaCircle className={`h-1.5 w-1.5 me-0.5`} />
                </span>
                <span
                  className={`flex text-sm ms-2 ${
                    activeRoute(route.path) === true
                      ? "font-medium text-navy-700 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route.name}
                </span>
              </li>
            </div>
          </Link>
        );
      }
    });
  };
  // BRAND
  return createLinks(routes);
}

export default SidebarLinks;
