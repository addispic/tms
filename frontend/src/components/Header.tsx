import { useLocation } from "react-router-dom";
// icons
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiMessageCircle } from "react-icons/fi";
import { IoExitOutline } from "react-icons/io5";
// sub headers
import TicketsHeader from "./TicketsHeader";
import MembersHeader from "./MembersHeader";

export default function Header() {
  const { pathname } = useLocation();
  return (
    <header className="p-1.5">
      <div className="w-full flex items-center justify-between py-1.5 px-3 bg-white rounded-md overflow-hidden shadow-md">
        {/* left */}
        <div>
          {pathname === "/" && <TicketsHeader />}
          {pathname === "/members" && <MembersHeader />}
        </div>
        {/* right */}
        <div className="flex items-center justify-end gap-x-3">
          {/* notifications & messages */}
          <div className="flex items-center gap-x-1.5">
            <div className="w-[24px] aspect-square rounded-sm flex items-center justify-center bg-neutral-100 text-neutral-500 transition-colors ease-in-out duration-150 hover:bg-neutral-200 hover:text-neutral-700 cursor-pointer">
              <IoIosNotificationsOutline />
            </div>
            <div className="w-[24px] aspect-square rounded-sm flex items-center justify-center bg-neutral-100 text-neutral-500 transition-colors ease-in-out duration-150 hover:bg-neutral-200 hover:text-neutral-700 cursor-pointer">
              <FiMessageCircle />
            </div>
          </div>
          {/* profile */}
          <div className="flex items-center justify-between gap-x-1 cursor-pointer">
            <div className="text-sm text-neutral-500">
              <span>Addis Fenta</span>
            </div>
            <div className="w-[28px] aspect-square rounded-full overflow-hidden">
              <img
                className="w-full h-full object-center object-cover"
                src="https://www.addispic.com/addis-i.jpg"
                alt=""
              />
            </div>
          </div>
          {/* logout button */}
          <button className="flex items-center gap-x-1.5 border border-neutral-300 rounded-full px-1.5 py-0.5 text-neutral-500 transition-colors ease-in-out duration-300 hover:border-neutral-700 hover:bg-neutral-700 hover:text-neutral-200 cursor-pointer">
            <IoExitOutline />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
