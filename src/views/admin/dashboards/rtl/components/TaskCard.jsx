import CardMenu from 'components/card/CardMenu';
import React, { useState } from 'react';
import {
  MdCheckCircle,
  MdDeleteForever,
  MdOutlineEditRoad,
} from 'react-icons/md';
import Card from 'components/card';
import ModalCustom from 'components/modal/ModalCustom';
import { useMutation, useQueryClient } from 'react-query';
import { delCards } from 'hooks/hooks';


const TaskCard = ({ cards, user, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [nData, setNdata] = useState({});
  const queryClient = useQueryClient();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setNdata('');
    setIsOpen(true);
  };
  const handleUpdateOpen = (newData) => {
    setNdata(newData);
    setIsOpen(true);
  };

  const deleteCard = useMutation({
    mutationFn: (id) => {
      return delCards(id);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries('boards');
    },
  });

  const handleDeleteCard = (id) => {
    deleteCard.mutate(id);
  };

 

  return (
    <>

      <Card extra="pb-7 p-[20px]">
        {/* task header */}
        <div className="relative flex flex-row justify-between">
          <div className="flex items-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-100 dark:bg-white/5">
              <MdCheckCircle className="h-6 w-6 text-brand-500 dark:text-white" />
            </div>
            <h4 className="ml-4 text-xl font-bold text-navy-700 dark:text-white">
              {title}
            </h4>
          </div>

          <CardMenu onOpen={handleOpen} />
        </div>

        {/* card content */}

        {cards?.length ? (
          cards?.map((item) => (
            <div className="h-full w-full group" key={item?.$id}  >
              <div className="mt-5 flex items-center justify-between p-2 hover:border-2 rounded-md">
                <div className="flex items-center justify-center gap-2 ">
                <img className='w-10 rounded-full border-blue-400 bg-gray-200 p-2' src={`${item?.icon}`} alt="" />
                  <div>
                    <p className="text-base font-bold text-navy-700 dark:text-white">
                      {item?.title?.slice(0, 20)}...
                    </p>
                    <p className="text-xs font-bold text-navy-700 dark:text-white">
                      {item?.url?.slice(0, 20)}...
                    </p>
                  </div>
                </div>
                <div className=' justify-center items-center hidden group-hover:block hover:transition-all'>
                  <button onClick={() => handleUpdateOpen(item)}>
                    <MdOutlineEditRoad className="h-6 w-6 text-navy-700 dark:text-white hover:text-brand-500" />
                  </button>
                  <button onClick={() => handleDeleteCard(item?.$id)}>
                    <MdDeleteForever className="h-6 w-6 text-navy-700 dark:text-white hover:text-brand-500" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="h-full w-full">
            <div className="mt-5 flex flex-col items-start justify-center p-2">
              <p className="text-base mb-5 font-bold text-navy-700 dark:text-white">
                No Cards
              </p>
              
              {/* <button type="button" onClick={handleOpen} className="px-8 py-3 font-semibold border rounded border-gray-800 text-gray-800">Add</button> */}
            </div>
          </div>
        )}
         <button type="button" onClick={handleOpen} className="px-8 mt-4 py-3 hover:text-brand-500 hover:bg-gray-100 font-semibold border rounded border-gray-800 text-gray-800">Add Card</button>
      </Card>
      {isOpen && (
        <ModalCustom
          onClose={handleClose}
          isOpen={isOpen}
          user={user}
          nData={nData}
        />
      )}

    </>
  );
};

export default TaskCard;
