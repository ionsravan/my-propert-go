import Image from "next/image";
import { AiFillHome, AiFillStar } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";
import { MdOutlineApartment, MdVilla } from "react-icons/md";
import { SlArrowRight } from "react-icons/sl";

interface ChipProps {
  Icon?: React.ElementType;
  text: string;
  isActive?: boolean;
}

const Chip = ({ Icon, text, isActive }: ChipProps) => {
  return (
    <div
      className={
        "rounded-full px-4 py-2 border  flex items-center space-x-2 active:scale-95 transition transform duration-200 -50 cursor-pointer " +
        (isActive ? " bg-primaryBlue text-white" : " ")
      }
    >
      {Icon && <Icon className={""} />}
      <button className={""}>{text}</button>
    </div>
  );
};

export const Avtar = () => {
  return (
    <div className="h-8 w-8 relative rounded-full">
      <Image
        src={"/agent.png"}
        fill
        className="object-fill rounded-full"
        alt="villa4"
      />
    </div>
  );
};

export const Conversation = () => {
  return (
    <div className="mb-5 bg-white rounded-lg md:flex cursor-pointer">
      {/* image section */}
      <div className="h-[220px] relative md:w-[180px]">
        <Image
          src={"/smallb.png"}
          fill
          alt="home"
          className="rounded-l-lg object-cover"
        />
      </div>
      {/* main info part */}
      <div className="p-5 w-full">
        <div className="">
          <h1 className="text-xl font-bold text-TitleColor">
            4 BHK Apartment In Hosur Road
          </h1>
          <div className="flex space-x-4 mb-4 text-sm mt-1">
            <p className="text-title ">Savita Grenage</p>
            <div className="flex  items-center px-2 space-x-1 bg-green-300 bg-opacity-40 text-green-800">
              <p>4.5</p>
              <AiFillStar />
            </div>
          </div>
        </div>
        <div className=" max-w-xl py-1 w-full flex">
          <div className="">
            <p className="flex text-TitleColor text-lg items-center">
              <span className="flex items-center space-x-1 ">
                <FaRupeeSign />
                <span className="text-lg font-bold">2.9</span>
              </span>
              <span className="ml-1 text-xs">Cr</span>
            </p>
            <p className="text-black opacity-40 text-sm hidden md:block">
              Onwards
            </p>
          </div>
          <div className=" flex flex-col items-center grow ">
            <div>
              <p className="flex text-TitleColor text-lg items-center">
                <span className="flex items-center space-x-1 ">
                  <span className="text-lg font-bold">2,800-2,870</span>
                </span>
                <span className="ml-1 text-xs">sq ft</span>
              </p>
              <p className="text-black opacity-40 text-sm md:block hidden">
                (260-267 sq.m.) Super built-up Area
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="flex text-TitleColor text-lg items-center">
              <span className="flex items-center space-x-1 ">
                <span className="text-lg font-bold">4BHK</span>
              </span>
              <span className="ml-1 text-xs"></span>
            </p>
            <p className="text-black opacity-40 text-sm md:block hidden">
              4 Baths
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-8 mt-4">
          <div className="flex -space-x-2">
            <Avtar />
            <Avtar />
            <Avtar />
          </div>
          <p className="text-green-800 text-sm">3 Buyers Messages</p>
        </div>
      </div>
    </div>
  );
};

const OngoinPropertyConvo = () => {
  return (
    <div className="max-w-7xl font-manrope pt-5 ">
      {/* header section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Hello Vikash</h1>
          <p className="text-sm opacity-90">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim dolor
            architecto placeat, assumenda fugit dolorem.
          </p>
        </div>
        <div className="w-max">
          <Chip text="See Past Appointments" />
        </div>
      </div>
      {/* chips */}
      <div className="flex space-x-4 mb-8 mt-10 ">
        <Chip Icon={AiFillHome} text="home" isActive />
        <Chip Icon={MdVilla} text="Villa" />
        <Chip Icon={MdOutlineApartment} text="Apartments" />
      </div>
      {/* search */}
      <div>
        <div className="mt-2">
          <div className="flex px-1 items-center bg-white text-green-300 max-w-7xl  rounded-full ">
            <div className="relative h-6 w-6 pl-10 ">
              <Image
                src={"/loc.svg"}
                fill
                alt="home"
                className="object-fill rounded-lg"
              />
            </div>
            <input
              placeholder="search for the location you want"
              type="text"
              className="px-2 p-4 grow rounded-full outline-none"
            />
            <div className="rounded-full min-w-[120px]    py-3 flex border justify-center items-center space-x-1 active:scale-95 transition transform duration-200 active:bg-primaryBlue/50 cursor-pointer bg-primaryBlue">
              <button className="font-manrope text-white">search</button>
              <SlArrowRight />
            </div>
          </div>
        </div>
      </div>
      {/* all convos */}
      <div className="">
        {/* title part */}
        <div className="my-8">
          <h1 className="font-bold text-2xl">Ongoing Conversations</h1>
          <p className="text-sm opacity-80 mt-1">2 Appointments Today</p>
        </div>
        {/* here is the list */}
        <div>
          <Conversation />
        </div>
      </div>
    </div>
  );
};

export default OngoinPropertyConvo;
