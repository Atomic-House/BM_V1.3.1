/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";

import SidebarCard from "components/sidebar/components/SidebarCard";
import {
  renderThumb,
  renderTrack,
  renderView,
} from "components/scrollbar/Scrollbar";
import { Scrollbars } from "react-custom-scrollbars-2";
import routes from "routes.js";
import Card from "components/card";

const SidebarHorizon = ({ open, onClose, variant }) => {
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 min-h-full transition-all md:!z-50 lg:!z-50 xl:!z-0 ${
        variant === "auth" ? "xl:hidden" : "xl:block"
      } ${open ? "" : "-translate-x-full"}`}
    >
      <Card
        extra={`w-[285px] ms-3 sm:me-4 sm:my-4 h-[96.5vh] m-7 !rounded-[20px]`}
      >
        <Scrollbars
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={renderView}
        >
          <div className="flex h-full flex-col justify-between">
            <div>
              <span
                className="absolute top-4 block cursor-pointer end-4 xl:hidden"
                onClick={onClose}
              >
                <HiX />
              </span>
              <div className={`ml-[52px] mt-[44px] flex items-center `}>
                <div className="mt-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 ms-1 dark:text-white">
                  Horizon <span className="font-medium">PRO</span>
                </div>
              </div>
              <div className="mt-[58px] mb-7 h-px bg-gray-200 dark:bg-white/10" />
              {/* Nav item */}
              <ul className="ml-[10px] pt-1">
                <Links routes={routes} />
              </ul>
            </div>
            {/* Free Horizon Card    */}
            <div className="mt-[28px] mb-[150px] flex justify-center">
              <SidebarCard />
            </div>
          </div>
        </Scrollbars>
      </Card>
    </div>
  );
};

export default SidebarHorizon;
