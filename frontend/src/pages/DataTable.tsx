import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// icons
import { IoMdMore } from "react-icons/io";
import { TbListDetails } from "react-icons/tb";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuClockArrowUp } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { LuCircleHelp } from "react-icons/lu";
import { CiClock2 } from "react-icons/ci";
// hooks
import { useAppSelector, useAppDispatch } from "../hooks";
// slices
import {
  usersSelector,
  userSelector,
  getUsers,
  updateUser,
  isUserUpdatingSelector,
  resetIsUserOn,
  isUserOnSelector,
} from "../features/users/usersSlice";
import {
  ticketsSelector,
  ITicket,
  setIsTicketEditingOn,
  deleteTicket,
  isTicketDeletingSelector,
  isTicketDeletingDoneSelector,
  resetIsTicketDeletingDone,
  getTickets,
} from "../features/tickets/ticketsSlice";
import { getProfiles } from "../features/profiles/profilesSlice";

// components
import GetDate from "../components/GetDate";
import GetProfile from "../components/GetProfile";
import GetUserInfo from "../components/GetUserInfo";

export default function Tickets() {
  const { pathname } = useLocation();
  let dataTableType = pathname === "/members" ? "Members" : "Tickets";

  // states
  // local
  const [isTicketOn, setIsTicketOn] = useState<ITicket | null>(null);
  // more options
  const [moreOptions, setMoreOptions] = useState({
    options: [
      {
        icon: TbListDetails,
        text: "Detail",
      },
      {
        icon: AiOutlineEdit,
        text: "Edit",
      },
      {
        icon: RiDeleteBin6Line,
        text: "Delete",
      },
    ],
    selected: "",
  });

  // slices
  const users = useAppSelector(usersSelector);
  const isUserUpdating = useAppSelector(isUserUpdatingSelector);
  const isUserOn = useAppSelector(isUserOnSelector)
  const loggedInUser = useAppSelector(userSelector);
  const tickets = useAppSelector(ticketsSelector);
  const isTicketDeleting = useAppSelector(isTicketDeletingSelector);
  const isTicketDeletingDone = useAppSelector(isTicketDeletingDoneSelector);

  // hooks
  const dispatch = useAppDispatch();

  // effects
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getProfiles());
    dispatch(getTickets());
  }, []);
  useEffect(() => {
    if (isTicketDeletingDone) {
      setIsTicketOn(null);
      setMoreOptions((prev) => {
        return {
          ...prev,
          selected: "",
        };
      });
    }
  }, [isTicketDeletingDone]);

  return (
    <div className="p-1.5">
      <div className="px-3 py-1.5 bg-white shadow-md h-[89.5vh] overflow-x-hidden overflow-y-auto rounded-md overflow-hidden">
        <div>
          <table className="w-full table-auto">
            {/* header */}
            <thead className="border-b border-neutral-300 text-neutral-500">
              {dataTableType === "Members" ? (
                <tr>
                  <td>Member</td>
                  <td>Email</td>
                  <td>Join</td>
                  <td>Role</td>
                  <td>Account</td>
                </tr>
              ) : (
                <tr>
                  <td>Author</td>
                  <td>Title</td>
                  <td>Status</td>
                  <td>Priority</td>
                  <td>Created at</td>
                  <td>Updated at</td>
                  <td>Actions</td>
                </tr>
              )}
            </thead>
            {/* body */}
            {dataTableType === "Members" ? (
              <tbody className="text-sm">
                {users.map((user) => {
                  if (user._id === loggedInUser?._id) return null;
                  return (
                    <tr
                      key={user._id}
                      className="border-b border-neutral-100 cursor-pointer transition-colors ease-in-out duration-150 hover:border-neutral-300"
                      onClick={() => {
                        dispatch(resetIsUserOn(user))
                      }}
                    >
                      <td className="py-1.5">
                        <div className="flex items-center space-x-2">
                          <div className="w-[24px] aspect-square rounded-full overflow-hidden">
                            <GetProfile _id={user._id} flag="pro" />
                          </div>
                          <span>{user.username}</span>
                        </div>
                      </td>
                      <td>
                        <span>{user.email}</span>
                      </td>
                      <td>
                        <div>
                          <span>
                            <GetDate date={user.createdAt} />
                          </span>
                        </div>
                      </td>
                      <td>
                        <div>
                          <span
                            className={`${
                              user.role === "super"
                                ? "text-green-500"
                                : user.role === "sub"
                                ? "text-blue-500"
                                : "text-neutral-500"
                            }`}
                          >
                            {user.role === "super"
                              ? "Super Admin"
                              : user.role === "sub"
                              ? "Sub Admin"
                              : "Normal User"}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div>
                          <span>{user.status}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <tbody className="text-sm">
                {tickets.map((ticketItem) => (
                  <tr
                    key={ticketItem._id}
                    className="border-b border-neutral-100 transition-colors ease-in-out duration-150 hover:border-neutral-300"
                  >
                    <td className="py-1.5">
                      <div className="flex items-center space-x-2">
                        <div className="w-[24px] aspect-square rounded-full overflow-hidden">
                          <GetProfile _id={ticketItem.user} flag="pro" />
                        </div>
                        <span>
                          <GetUserInfo _id={ticketItem.user} flag="username" />
                        </span>
                      </div>
                    </td>
                    <td>
                      <span>{ticketItem.title}</span>
                    </td>
                    <td>
                      <div>
                        <span>{ticketItem.status}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <span>{ticketItem.priority}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <span>
                          <GetDate date={ticketItem.createdAt} />
                        </span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <span>
                          <GetDate date={ticketItem.updatedAt} />
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="relative w-full flex items-center justify-center">
                        {/* icon */}
                        <div
                          className="w-[24px] aspect-square rounded-sm flex items-center justify-center cursor-pointer bg-neutral-100 text-neutral-500 transition-colors ease-in-out duration-150 hover:bg-neutral-200 text-xl"
                          onClick={() => {
                            dispatch(resetIsTicketDeletingDone());
                            if (isTicketOn?._id === ticketItem._id)
                              return setIsTicketOn(null);
                            setIsTicketOn(ticketItem);
                            setMoreOptions({ ...moreOptions, selected: "" });
                          }}
                        >
                          <IoMdMore />
                        </div>
                        {/* options */}
                        <div
                          className={`absolute right-0 top-[100%] w-max bg-white z-50 shadow-md transition-transform ease-in-out duration-150  ${
                            isTicketOn?._id === ticketItem._id &&
                            !moreOptions.selected
                              ? "scale-100"
                              : "scale-0"
                          }`}
                        >
                          {moreOptions.options.map((item) => {
                            if (
                              loggedInUser?.role === "normal" &&
                              loggedInUser._id !== isTicketOn?.user &&
                              (item.text === "Delete" || item.text === "Edit")
                            )
                              return null;
                            return (
                              <div
                                key={item.text}
                                className="px-1.5 py-0.5 cursor-pointer transition-colors ease-in-out duration-150 hover:bg-neutral-100 text-sm flex items-center gap-x-1 text-neutral-600"
                                onClick={() => {
                                  if (item.text === "Edit") {
                                    dispatch(setIsTicketEditingOn(ticketItem));
                                  }
                                  setMoreOptions({
                                    ...moreOptions,
                                    selected: item.text,
                                  });
                                }}
                              >
                                <item.icon className="shrink-0" />
                                <span>{item.text}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
      {/* detail */}
      {isTicketOn && moreOptions.selected === "Detail" && (
        <div className="fixed left-0 top-0 w-screen h-screen z-[100] overflow-hidden bg-black/50 flex items-center justify-center">
          <div className="w-[27rem] rounded-md overflow-hidden bg-white flex items-center relative">
            {/* close detail */}
            <button
              className="absolute top-1 right-1 w-5 aspect-square rounded-sm bg-neutral-100 text-neutral-500 flex items-center justify-center transition-colors ease-in-out duration-200 hover:bg-red-200 hover:text-red-500 cursor-pointer"
              onClick={() => {
                setIsTicketOn(null);
                setMoreOptions((prev) => {
                  return {
                    ...prev,
                    selected: "",
                  };
                });
              }}
            >
              <IoMdClose />
            </button>
            {/* author detail */}
            <div className="w-[35%] pb-3 self-start">
              {/* profile */}
              <div>
                {/* bg */}
                <div className="w-full h-16 overflow-hidden rounded-md">
                  <GetProfile _id={isTicketOn.user} flag="bg" />
                </div>
                {/* pro */}
                <div className="flex items-center justify-center">
                  <div className="w-12 aspect-square rounded-full overflow-hidden border-2 border-white shadow -mt-5 relative z-50">
                    <GetProfile _id={isTicketOn.user} flag="pro" />
                  </div>
                </div>
                {/* username & email */}
                <div className="flex items-center justify-center flex-col text-neutral-500">
                  <p className="text-sm">
                    <GetUserInfo _id={isTicketOn.user} flag="username" />
                  </p>
                  <p className="text-xs italic -mt-0.5">
                    <GetUserInfo _id={isTicketOn.user} flag="email" />
                  </p>
                </div>
                {/* role & status */}
                <div className="flex items-center gap-x-1.5 justify-center text-xs text-neutral-700">
                  <span className="text-green-500">
                    <GetUserInfo _id={isTicketOn.user} flag="role" />
                  </span>{" "}
                  |
                  <span>
                    <GetUserInfo _id={isTicketOn.user} flag="status" />
                  </span>
                </div>
              </div>
            </div>
            {/* ticket detail */}
            <div className="flex-1 shrink-0 p-1.5 ml-3 border-l border-neutral-200 h-full">
              <div className="text-sm text-neutral-500 pb-1.5 border-b border-neutral-100 max-h-36 overflow-y-auto">
                <p>{isTicketOn.description}</p>
              </div>
              {/* stuffs */}
              <div className="mt-1.5 flex items-center gap-2.5 flex-wrap">
                {/* status */}
                <div className="text-sm flex items-center gap-x-1 text-neutral-400">
                  <span>Status:</span>
                  <div
                    className={`border rounded-full px-1.5 text-xs py-0.5 ${
                      isTicketOn.status === "Open"
                        ? "border-green-500 text-green-500"
                        : isTicketOn.status === "In Progress"
                        ? "border-sky-500 text-sky-500"
                        : "border-red-500 text-red-500"
                    }`}
                  >
                    <span>{isTicketOn.status}</span>
                  </div>
                </div>
                {/* priority */}
                <div className="text-sm flex items-center gap-x-1 text-neutral-400">
                  <span>Priority:</span>
                  <div
                    className={`border rounded-full px-1.5 text-xs py-0.5 ${
                      isTicketOn.priority === "High"
                        ? "border-red-500 text-red-500"
                        : isTicketOn.priority === "Medium"
                        ? "border-sky-500 text-sky-500"
                        : "border-green-500 text-green-500"
                    }`}
                  >
                    <span>{isTicketOn.priority}</span>
                  </div>
                </div>
                {/* createdAt */}
                <div className="text-sm flex items-center gap-x-1 text-neutral-400">
                  <span>Created at:</span>
                  <div
                    className={`border flex items-center gap-x-1 rounded-full px-1.5 text-xs py-0.5 border-sky-500
                      `}
                  >
                    <LuClockArrowUp />
                    <span>
                      <GetDate date={isTicketOn.createdAt} />
                    </span>
                  </div>
                </div>
                {/* updated at */}
                <div className="text-sm flex items-center gap-x-1 text-neutral-400">
                  <span>Updated at:</span>
                  <div
                    className={`border flex items-center gap-x-1 rounded-full px-1.5 text-xs py-0.5 border-orange-500
                      `}
                  >
                    <LuClockArrowUp className="-rotate-90" />
                    <span>
                      <GetDate date={isTicketOn.updatedAt} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* delete */}
      {isTicketOn && moreOptions.selected === "Delete" && (
        <div className="fixed left-0 top-0 w-screen h-screen z-[100] overflow-hidden bg-black/50 flex items-center justify-center">
          <div className="w-96 bg-white p-3 rounded-md overflow-hidden">
            {/* ticket detail */}
            <div className="flex-1 shrink-0 p-1.5 h-full">
              <div className="text-sm text-neutral-500 pb-1.5 border-b border-neutral-100 max-h-36 overflow-y-auto">
                <p>{isTicketOn.description}</p>
              </div>
              {/* stuffs */}
              <div className="mt-1.5 flex items-center gap-2.5 flex-wrap">
                {/* status */}
                <div className="text-sm flex items-center gap-x-1 text-neutral-400">
                  <span>Status:</span>
                  <div
                    className={`border rounded-full px-1.5 text-xs py-0.5 ${
                      isTicketOn.status === "Open"
                        ? "border-green-500 text-green-500"
                        : isTicketOn.status === "In Progress"
                        ? "border-sky-500 text-sky-500"
                        : "border-red-500 text-red-500"
                    }`}
                  >
                    <span>{isTicketOn.status}</span>
                  </div>
                </div>
                {/* priority */}
                <div className="text-sm flex items-center gap-x-1 text-neutral-400">
                  <span>Priority:</span>
                  <div
                    className={`border rounded-full px-1.5 text-xs py-0.5 ${
                      isTicketOn.priority === "High"
                        ? "border-red-500 text-red-500"
                        : isTicketOn.priority === "Medium"
                        ? "border-sky-500 text-sky-500"
                        : "border-green-500 text-green-500"
                    }`}
                  >
                    <span>{isTicketOn.priority}</span>
                  </div>
                </div>
                {/* createdAt */}
                <div className="text-sm flex items-center gap-x-1 text-neutral-400">
                  <span>Created at:</span>
                  <div
                    className={`border flex items-center gap-x-1 rounded-full px-1.5 text-xs py-0.5 border-sky-500
                      `}
                  >
                    <LuClockArrowUp />
                    <span>
                      <GetDate date={isTicketOn.createdAt} />
                    </span>
                  </div>
                </div>
                {/* updated at */}
                <div className="text-sm flex items-center gap-x-1 text-neutral-400">
                  <span>Updated at:</span>
                  <div
                    className={`border flex items-center gap-x-1 rounded-full px-1.5 text-xs py-0.5 border-orange-500
                      `}
                  >
                    <LuClockArrowUp className="-rotate-90" />
                    <span>
                      <GetDate date={isTicketOn.updatedAt} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* warning */}
            <div className="flex items-center gap-x-3 my-3 px-1.5 py-1 border border-red-500 bg-red-50 rounded-tr-xl rounded-bl-xl">
              {/* icon */}
              <LuCircleHelp className="text-3xl shrink-0 text-red-500" />
              {/* text */}
              <div className="text-sm text-neutral-700">
                <p>
                  Are you sure to delete this ticket? Remember the action is
                  undone.
                </p>
              </div>
            </div>
            {/* buttons */}
            <div className="flex items-center justify-center gap-x-7">
              <button
                disabled={isTicketDeleting}
                className="px-3 py-1 bg-red-500 rounded-md text-white text-sm transition-colors ease-in-out duration-150 hover:bg-red-600 cursor-pointer"
                onClick={() => {
                  dispatch(deleteTicket(isTicketOn._id));
                }}
              >
                {isTicketDeleting ? (
                  <div className="w-5 aspect-square rounded-full border-2 border-white border-r-transparent animate-spin" />
                ) : (
                  <span>Delete</span>
                )}
              </button>
              <button
                className="px-3 py-1 bg-neutral-500 rounded-md text-white text-sm transition-colors ease-in-out duration-150 hover:bg-neutral-600 cursor-pointer"
                onClick={() => {
                  setIsTicketOn(null);
                  setMoreOptions((prev) => {
                    return {
                      ...prev,
                      selected: "",
                    };
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* user detail */}
      {isUserOn && (
        <div
          onClick={() => {
            dispatch(resetIsUserOn(null))
          }}
          className="fixed left-0 top-0 w-screen h-screen z-[100] overflow-hidden bg-black/50 flex items-center justify-center"
        >
          <div
            className="w-72 bg-white rounded-md overflow-hidden relative"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {/* close */}
            <button
              className="absolute top-1 right-1 w-5 aspect-square rounded-sm bg-neutral-100 text-neutral-500 flex items-center justify-center transition-colors ease-in-out duration-200 hover:bg-red-200 hover:text-red-500 cursor-pointer"
              onClick={() => {
                dispatch(resetIsUserOn(null))
              }}
            >
              <IoMdClose />
            </button>
            {/* profile */}
            <div>
              {/* bg */}
              <div className="w-full h-24 overflow-hidden">
                <GetProfile _id={isUserOn._id} flag="bg" />
              </div>
              {/* pro */}
              <div className="flex items-center justify-center">
                <div className="w-20 aspect-square rounded-full overflow-hidden border-4 border-white shadow-md -mt-10 relative z-50">
                  <GetProfile _id={isUserOn._id} flag="pro" />
                </div>
              </div>
            </div>
            {/* detail */}
            {/* username and email */}
            <div className="flex items-center justify-center gap-x-1.5">
              <span>
                <GetUserInfo _id={isUserOn._id} flag="username" />
              </span>
              |
              <span>
                <GetUserInfo _id={isUserOn._id} flag="email" />
              </span>
            </div>
            {/* role and status */}
            <div className="flex items-center justify-center gap-x-1.5 text-neutral-500 text-sm">
              <span>
                Role: <GetUserInfo _id={isUserOn._id} flag="role" />
              </span>
              |
              <span>
                Status: <GetUserInfo _id={isUserOn._id} flag="status" />
              </span>
            </div>
            {/* date */}
            <div className="flex items-center justify-center gap-x-1.5 text-sm text-green-500">
              Joined <CiClock2 />
              <span>
                <GetDate date={isUserOn.createdAt} />
              </span>
            </div>
            {/* actions */}
            {loggedInUser?.role === "super" && (
              <div className="flex flex-col items-center justify-center gap-2 my-3">
                {/* change role */}
                <button
                  disabled={isUserUpdating}
                  onClick={() => {
                    dispatch(
                      updateUser({
                        _id: isUserOn._id,
                        role: isUserOn.role === "normal" ? "sub" : "normal",
                        status: isUserOn.status,
                      })
                    );
                  }}
                  className="px-3 py-1 border border-neutral-300 rounded-sm text-sm text-neutral-500 cursor-pointer transition-colors ease-in-out duration-150 hover:border-neutral-500 hover:bg-neutral-500 hover:text-white"
                >
                  {isUserOn.role === "normal"
                    ? "Make him sub admin"
                    : isUserOn.role === "sub"
                    ? "Make him normal"
                    : ""}
                </button>
                {/* account status */}
                <button
                  disabled={isUserUpdating}
                  onClick={() => {
                    dispatch(
                      updateUser({
                        _id: isUserOn._id,
                        role: isUserOn.role === "normal" ? "normal" : "sub",
                        status:
                          isUserOn.status === "active" ? "blocked" : "active",
                      })
                    );
                  }}
                  className="px-3 py-1 border border-neutral-300 rounded-sm text-sm text-neutral-500 cursor-pointer transition-colors ease-in-out duration-150 hover:border-neutral-500 hover:bg-neutral-500 hover:text-white"
                >
                  {isUserOn.status === "active"
                    ? "Block User"
                    : isUserOn.status === "blocked"
                    ? "Activate User"
                    : ""}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
