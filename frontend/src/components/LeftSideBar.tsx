import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// icons
import { MdSettingsSuggest } from "react-icons/md";
import { IoExit } from "react-icons/io5";
import { PiBookOpenUserFill } from "react-icons/pi";
import { RiDashboardLine } from "react-icons/ri";
import { RiFilePaper2Line } from "react-icons/ri";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";
import { GoProjectSymlink } from "react-icons/go";
import { MdOutlineEditNotifications } from "react-icons/md";
export default function LeftSideBar() {
  // states
  // local
  const [links, setLinks] = useState({
    options: [
      {
        text: "Dashboard",
        path: "/",
        icon: RiDashboardLine,
      },
      {
        text: "Tickets",
        path: "/",
        icon: RiFilePaper2Line,
      },
      {
        text: "Members",
        path: "/members",
        icon: MdOutlineSupervisorAccount,
      },
      {
        text: "Messages",
        path: "/messages",
        icon: IoChatbubblesOutline,
      },
      {
        text: "Projects",
        path: "/projects",
        icon: GoProjectSymlink,
      },
    ],
    selected: "Tickets",
  });
  const not = [
    {
      img: "https://www.addispic.com/addis-i.jpg",
      username: "Addis Fenta",
      message: "Just add a new post",
    },
    {
      img: "https://images.alphacoders.com/752/752287.jpg",
      username: "Surafel Teshome",
      message: "Creates an event",
    },
    {
      img: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?cs=srgb&dl=pexels-italo-melo-2379005.jpg&fm=jpg",
      username: "Andualem Chane",
      message: "Order a new ticket",
    },
  ]

  // hooks
  const navigate = useNavigate();

  // link click handler
  const linkClickHandler = (linkItem: { text: string; path: string }) => {
    if (["Dashboard", "Tickets", "Members"].includes(linkItem.text)) {
      setLinks((prev) => {
        return {
          ...prev,
          selected: linkItem.text,
        };
      });
      navigate(linkItem.path);
    }
  };
  return (
    <div className="w-64 shrink-0 flex">
      <div className="flex-1 flex p-2">
        <div className="bg-white rounded-xl overflow-hidden shadow-md flex-1 p-3 flex flex-col gap-y-10">
          <div className="flex-1 flex flex-col gap-y-10">
            {/* nav */}
            <div>
              {/* header */}
              <header className="pb-1.5 border-b border-neutral-100">
                <NavLink
                  className={
                    "flex items-center gap-x-1.5 text-neutral-400 font-black transition-colors ease-in-out duration-300 hover:text-green-600"
                  }
                  to={"/"}
                >
                  <PiBookOpenUserFill className="text-xl" />
                  <h3>TicketManagement</h3>
                </NavLink>
              </header>
              {/* links */}
              <div className="mt-3">
                {links.options.map((linkItem) => {
                  return (
                    <div
                      key={linkItem.text}
                      className={`flex items-center gap-x-1.5 relative mb-1.5 py-0.5 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-neutral-100 before:absolute before:left-0 before:bottom-0 before:w-0 before:h-[1px] before:bg-green-500 before:transition-all before:ease-in-out before:duration-400 hover:before:w-full before:z-10 cursor-pointer ${
                        links.selected === linkItem.text
                          ? "text-green-500"
                          : "text-neutral-500"
                      }`}
                      onClick={() => {
                        linkClickHandler({
                          text: linkItem.text,
                          path: linkItem.path,
                        });
                      }}
                    >
                      <linkItem.icon className="text-lg" />
                      <span className="text-sm">{linkItem.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* notifications */}
            <div>
              <header className="flex items-center gap-x-1.5 border-b border-neutral-100 text-neutral-400 text-sm pb-1.5">
                <div className="w-[24px] aspect-square rounded-sm overflow-hidden bg-neutral-100 flex items-center justify-center">
                  <MdOutlineEditNotifications className="text-lg" />
                </div>
                <span>Notifications</span>
              </header>
              {/* lists */}
              <div className="mt-1.5">
                {not.map((notItem) => {
                  return (
                    <div
                      key={notItem.username}
                      className="mb-1.5 flex items-center gap-x-1.5 pb-1 cursor-pointer"
                    >
                      {/* image */}
                      <div className="w-[28px] aspect-square rounded-full overflow-hidden">
                        <img
                          className="w-full h-full object-center object-cover"
                          src={notItem.img}
                          alt=""
                        />
                      </div>
                      {/* text */}
                      <div className="text-sm text-neutral-500 flex-1 border-b border-neutral-100 pb-1">
                        <p>{notItem.username}</p>
                        <p className="text-xs -mt-0.5">{notItem.message}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* spacer */}
            <div />
          </div>

          {/* footer */}
          <div className="flex flex-col gap-y-1.5">
            {/* settings */}
            <div className="flex items-center gap-x-1.5 cursor-pointer relative text-neutral-500 p-1.5 rounded-sm overflow-hidden after:absolute after:left-0 after:bottom-0 after:h-full after:w-[30px] after:bg-neutral-200 after:rounded-r-sm after:transition-all after:ease-in-out after:duration-300 hover:after:w-full ">
              <MdSettingsSuggest className="relative text-xl z-10" />
              <span className="text-sm relative z-10">Settings</span>
            </div>
            {/* logout */}
            <div className="flex items-center gap-x-1.5 cursor-pointer relative text-neutral-500 p-1.5 rounded-sm overflow-hidden after:absolute after:left-0 after:bottom-0 after:h-full after:w-[30px] after:bg-neutral-200 after:rounded-r-sm after:transition-all after:ease-in-out after:duration-300 hover:after:w-full ">
              <IoExit className="relative text-xl z-10" />
              <span className="text-sm relative z-10">Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
