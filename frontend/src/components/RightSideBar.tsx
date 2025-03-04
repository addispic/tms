import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";

// icons
import { FaCamera } from "react-icons/fa";
import { BiMessageRoundedCheck } from "react-icons/bi";
import { LuClockArrowDown } from "react-icons/lu";
// slices
import { userSelector } from "../features/users/usersSlice";
// components
import GetProfile from "./GetProfile";
// slices
// profiles
import {
  newProfile,
  isProfileUploadingSelector,
  setProfileFlag,
  profileFlagSelector,
  setProfilePreview,
} from "../features/profiles/profilesSlice";
export default function RightSideBar() {
  // states
  // slices
  // users
  const user = useAppSelector(userSelector);
  // profiles
  const isProfileUploading = useAppSelector(isProfileUploadingSelector);
  const profileFlag = useAppSelector(profileFlagSelector);
  // local
  const messages = [
    {
      img: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?cs=srgb&dl=pexels-italo-melo-2379005.jpg&fm=jpg",
      message: "Hello How is Everything with yo..",
      date: "3 minutes ago",
    },
    {
      img: "https://c.pxhere.com/photos/c7/42/young_man_portrait_beard_young_man_male_handsome_young_man_handsome-1046502.jpg!d",
      message: "I just submitted the project...",
      date: "4 days ago",
    },
    {
      img: "https://c.stocksy.com/a/XJC000/z9/47339.jpg",
      message: "Can I get the detail please...",
      date: "2 weeks ago",
    },
    {
      img: "https://jooinn.com/images/portrait-of-man-27.jpg",
      message: "You are the best...",
      date: "a month ago",
    },
    {
      img: "https://c.stocksy.com/a/dTW500/z9/1316485.jpg",
      message: "I am waiting for your response...",
      date: "3 months ago",
    },
  ];
  // local states
  const [flag, setFlag] = useState("");

  // hooks
  const dispatch = useAppDispatch();

  // form submit handler
  const profileUploadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const profile = event.target.files?.[0] || "";
    if (profile) {
      const prevURL = URL.createObjectURL(profile);
      dispatch(setProfilePreview(prevURL));
      dispatch(setProfileFlag(flag));
    }
    const formData = new FormData();
    formData.append("flag", flag);
    formData.append("profile", profile);
    dispatch(newProfile(formData));
  };

  return (
    <div
      className="xl:w-80 transition-all ease-in-out duration-150 bg-neutral-50 flex xl:relative xl:right-0 xl:top-0 xl:h-full absolute h-full right-0 top-0 z-50 overflow-hidden w-0"
      id="right-sidebar"
    >
      <div className="flex-1 p-1.5 flex">
        <div className="flex-1/2 bg-white rounded-md overflow-hidden shadow-md">
          {/* profile */}
          <div>
            {/* bg */}
            <div className="w-full h-24 overflow-hidden relative">
              <input
                type="file"
                id="new-bg-image-file-picker"
                accept="image/*"
                hidden
                onChange={profileUploadHandler}
              />
              <label
                htmlFor="new-bg-image-file-picker"
                className="absolute right-1.5 top-1.5"
              >
                <div
                  className="w-[20px] aspect-square rounded-full overflow-hidden bg-neutral-200 opacity-50 transition-opacity ease-in-out duration-150 hover:opacity-100 flex items-center justify-center cursor-pointer text-sm"
                  onClick={() => {
                    setFlag("bg");
                  }}
                >
                  {isProfileUploading && profileFlag === "bg" ? (
                    <div className="w-[10px] aspect-square rounded-full shrink-0 border-2 border-black animate-spin border-r-transparent" />
                  ) : (
                    <FaCamera />
                  )}
                </div>
              </label>
              <GetProfile _id={user?._id as string} flag="bg" />
            </div>
            {/* user */}
            <div className="flex items-center gap-x-1.5">
              {/* image */}
              <div className="w-20 ml-5 -mt-10 relative z-50  aspect-square rounded-full overflow-hidden border-4 border-white shadow-md">
                <input
                  type="file"
                  id="new-profile-image-file-picker"
                  accept="image/*"
                  hidden
                  onChange={profileUploadHandler}
                />
                <label
                  htmlFor="new-profile-image-file-picker"
                  className="absolute left-1/2 -translate-x-1/2 bottom-0.5"
                >
                  {isProfileUploading && profileFlag === "pro" ? null : (
                    <div
                      className="w-[20px] aspect-square rounded-full overflow-hidden bg-neutral-200 opacity-75 transition-opacity ease-in-out duration-150 hover:opacity-100 flex items-center justify-center cursor-pointer text-sm"
                      onClick={() => {
                        setFlag("pro");
                      }}
                    >
                      <FaCamera />
                    </div>
                  )}
                </label>
                <GetProfile _id={user?._id as string} flag="pro" />
              </div>
              {/* username & email */}
              <div className="text-sm text-neutral-500">
                <p>{user?.username}</p>
                <p className="text-xs text-neutral-700 -mt-0.5">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
          {/* messages */}
          <div className="mt-5 p-3">
            <header className="flex items-center gap-x-1.5 border-b border-neutral-100 pb-1">
              <div className="w-6 text-neutral-500 aspect-square rounded-sm bg-neutral-100 flex items-center justify-center">
                <BiMessageRoundedCheck />
              </div>
              <span className="text-neutral-500">Messages</span>
            </header>
            {/* list */}
            <div className="mt-3">
              {messages.map((messageItem) => {
                return (
                  <div
                    key={messageItem.message}
                    className="flex items-center gap-x-1.5 mb-1.5 p-1.5 rounded-xl cursor-pointer transition-colors ease-in-out duration-150 hover:bg-neutral-100 bg-neutral-50"
                  >
                    {/* image */}
                    <div className="w-[28px] aspect-square rounded-full overflow-hidden">
                      <img
                        className="w-full h-full object-center object-cover"
                        src={messageItem.img}
                        alt=""
                      />
                    </div>
                    {/* text */}
                    <div className="text-neutral-500 text-xs">
                      <p>{messageItem.message}</p>
                      <div className="flex items-center gap-x-1.5">
                        <LuClockArrowDown />
                        <span>{messageItem.date}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
