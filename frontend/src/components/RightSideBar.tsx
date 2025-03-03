// icons
import { FaCamera } from "react-icons/fa";
import { BiMessageRoundedCheck } from "react-icons/bi";
import { LuClockArrowDown } from "react-icons/lu";
export default function RightSideBar() {
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
  return (
    <div className="min-w-80 bg-neutral-50 flex">
      <div className="flex-1 p-1.5 flex">
        <div className="flex-1/2 bg-white rounded-md overflow-hidden shadow-md">
          {/* profile */}
          <div>
            {/* bg */}
            <div className="w-full h-24 overflow-hidden relative">
              <input type="file" accept="image/*" hidden id="bg-profile" />
              <label
                htmlFor="bg-profile"
                className="absolute right-1.5 top-1.5 cursor-pointer"
              >
                <div className="w-[28px] text-neutral-500 aspect-square rounded-full flex items-center justify-center bg-white/50">
                  <FaCamera />
                </div>
              </label>
              <img
                className="w-full h-full object-center object-cover"
                src="https://tse2.mm.bing.net/th?id=OIP.dTvwVC62CFZnk3zNVCArlwHaEK&pid=Api&P=0&h=220"
                alt=""
              />
            </div>
            {/* user */}
            <div className="flex items-center gap-x-1.5">
              {/* image */}
              <div className="w-20 ml-5 -mt-10 relative z-50  aspect-square rounded-full overflow-hidden border-4 border-white shadow-md">
                <input type="file" accept="image/*" hidden id="pro-profile" />
                <label
                  htmlFor="pro-profile"
                  className="absolute bottom-0.5 left-1/2 -translate-x-1/2 cursor-pointer"
                >
                  <div className="w-[20px] text-sm text-neutral-500 aspect-square rounded-full flex items-center justify-center bg-white/70">
                    <FaCamera />
                  </div>
                </label>
                <img
                  className="w-full h-full object-center object-cover"
                  src="https://c.pxhere.com/photos/a6/37/portrait_mamiya_film_kodak_medium_format_portra_k_z_pform_tum-192094.jpg!d"
                  alt=""
                />
              </div>
              {/* username & email */}
              <div className="text-sm text-neutral-500">
                <p>Haddis Fenta</p>
                <p className="text-xs text-neutral-700 -mt-0.5">
                  haddis@gmail.com
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
