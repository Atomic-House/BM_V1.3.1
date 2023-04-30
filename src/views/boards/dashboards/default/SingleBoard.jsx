import React, { useState } from 'react';
import { useQuery } from 'react-query';
import TaskCard from 'views/admin/dashboards/rtl/components/TaskCard';
import { getBoard } from 'hooks/hooks';
import ModalList from './modal/ModalList';
import { useParams } from 'react-router-dom';

const SingleBoard = ({ userQuery }) => {
  let { boardId } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [nData, setNdata] = useState({});

  const boardQuery = useQuery({
    queryKey: ['board', boardId],
    queryFn: () => getBoard(boardId),
  });

  console.log(boardQuery.data)
  const listQuery = boardQuery.data?.flatMap((item) =>
    item.lS.map((subitem) => subitem)
  );

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setNdata('');
    setIsOpen(true);
  };

  if (boardQuery.status === 'loading') {
    return <h1>Loading...</h1>;
  }

  if (boardQuery.status === 'error') {
    return <h1>Error Please try again.</h1>;
  }

  return (
    <div className="mt-3 flex h-full w-full flex-col gap-[20px] rounded-[20px] xl:flex-row">
      <div className="h-full w-full rounded-[20px]">
        {/* left side */}
        <div className="col-span-9 h-full w-full rounded-t-2xl xl:col-span-6">
          {/* overall & Balance */}
          <div className="mb-5 grid grid-cols-6 gap-5">
            <div className="col-span-6 h-full w-full rounded-xl 3xl:col-span-4">
              <div className="my-5 grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-3 lg:grid-cols-3">
                {listQuery?.map((item, index) => {
                  return (
                    <TaskCard
                      user={userQuery}
                      key={item?.$id}
                      cards={item?.cS}
                      title={item?.title}
                    />
                  );
                })}

                <button
                  type="button"
                  onClick={handleOpen}
                  className="mt-4 rounded border border-gray-800 px-8 py-3 font-semibold text-gray-800 hover:bg-gray-100 hover:text-brand-500"
                >
                  Add List
                </button>
                {isOpen && (
                  <ModalList
                    onClose={handleClose}
                    isOpen={isOpen}
                    user={userQuery}
                    nData={nData}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* line */}
      <div className="flex w-0 bg-gray-200 dark:bg-navy-700 xl:w-px" />
    </div>
  );
};

export default SingleBoard;
