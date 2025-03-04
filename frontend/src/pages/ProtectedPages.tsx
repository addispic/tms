import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

// components
import LeftSideBar from "../components/LeftSideBar";
import Header from "../components/Header";
import RightSideBar from "../components/RightSideBar";

export default function ProtectedPages() {
  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user") as string)?._id) {
      // console.log("GOOD TO GO");
    } else {
      navigate("/authentication");
    }
  }, []);
  return (
    <div className="w-screen h-screen overflow-hidden flex relative">
      {/* left side bar */}
      <LeftSideBar />
      {/* right */}
      <div className="flex-1 flex flex-col">
        {/* header */}
        <Header />
        {/* bottom */}
        <div className="flex-1 flex relative">
          {/* pages */}
          <div className="flex-1">
            <Outlet />
          </div>
          {/* right side component */}
          <RightSideBar />
        </div>
      </div>
    </div>
  );
}
