import Board from "@asseinfo/react-kanban";
import "@asseinfo/react-kanban/dist/styles.css";
import "assets/css/Plugins.css";
import { useRef, useState } from "react";
import {
  kanbanRenderThumb,
  kanbanRenderTrack,
  kanbanRenderView,
} from "components/scrollbar/Scrollbar";
import { Scrollbars } from "react-custom-scrollbars-2";

// Assets
import { AiOutlinePlus } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import kanban1 from "assets/img/applications/kanban1.png";
import kanban2 from "assets/img/applications/kanban2.png";

const Kanban = () => {
  // Kanban Settings, states, etc.
  let initialBoard = {
    counter: 9,
    columns: [
      {
        id: 1,
        title: "Backlog",
        cards: [
          {
            id: 1.1,
            title: 'Option to "use local/server version" feature',
            desc: "It usually displays this message when you close an unsaved page when you do it on purpose, and it's getting frustrated to see this every time.",
            status: "UPDATES",
            members: [avatar2, avatar3],
          },
          {
            id: 1.2,
            image: kanban1,
            members: [avatar2, avatar3, avatar4],
            status: "PENDING",
            title: "Add/modify your own CSS-Selectors",
            desc: "Website Design: The ability to add/modify your own CSS-Selectors like its done in Venus.",
            attachements: "3",
          },
          {
            id: 1.3,
            title: "Shortcode for templates to display correctly",
            members: [avatar2],
            desc: "When you save some sections as a template and then paste a shortcode to a new page, the layout is broken, some styles are missing - in the editor.",
            status: "ERRORS",
          },
        ],
      },
      {
        id: 2,
        title: "In progress",
        cards: [
          {
            id: 2.1,
            title: "General ideas to improve 'Edit' workflow",
            desc: "Currently, I have a few templates in the Local Library and when I want to add them I'm always presented (by default).",
            members: [avatar2, avatar3, avatar4],
            status: "PENDING",
            attachements: "2",
          },
          {
            id: 2.2,
            title: "Shortcode for templates to display correctly",
            desc: "When you save some sections as a template and then paste a shortcode to a new page, the layout is broken, some styles are missing - in the editor.",
            status: "UPDATES",
            members: [avatar2],
          },
          {
            id: 2.3,
            image: kanban2,
            members: [avatar2, avatar3],
            status: "ERRORS",
            title: "[UX Design] - Set the default Library tab",
            desc: "I want to be able to set the default Library tab (or a way to remember the last active tab), especially when I already...",
          },
        ],
      },
      {
        id: 3,
        title: "Done",
        cards: [
          {
            id: 3.1,
            title: "Copy/Paste elements between pages",
            desc: "We can only copy/paste elements (or group of elements) in the same page, which is quite limited.",
            status: "DONE",
            members: [avatar2],
          },
          {
            id: 3.2,
            title: "Remove Extra DIV for each container added",
            desc: "I still hope there won't have an extra div for each container we added. It should be something for better styling...",
            status: "DONE",
            members: [avatar2, avatar3, avatar4],
          },
          {
            id: 3.3,
            title: "Add Figma files for the Library design blocks",
            desc: "I want to present my clients the Figma files first, so it would be great if you add those as well, more manual downloads...",
            status: "DONE",
            members: [avatar2, avatar3],
          },
        ],
      },
    ],
  };
  const [board, setBoard] = useState(initialBoard);
  function onCardNew(newCard) {
    const newCardLocal = { id: initialBoard.counter + 1, ...newCard };
    initialBoard.counter = initialBoard.counter + 1;
    setBoard(initialBoard);
    return newCardLocal;
  }
  const kanbanFormA = useRef(null);
  const cardInputA = useRef(null);
  const kanbanFormB = useRef(null);
  const cardInputB = useRef(null);
  const kanbanFormC = useRef(null);
  const cardInputC = useRef(null);

  return (
    <div className="mt-3 flex flex-col overflow-hidden rounded-[20px]">
      <div className="max-w-full">
        <Scrollbars
          autoHide
          renderTrackHorizontal={kanbanRenderTrack}
          renderThumbHorizontal={kanbanRenderThumb}
          renderView={kanbanRenderView}
        >
          <Board
            initialBoard={board}
            allowAddCard
            onNewCardConfirm={onCardNew}
            onCardNew={console.log}
            renderColumnHeader={function ({ title, id }, { addCard }) {
              function kanbanFormOpenA() {
                kanbanFormA.current.style.display = "flex";
                console.log(id);
              }
              function kanbanFormCloseA() {
                kanbanFormA.current.style.display = "none";
              }
              function formSubmitA() {
                addCard({ title: cardInputA.current.value });
                cardInputA.current.value = "";
              }
              function kanbanFormOpenB() {
                kanbanFormB.current.style.display = "flex";
              }
              function kanbanFormCloseB() {
                kanbanFormB.current.style.display = "none";
              }
              function formSubmitB() {
                addCard({ title: cardInputB.current.value });
                cardInputB.current.value = "";
              }
              function kanbanFormOpenC() {
                kanbanFormC.current.style.display = "flex";
              }
              function kanbanFormCloseC() {
                kanbanFormC.current.style.display = "none";
              }
              function formSubmitC() {
                addCard({ title: cardInputC.current.value });
                cardInputC.current.value = "";
              }
              return (
                <div
                  key={id}
                  className="flex w-full flex-col rounded-[20px] font-bold"
                >
                  <div className="mb-[20px] flex items-center justify-between">
                    <p className="mt-1 ml-1 text-xl text-navy-700 dark:text-white">
                      {" "}
                      {title}{" "}
                    </p>
                    <button
                      onClick={
                        id === 1
                          ? kanbanFormOpenA
                          : id === 2
                          ? kanbanFormOpenB
                          : id === 3
                          ? kanbanFormOpenC
                          : null
                      }
                      className="flex items-center justify-center rounded-xl bg-lightPrimary px-5 py-2 text-lg text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:!bg-navy-700 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20"
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                  <div
                    className="hidden w-full"
                    ref={
                      id === 1
                        ? kanbanFormA
                        : id === 2
                        ? kanbanFormB
                        : id === 3
                        ? kanbanFormC
                        : null
                    }
                  >
                    {/* form controll */}
                    <div>
                      <input
                        ref={
                          id === 1
                            ? cardInputA
                            : id === 2
                            ? cardInputB
                            : id === 3
                            ? cardInputC
                            : null
                        }
                        className="mb-[20px] h-10 w-full rounded-2xl border border-gray-600 px-3 font-normal xl:w-[450px]"
                        type="text"
                      />

                      <div className="flex items-center gap-2">
                        <button
                          onClick={
                            id === 1
                              ? formSubmitA
                              : id === 2
                              ? formSubmitB
                              : id === 3
                              ? formSubmitC
                              : null
                          }
                          className="rounded-xl bg-brand-500 px-4 py-[6px] text-base text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                        >
                          Add card
                        </button>
                        <button
                          onClick={
                            id === 1
                              ? kanbanFormCloseA
                              : id === 2
                              ? kanbanFormCloseB
                              : id === 3
                              ? kanbanFormCloseC
                              : null
                          }
                          className="flex items-center justify-center rounded-xl bg-lightPrimary px-3 py-[6px] text-base text-navy-700 transition duration-200 dark:!bg-navy-800 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
            renderCard={(
              { image, title, desc, status, members, id },
              { dragging }
            ) => (
              <div
                key={id}
                dragging={dragging}
                className="mt-3 flex w-[470px] flex-col rounded-2xl bg-white p-[25px] shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:!shadow-none"
              >
                <div className="mb-[20px] flex justify-between text-center">
                  <p className="text-lg font-bold text-navy-700 dark:text-white">
                    {title}
                  </p>
                  <div className="h-fit w-fit cursor-pointer">
                    <div className="text-lg text-gray-600">
                      <MdEdit />
                    </div>
                  </div>
                </div>
                {image ? (
                  <img
                    src={image}
                    className="mb-4 h-[284px] w-[420px] rounded-2xl"
                    alt=""
                  />
                ) : null}

                <p className="text-base font-normal text-gray-600"> {desc} </p>

                <div className="mt-[20px] flex w-full items-center justify-between">
                  {members ? (
                    <div className="flex items-center">
                      <img
                        src={avatar2}
                        className="h-9 w-9 rounded-full border-2 border-white dark:!border-navy-700"
                        alt=""
                      />
                      3
                      <img
                        src={avatar3}
                        className="-ml-6 h-9 w-9 rounded-full border-2 border-white dark:!border-navy-700"
                        alt=""
                      />
                      <img
                        src={avatar4}
                        className="-ml-3 h-9 w-9 rounded-full border-2 border-white dark:!border-navy-700"
                        alt=""
                      />
                    </div>
                  ) : null}
                  {status ? (
                    <div
                      className={`flex h-7 w-[94px] items-center justify-center rounded-[8px] text-sm font-bold tracking-wide text-white ${
                        status === "ERRORS"
                          ? " bg-red-500"
                          : status === "PENDING"
                          ? " bg-yellow-500"
                          : status === "DONE"
                          ? " bg-green-500"
                          : status === "UPDATES"
                          ? " bg-[#3965FF]"
                          : " bg-teal-400"
                      } `}
                    >
                      {status}
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          />
        </Scrollbars>
      </div>
    </div>
  );
};

export default Kanban;
