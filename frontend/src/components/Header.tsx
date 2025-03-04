import {useEffect} from 'react'
import { useLocation,useNavigate } from "react-router-dom";
// icons
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiMessageCircle } from "react-icons/fi";
import { IoExitOutline } from "react-icons/io5";
import { IoMdMore } from "react-icons/io";
import { RiMenuUnfoldLine } from "react-icons/ri";

// hooks
import {useAppSelector,useAppDispatch}  from '../hooks'
// slices
import {userSelector,logout,formIdToggler} from '../features/users/usersSlice'
// sub headers
import TicketsHeader from "./TicketsHeader";
import MembersHeader from "./MembersHeader";

// utils
import { rightSideBarToggler,leftSideBarToggler } from "../utils/togglers";
// components
import GetUserInfo from "./GetUserInfo";
import GetProfile from "./GetProfile";

export default function Header() {
  const { pathname } = useLocation();
  // states
  // users
  const user = useAppSelector(userSelector)
  // hooks
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // effects
  useEffect(()=>{
    if(!user){
      navigate('/authentication')
    }
  },[user])
  return (
    <header className="p-1.5">
      <div className="w-full flex items-center justify-between py-1.5 px-3 bg-white rounded-md overflow-hidden shadow-md">
        {/* left */}
        <div className="flex items-center gap-x-1.5">
          {/* menu button */}
        <button
            className="w-6 md:hidden aspect-square rounded-sm bg-neutral-100 flex items-center justify-center text-neutral-500 text-lg cursor-pointer transition-colors ease-in-out duration-150 hover:bg-neutral-200 hover:text-neutral-700"
            onClick={() => {
              console.log('From The Button Itself')
              leftSideBarToggler();
            }}
          >
            <RiMenuUnfoldLine />
          </button>
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
            <div className="w-[24px] hidden aspect-square rounded-sm md:flex items-center justify-center bg-neutral-100 text-neutral-500 transition-colors ease-in-out duration-150 hover:bg-neutral-200 hover:text-neutral-700 cursor-pointer">
              <FiMessageCircle />
            </div>
          </div>
          {/* profile */}
          <div className="flex items-center justify-between gap-x-1 cursor-pointer">
            <div className="text-sm text-neutral-500 hidden md:inline-block">
              <span>
                <GetUserInfo _id={user?._id as string} flag="username"/>
              </span>
            </div>
            <div className="w-[28px] aspect-square rounded-full overflow-hidden">
              <GetProfile _id={user?._id as string} flag="pro"/>
            </div>
          </div>
          {/* more button */}
          <button
            className="w-6 xl:hidden aspect-square rounded-sm bg-neutral-100 flex items-center justify-center text-neutral-500 text-lg cursor-pointer transition-colors ease-in-out duration-150 hover:bg-neutral-200 hover:text-neutral-700"
            onClick={() => {
              rightSideBarToggler();
            }}
          >
            <IoMdMore />
          </button>
          {/* logout button */}
          <button className="flex items-center gap-x-1.5 border border-neutral-300 rounded-full px-1.5 py-0.5 text-neutral-500 transition-colors ease-in-out duration-300 hover:border-neutral-700 hover:bg-neutral-700 hover:text-neutral-200 cursor-pointer" onClick={()=>{
            dispatch(logout())
            dispatch(formIdToggler('login'))
          }}>
            <IoExitOutline />
            <span className="text-sm hidden md:inline-block">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
