import Image from "next/image";
import React, { ReactElement } from "react";
import {
  AiFillProfile,
  AiFillStar,
  AiOutlineEdit,
  AiOutlineLink,
} from "react-icons/ai";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import { TbEdit } from "react-icons/tb";
import AdminsideNav from "src/componets/admin/adminDasboardnav";
import { useFetch } from "src/lib/hooks/useFetch";
import { response, Agent } from "src/@types";

const Card = ({
  name,
  Value,
  Icon,
}: {
  name: string;
  Value: number;
  Icon: React.ElementType;
}) => {
  return (
    <div className="bg-white w-full rounded-lg flex space-x-3 items-center p-5 max-w-[200px]">
      <div className="bg-primaryBlue bg-opacity-40 flex rounded-full justify-center items-center h-10 w-10">
        <div className=" text-primaryBlue h-4 w-4">{<Icon />}</div>
      </div>
      <div>
        <p className="text-primaryBlue text-[19.05px] font-bold">{Value}</p>
        <p className="text-[#A3AED0] text-sm">{name}</p>
      </div>
    </div>
  );
};

const ComapnyCard = ({
  name,
  place,
  img,
  stars,
}: {
  name: string;
  place: string;
  stars: number;
  img: string;
}) => {
  return (
    <div className="bg-white w-full rounded-lg md:flex  items-center justify-between  px-[25px] py-5 shadow-sm cursor-pointer ">
      <div className="flex space-x-3 ">
        <div className="relative  flex rounded-full justify-center items-center h-[53px] w-[53px]">
          <Image
            fill
            alt=""
            src={img}
            className="w-full h-full object-contain rounded-full "
          />
        </div>
        <div>
          <h1 className="text-lg text-TitleColor font-bold">{name}</h1>
          <div className="flex space-x-4 mb-4 text-sm mt-1">
            <p className="text-TitleColor text-xs font-normal  ">
              Savita Grenage
            </p>
            <div className="flex  items-center px-2 space-x-1 bg-green-300 bg-opacity-40 text-green-800 text-[9px]">
              <p>4.5</p>
              <AiFillStar className="text-[8px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center ">
        <div className="flex flex-col items-start px-5 border-r  border-black/10">
          <span className="font-bold text-TitleColor text-lg">12</span>
          <span className="text-[#8993A4] text-[10px]">Postings</span>
        </div>
        <div className="flex flex-col items-start px-5 ">
          <span className="font-bold text-TitleColor text-lg">04</span>
          <span className="text-[#8993A4] text-[10px]">Active</span>
        </div>
        <div className="flex text-[#0078DB] px-5 items-center space-x-1  ">
          <TbEdit className="text-xl" />
          <span className=" text-[11px]">Edit</span>
        </div>
      </div>
    </div>
  );
};

// give main area a max widht
const Brokers = () => {
  const { data, error, status } = useFetch<response<Agent[]>>(
    "/admin/agent/getAllAgents"
  );
  return (
    <div className=" w-full bg-[#F6F6F6] ">
      <div className="flex justify-between w-full mb-10 items-start ">
        <div>
          <h1 className="text-[#707EAE] text-[10.4px]">Hello Admin</h1>
          <h2 className="text-TitleColor font-bold text-3xl">Brokers </h2>
        </div>
        <div className="max-w-[140px] text-sm  w-full">
          <button className=" text-white font-medium justify-center w-full bg-[#0066FF] rounded-full py-3 flex space-x-2 items-center transition transform active:scale-95 duration-200  ">
            <span>
              <TbEdit />
            </span>
            <span>Add New</span>
          </button>
        </div>
      </div>
      <div className="space-y-[15px]">
        {data?.result.map((ag) => {
          return (
            <ComapnyCard
              key={ag?._id}
              name={ag?.name}
              img={ag?.profilePhoto}
              place=""
              stars={3.4}
            />
          );
        })}
      </div>
    </div>
  );
};

Brokers.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout Navbar={AdminsideNav}>{page}</DashBoardLayout>;
};

export default Brokers;
