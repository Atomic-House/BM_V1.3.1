import React, { useState } from "react";
import Dropdown from "components/dropdown";
import { BsFillBookmarkPlusFill, BsFillBookmarkXFill, BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { useMutation, useQueryClient } from "react-query";
import { delList } from "hooks/hooks";

function CardMenu(props) {
  const { transparent, vertical, onOpen, list_data, handleUpdateOpenList} = props;
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();


  const deleteCard = useMutation({
    mutationFn: (id) => {
      return delList(id);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries('board');
    },
  });

  const handleDeleteList = (id) => {
    deleteCard.mutate(id);
  };

  return (
   <Dropdown
      button={
        <button
        onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center text-xl hover:cursor-pointer ${
            transparent
              ? "bg-none text-white hover:bg-none active:bg-none"
              : vertical
              ? "bg-none text-navy-700 dark:text-white"
              : "bg-lightPrimary p-2 text-brand-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
          } linear justify-center rounded-lg font-bold transition duration-200`}
        >
          {vertical ? (
            <p className="text-[24px] hover:cursor-pointer">
              <BsThreeDotsVertical />
            </p>
          ) : (
            <BsThreeDots className="h-6 w-6" />
          )}
        </button>
      }
      animation={"origin-top-right transition-all duration-300 ease-in-out"}
      classNames={`${transparent ? "top-8" : "top-11"} right-0 w-max`}
      children={
        <div className="z-50 w-max rounded-xl bg-white px-4 py-3 text-sm shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <button
          onClick={onOpen}
          className="hover:text-black flex cursor-pointer items-center gap-2 text-gray-600 hover:font-medium"
        >
          <span>
            <BsFillBookmarkPlusFill />
          </span>
          Add Card
        </button>
        <button onClick={()=>handleUpdateOpenList(list_data)} className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium">
          <span>
            <BsFillBookmarkXFill />
          </span>
          Edit List
        </button>
        <button onClick={()=>handleDeleteList(list_data.$id)} className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium">
          <span>
            <BsFillBookmarkXFill />
          </span>
          Remove List
        </button>
      </div>
      }
    />
    
  );
}

export default CardMenu;
