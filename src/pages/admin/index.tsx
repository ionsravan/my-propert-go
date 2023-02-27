import Image from "next/image";
import React, { ReactElement } from "react";
import {
  AiFillProfile,
  AiFillStar,
  AiOutlineLink,
  AiOutlineMore,
} from "react-icons/ai";
import { Agent, response } from "src/@types";
import AdminsideNav from "src/componets/admin/adminDasboardnav";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import { useFetch } from "src/lib/hooks/useFetch";
import { Menu } from "@headlessui/react";
import { useAxios } from "src/utills/axios";
import { toast } from "react-toastify";

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
    <div className="bg-white w-full rounded-lg flex space-x-3 items-center px-[15px] py-5 max-w-[180px]">
      <div className="bg-primaryBlue bg-opacity-20 flex rounded-full justify-center items-center h-[46px] w-[46px]">
        <div className=" text-primaryBlue h-4 w-4">{<Icon />}</div>
      </div>
      <div>
        <p className="text-primaryBlue text-[19.05px] font-bold">{Value}</p>
        <p className="text-[#A3AED0] text-xs">{name}</p>
      </div>
    </div>
  );
};

const ComapnyCard = ({
  name,
  place,
  img,
  stars,
  _id,
}: {
  name: string;
  place: string;
  stars: number;
  img: string;
  _id: string;
}) => {
  const instance = useAxios();
  return (
    <div className="bg-white w-full shrink-0 rounded-lg flex n  space-x-[17px]  p-5 max-w-[280px] relative">
      <div className="relative  flex rounded-full justify-center items-center h-[46px] w-[46px]">
        <Image
          fill
          alt=""
          src={img}
          className="w-full h-full object-contain rounded-full "
        />
      </div>
      <div>
        <h1 className="text-sm text-TitleColor font-bold">{name}</h1>
        <div className="flex space-x-4 mb-4 text-sm mt-1">
          <p className="font-normal text-xs text-[#091E42]">Savita Grenage</p>
          <div className="flex  items-center px-1 space-x-1 bg-green-300 bg-opacity-40 text-green-800 text-[9px]">
            <p>4.5</p>
            <AiFillStar className="text-[6px]" />
          </div>
        </div>
      </div>
      <div className="absolute top-2 right-4">
        <button
          onClick={async () => {
            try {
              const res = await instance.delete("/admin/agent/deleteAdmin", {
                data: {
                  agentId: _id,
                },
              });
              console.log(res);
              toast("Agent Deleted", {
                className: "text-red-400",
              });
            } catch (e) {
              console.log(e);
              toast("Error Accured Try Again");
            }
          }}
          className="text-red-400 px-3 hover:bg-gray-100"
        >
          delete
        </button>
      </div>
    </div>
  );
};

const DashBoard = () => {
  const { data, error, status } = useFetch<response<Agent[]>>(
    "/admin/agent/getAllAgents"
  );
  return (
    <>
      <div className="flex justify-between w-full items-center">
        <div>
          <h1 className="text-[#707EAE] text-[10.94px]">Hello Admin</h1>
          <h2 className="text-TitleColor font-bold text-[26px]">Dasboard</h2>
        </div>
      </div>
      <div className="flex space-x-[17px] mt-6 mb-8">
        <Card Icon={AiFillProfile} name="Total Students" Value={2598} />
        <Card Icon={AiFillProfile} name="Total Students" Value={2598} />
        <Card Icon={AiFillProfile} name="Total Students" Value={2598} />
      </div>
      {/* <div className="bg-white rounded-sm mb-9 p-6  ">
        <div>
          <div>
            <h1 className="text-[#707EAE] text-sm">Daily Traffic</h1>
            <div className="flex  space-x-2">
              <p className="text-[#2B3674] text-[34px] font-bold">2023</p>
              <h1 className="text-[#707EAE] text-sm self-end">Vistors</h1>
            </div>
          </div>
        </div>
        <div></div>
      </div> */}
      <div>
        <h1 className="text-black font-bold text-lg mb-4">All Compenies</h1>
      </div>
      <div className="w-full  overflow-scroll">
        <div className="flex space-x-4 ">
          {data?.result.map((ag) => {
            return (
              <ComapnyCard
                _id={ag._id}
                key={ag._id}
                name={ag?.name}
                img={ag?.profilePhoto}
                place=""
                stars={3.4}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

DashBoard.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout Navbar={AdminsideNav}>{page}</DashBoardLayout>;
};

export default DashBoard;
