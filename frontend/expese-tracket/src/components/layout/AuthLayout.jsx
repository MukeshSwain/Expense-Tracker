import React from "react";
import front1 from "../../assets/images/front1.jpeg";
import { LuTrendingUpDown } from "react-icons/lu";


function AuthLayout({ children }) {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
        {children}
      </div>
      <div className="hidden md:block w-[40vw] h-screen bg-auth-bg-img bg-violet-50 bg-cover bg-no-repeat bg-center over-flow-hidden p-8 relative">
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute top-7 -left-5" />
        <div className="w-48 h-48 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10" />
        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5" />
        <div className="grid grid-cols-1 z-20 mt-10">
          <StatusInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Expenses and Income"
            value="450,000"
            color="bg-primary"
          />
        </div>
        <img
          src={front1}
          className="w-64 h-80 rounded-2xl  lg:w-[90%] absolute bottom-10 shadow-lg shadow-lg/400/15 "
          alt=""
        />
      </div>
    </div>
  );
}

export default AuthLayout;

const StatusInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 z-10">
      <div
        className={`w-12 h-12 flex items-center justify-center text-white text-[26px] ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div className="">
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px] ">${value}</span>
      </div>
    </div>
  );
};
