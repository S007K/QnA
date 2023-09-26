import React from "react";
import { BiEdit, BiRss } from "react-icons/bi";
import { MdOutlineEditOff } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const AnswerSection = () => {
  return (
    <div className="flex justify-between px-4 mb-2 items-center text-gray-500 w-full">
      <div className=" flex laptop:gap-4 mobile:gap-2 w-full">
        <div className="answer laptop:px-3 mobile:px-2 py-2 border rounded-full hover:bg-slate-100 hover:rounded-full flex cursor-pointer gap-1">
          <BiEdit size={24} /> Answer
        </div>
        <div className="follow laptop:px-3 mobile:px-2 py-2 hover:bg-slate-100 hover:rounded-full flex cursor-pointer gap-1">
          <BiRss size={24} />
          Follow
        </div>
        <div className="pass laptop:px-3 mobile:px-2 py-2 hover:bg-slate-100 hover:rounded-full flex cursor-pointer gap-1">
          <MdOutlineEditOff size={24} /> Pass
        </div>
      </div>
      <div className="px-3 py-2 hover:bg-slate-100 hover:rounded-full cursor-pointer flex justify-end">
        <HiOutlineDotsHorizontal size={24} />
      </div>
    </div>
  );
};

export default AnswerSection;
