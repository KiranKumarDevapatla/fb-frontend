import React, { useContext } from "react";

import { HiInbox } from "react-icons/hi2";
import { SiRedux } from "react-icons/si";
import { MdPeopleAlt } from "react-icons/md";
import { IoBarChartSharp } from "react-icons/io5";
import { getInitials } from "../../utils/utils";
import { AppContext } from "../../context/AppContext";

const SideNavbar = () => {
  const { state } = useContext(AppContext);
  const senderProfile = state.conversations?.length > 0 && state.conversations[0]?.participants?.data[0];
  const img = "";
  const placeholder =
    "https://www.tlbx.app/200.svg";
  return (
    <nav className="flex flex-col justify-between bg-[#1E4D91] w-20 border-r">
      <div className="flex flex-col">
        <div className="w-full bg-transparent p-4 cursor-pointer hover:opacity-[0.8] opacity-1">
          <SiRedux className="mx-auto h-6 w-6 text-white" />
        </div>
        <div className="w-full bg-white p-4 cursor-pointer">
          <HiInbox className="mx-auto h-6 w-6 text-[#1E4D91]" />
        </div>
        <div className="w-full bg-transparent p-4 cursor-pointer hover:opacity-[0.8] opacity-1">
          <MdPeopleAlt className="mx-auto h-6 w-6 text-white" />
        </div>
        <div className="w-full bg-transparent p-4 cursor-pointer hover:opacity-[0.8] opacity-1">
          <IoBarChartSharp className="mx-auto h-6 w-6 text-white" />
        </div>
      </div>
      <div className="flex items-center mx-auto mb-6 shadow-md border-none rounded-full">
        <div className={`avatar_badge online h-12 w-12`}>
          {img ? (
            <img className="h-12 w-12" src={img || placeholder} alt={""} />

          ) : (
            <div className="h-12 w-12 bg-gray-200 flex justify-center items-center">
              {getInitials(senderProfile.name || "")}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default SideNavbar;
