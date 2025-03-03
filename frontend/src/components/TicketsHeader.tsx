import { useState, useEffect } from "react";
// icons
import { IoIosAdd } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
// hooks
import { useAppSelector, useAppDispatch } from "../hooks";
// slices
import {
  addNewTicket,
  isNewTicketAddingSelector,
  isNewTicketAddingDoneSelector,
  resetIsNewTicketAddingDone,
  isTicketEditingOnSelector,
  setIsTicketEditingOn,
  editTicket,
} from "../features/tickets/ticketsSlice";
export default function TicketsHeader() {
  // states
  // local
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState({
    options: ["Open", "In Progress", "Closed"],
    selected: "",
    isOn: false,
  });
  const [priority, setPriority] = useState({
    options: ["High", "Medium", "Low"],
    selected: "",
    isOn: false,
  });
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  // slices
  const isNewTicketAdding = useAppSelector(isNewTicketAddingSelector);
  const isNewTicketAddingDone = useAppSelector(isNewTicketAddingDoneSelector);
  const isTicketEditingOn = useAppSelector(isTicketEditingOnSelector);
  // dispatch
  const dispatch = useAppDispatch();

  // effect
  useEffect(() => {
    if (isNewTicketAddingDone) {
      dispatch(setIsTicketEditingOn(null))
      setIsFormOpen(false);
      setTitle("");
      setStatus((prev) => ({ ...prev, selected: "", isOn: false }));
      setPriority((prev) => ({ ...prev, selected: "", isOn: false }));
      setDescription("");
    }
  }, [isNewTicketAddingDone]);

  useEffect(() => {
    if (isTicketEditingOn) {
      setIsFormOpen(true);
      setTitle(isTicketEditingOn.title);
      setStatus((prev) => ({
        ...prev,
        selected: isTicketEditingOn.status,
        isOn: false,
      }));
      setPriority((prev) => ({
        ...prev,
        selected: isTicketEditingOn.priority,
        isOn: false,
      }));
      setDescription(isTicketEditingOn.description);
    }
  }, [isTicketEditingOn]);

  // form submit handler
  const formSubmitHandler = () => {
    if (!title || !status.selected || !priority.selected || !description) {
      setError("All fields are required");
      return;
    } else {
      setError("");
      if (isTicketEditingOn) {
        dispatch(
          editTicket({
            _id: isTicketEditingOn._id,
            title,
            status: status.selected,
            priority: priority.selected,
            description,
          })
        );
      } else {
        dispatch(
          addNewTicket({
            title,
            status: status.selected,
            priority: priority.selected,
            description,
          })
        );
      }
    }
  };
  return (
    <div className="relative">
      {/* add new tickets toggler */}
      <button
        className="flex items-center px-1.5 py-1 rounded-md overflow-hidden bg-neutral-100 transition-colors ease-in-out duration-300 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700 cursor-pointer"
        onClick={() => {
          dispatch(resetIsNewTicketAddingDone());
          setIsFormOpen(true);
        }}
      >
        <IoIosAdd className="text-lg" />
        <span className="text-sm mr-1">add new</span>
      </button>
      {/* form */}
      {isFormOpen && (
        <div className="fixed left-0 top-0 w-screen h-screen z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-sm w-96 relative">
            {/* error */}
            <div
              className={`absolute flex items-center gap-x-1.5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max px-3 py-5 rounded-md border border-red-500 bg-white z-50 transition-transform ease-in-out duration-150 ${
                error ? "scale-100" : "scale-0"
              }`}
            >
              <button
                className="w-[24px] aspect-square rounded-full overflow-hidden flex items-center justify-center bg-neutral-100 text-neutral-500 text-lg cursor-pointer transition-colors ease-in-out duration-300 hover:bg-red-200 hover:text-red-500 absolute right-0.5 top-0.5"
                onClick={() => setError("")}
              >
                <IoIosAdd className="rotate-45" />
              </button>
              <div className="w-[28px] bg-red-100 flex items-center justify-center aspect-square rounded-full border border-red-500 text-red-500">
                <IoIosWarning />
              </div>
              <p className="text-sm text-red-500">All fields are required</p>
            </div>
            {/* header */}
            <header className="flex items-center justify-between">
              <h3 className="text-sm text-neutral-700 border-b border-neutral-300 font-medium">
                {isTicketEditingOn ? "Edit Ticket" : "Add New Ticket"}
              </h3>
              <button
                className="w-[24px] aspect-square rounded-sm overflow-hidden flex items-center justify-center bg-neutral-100 text-neutral-500 text-lg cursor-pointer transition-colors ease-in-out duration-300 hover:bg-red-200 hover:text-red-500"
                onClick={() => {
                  dispatch(setIsTicketEditingOn(null));
                  setIsFormOpen(false);
                  setError("");
                  setTitle("");
                  setStatus((prev) => ({ ...prev, selected: "" }));
                  setPriority((prev) => ({ ...prev, selected: "" }));
                  setDescription("");
                }}
              >
                <IoIosAdd className="rotate-45" />
              </button>
            </header>
            {/* inputs */}
            <div className="mt-3">
              {/* title */}
              <div>
                <p className="text-neutral-600">Title:</p>
                <div className="p-1.5 border border-neutral-300 rounded-md">
                  <input
                    className="focus:outline-none focus:ring-0 w-full text-sm"
                    type="text"
                    placeholder="Ticket title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              {/* status */}
              <div className="mt-3 flex items-center space-x-3">
                <p className="text-neutral-600">Status:</p>
                <div className="relative">
                  <div
                    className="flex items-center justify-between gap-x-3 border border-neutral-300 rounded-md p-1.5 cursor-pointer w-32"
                    onClick={() => {
                      setPriority((prev) => ({ ...prev, isOn: false }));
                      setStatus((prev) => ({ ...prev, isOn: !prev.isOn }));
                    }}
                  >
                    <span className="text-sm">
                      {status.selected ? status.selected : "Select"}
                    </span>
                    <MdOutlineKeyboardArrowDown
                      className={`text-xl transition-transform ease-in-out duration-300 ${
                        status.isOn ? "-rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>
                  {/* options */}
                  <div
                    className={`absolute left-0 top-[100%] w-full bg-white z-50 shadow-xl overflow-hidden h-0 transition-all ease-in-out duration-300 ${
                      status.isOn ? "h-[88px]" : "h-0"
                    }`}
                  >
                    {status.options.map((optionItem) => {
                      return (
                        <div
                          key={optionItem}
                          onClick={() => {
                            setStatus((prev) => ({
                              ...prev,
                              selected: optionItem,
                              isOn: false,
                            }));
                          }}
                          className="text-sm px-1.5 py-1 cursor-pointer transition-colors ease-in-out duration-150 hover:border-neutral-500 hover:bg-neutral-100 border-b border-neutral-300 last:border-transparent text-neutral-700 last:hover:border-transparent"
                        >
                          <span>{optionItem}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* priority */}
              <div className="mt-3 flex items-center space-x-3">
                <p className="text-neutral-600">Priority:</p>
                <div className="relative">
                  <div
                    className="flex items-center justify-between gap-x-3 border border-neutral-300 rounded-md p-1.5 cursor-pointer w-32"
                    onClick={() => {
                      setStatus((prev) => ({ ...prev, isOn: false }));
                      setPriority((prev) => ({ ...prev, isOn: !prev.isOn }));
                    }}
                  >
                    <span className="text-sm">
                      {priority.selected ? priority.selected : "Select"}
                    </span>
                    <MdOutlineKeyboardArrowDown
                      className={`text-xl transition-transform ease-in-out duration-300 ${
                        priority.isOn ? "-rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>
                  {/* options */}
                  <div
                    className={`absolute left-0 top-[100%] w-full bg-white shadow-xl overflow-hidden h-0 transition-all ease-in-out duration-300 ${
                      priority.isOn ? "h-[88px]" : "h-0"
                    }`}
                  >
                    {priority.options.map((optionItem) => {
                      return (
                        <div
                          key={optionItem}
                          onClick={() => {
                            setPriority((prev) => ({
                              ...prev,
                              selected: optionItem,
                              isOn: false,
                            }));
                          }}
                          className="text-sm px-1.5 py-1 cursor-pointer transition-colors ease-in-out duration-150 hover:border-neutral-500 hover:bg-neutral-100 border-b border-neutral-300 last:border-transparent text-neutral-700 last:hover:border-transparent"
                        >
                          <span>{optionItem}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* description */}
              <div className="my-3">
                <p className="text-neutral-600">Description:</p>
                <div className="text-sm p-1.5 border border-neutral-300 rounded-md">
                  <textarea
                    className="focus:outline-none focus:ring-0 w-full resize-none h-[90px]"
                    name=""
                    id=""
                    placeholder="Descriptions"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              {/* button */}
              <button
                disabled={isNewTicketAdding}
                onClick={formSubmitHandler}
                className="px-3 py-1 border-neutral-300 border rounded-md text-sm text-neutral-500 cursor-pointer transition-colors ease-in-out duration-200 hover:border-green-600 hover:bg-green-600 hover:text-white"
              >
                {isNewTicketAdding ? (
                  <div className="w-[20px] aspect-square rounded-full border-2 border-neutral-400 border-r-transparent animate-spin" />
                ) : (
                  <>{isTicketEditingOn ? "Save Changes" : "Add Ticket"}</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
