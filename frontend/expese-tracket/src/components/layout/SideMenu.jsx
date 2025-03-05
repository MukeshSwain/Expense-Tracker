import React from "react";
import { side_Menu_Data } from "../../utils/data";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";
import { setdashboardData } from "../../redux/dashboardslice";

function SideMenu({ activeMenu }) {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hqandleLogout = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(null));
        dispatch(setdashboardData([]));
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {}
  };

  const noProfileImage = () => {
    const name = user?.fullName.split(" ");
    return name[0][0] + name[1][0];
  };
  const imageAlt = noProfileImage();
  const handleClick = (route) => {
    if (route === "logout") {
      hqandleLogout();
      return;
    }
    navigate(route);
  };
  return (
    <div className="w-64 h-[calc(100vh-64px)] bg-white  border-r border-gray-200/50 sticky top-[64px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImage ? (
          <img
            src={user?.profileImage || ""}
            className="w-20 h-20 bg-slate-400 rounded-full"
            alt="profile image"
          />
        ) : (
          <div className="w-20 h-20 bg-slate-400 rounded-full flex items-center justify-center">
            <p className="text-xl text-bold">{imageAlt}</p>
          </div>
        )}
        <h5 className="text-gray-900 font-medium leading-6 mb-4">
          {user?.fullName || ""}
        </h5>
      </div>
      {side_Menu_Data.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] cursor-pointer ${
            activeMenu == item?.label ? "bg-purple-500 text-white" : ""
          } py-3 px-6 rounded-lg mb-3 `}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default SideMenu;
