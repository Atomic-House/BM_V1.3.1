/* eslint-disable */

import { HiX } from 'react-icons/hi';
import Links from './components/Links';

import {
  renderThumb,
  renderTrack,
  renderView,
} from 'components/scrollbar/Scrollbar';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Card from 'components/card';
import { useState } from 'react';
import ModalBoard from 'views/boards/dashboards/default/modal/ModalBoard';
import { BsFillBookmarkPlusFill } from 'react-icons/bs';

const SidebarHorizon = ({ open, onClose, variant, routes, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [nData, setNdata] = useState({});

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setNdata('');
    setIsOpen(true);
  };

  const handleUpdateOpenList = (newData) => {
    setNdata(newData);
    setIsOpen(true);
  };

  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 min-h-full transition-all md:!z-50 lg:!z-50 xl:!z-0 ${
        variant === 'auth' ? 'xl:hidden' : 'xl:block'
      } ${open ? '' : '-translate-x-full'}`}
    >
      <Card
        extra={`w-[285px] ml-3 sm:mr-4 sm:my-4 h-[96.5vh] m-7 !rounded-[20px]`}
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
                className="absolute right-4 top-4 block cursor-pointer xl:hidden"
                onClick={onClose}
              >
                <HiX />
              </span>
              <div className={`ml-[52px] mt-[44px] flex items-center `}>
                <div className="ml-1 mt-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
                  Atomic <span className="font-medium">House</span>
                </div>
              </div>
              <div className="mb-7 mt-[58px] h-px bg-gray-200 dark:bg-white/10" />
              {/* Nav item */}
              <ul className="ml-[10px] pt-1">
                <Links routes={routes} />
              </ul>
            </div>
            {/* Free Horizon Card    */}
            <div className="flex justify-center p-10">
              <div className="">
                <button
                  onClick={handleOpen}
                  className="hover:text-black flex cursor-pointer items-center gap-2 text-gray-600 hover:font-medium"
                >
                  <span>
                    <BsFillBookmarkPlusFill />
                  </span>
                  Add Board
                </button>
              </div>
            </div>
          </div>
        </Scrollbars>
      </Card>
      {isOpen && (
        <ModalBoard
          onClose={handleClose}
          isOpen={isOpen}
          user={user}
          nData={nData}
          // boardId={boardId}
          // handleUpdateOpenList={handleUpdateOpenList}
        />
      )}
    </div>
  );
};

export default SidebarHorizon;
