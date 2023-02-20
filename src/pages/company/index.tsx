import Image from "next/image";
import React, { ReactElement } from "react";
import { AiFillProfile, AiFillStar, AiOutlineLink } from "react-icons/ai";
import SideNav from "src/componets/company/companyNavbar";
import DashBoardLayout from "src/Layout/DasboardsLayout";

const Card = ({ name, Value }: { name: string; Value: number | string }) => {
  return (
    <div className="bg-white w-full rounded-lg flex space-x-3 items-center px-[15px] py-5 max-w-[140px]">
      <div>
        <p className="text-TitleColor text-xl font-bold">{Value}</p>
        <p className="text-[#A3AED0] text-xs font-medium">{name}</p>
      </div>
    </div>
  );
};

const MessageCard = ({
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
    <div className="bg-white w-full shrink-0 rounded-lg space-x-[17px]  p-5 max-w-[360px]">
      <div className="flex space-x-4 pb-5  border-b border-[#EFEFEF]">
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
          <p className="font-normal text-xs text-[#091E42]">
            Enquired 4 Minutes Ago{" "}
          </p>
        </div>
      </div>
      <div className="py-5 space-y-1">
        <p className="text-[#091E42] text-xs">ENQUIRED FOR</p>
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
      </div>
      <p className="text-[#2E7B32] font-medium text-[12px]">4 Messages</p>
    </div>
  );
};

const DashBoard = () => {
  return (
    <>
      <div className="flex justify-between w-full items-center">
        <div>
          <h1 className="text-[#707EAE] text-[10.94px]">
            Aparna Constructions
          </h1>
          <h2 className="text-TitleColor font-bold text-[26px]">Hello Admin</h2>
        </div>
      </div>
      <div className="flex space-x-[17px] mt-6 mb-8">
        <Card name="Properties" Value={18} />
        <Card name="On Discussion" Value={8} />
        <Card name="Views" Value={"130k"} />
      </div>
      <div className="">
        <h1 className="text-black font-normal text-lg mb-[26px]">Statistics</h1>
        <div className="bg-white rounded-sm mb-9 p-6">
          <div>
            <h1 className="text-[#707EAE] text-sm">Daily Traffic</h1>
            <div className="flex  space-x-2">
              <p className="text-[#2B3674] text-[34px] font-bold">2023</p>
              <h1 className="text-[#707EAE] text-sm self-end">Vistors</h1>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div>
        <h1 className="text-black font-normal text-lg mb-6">Buyer Messages</h1>
      </div>
      <div className="w-full  overflow-scroll scrollbar-hide">
        <div className="flex space-x-6 ">
          <MessageCard
            name="Aparna Construction"
            img="/agent.png"
            place=""
            stars={3.4}
          />
          <MessageCard
            name="Aparna Construction"
            img="/agent.png"
            place=""
            stars={3.4}
          />
          <MessageCard
            name="Aparna Construction"
            img="/agent.png"
            place=""
            stars={3.4}
          />
        </div>
      </div>
    </>
  );
};

DashBoard.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout Navbar={SideNav}>{page}</DashBoardLayout>;
};

export default DashBoard;
