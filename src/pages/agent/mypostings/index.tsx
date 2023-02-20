import Image from "next/image";
import Link from "next/link";
import React, { ReactElement } from "react";
import { AiFillStar, AiOutlineSearch } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { VscListFilter, VscTrash } from "react-icons/vsc";
import { Agent, Propery, response } from "src/@types";
import AgentNavbar from "src/componets/Agent/AgentNavbar";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import { useFetch } from "src/lib/hooks/useFetch";
import { Button } from "src/pages/admin/customers";
import { PostingByDeveloper } from "..";

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

export const PostingCard = ({
  name,
  _id,
  BHKconfig,
  size,
  address,
  agentId,
  availableFor,
  cost,
  description,
  location,
  area,
  propertyImages,
  purchaseRequests,
}: Propery) => {
  return (
    <div className="mb-5 bg-white rounded-lg md:flex cursor-pointer">
      {/* image section */}
      <div className="h-[160px] relative md:w-[180px]">
        <Image
          src={"/smallb.png"}
          fill
          alt="home"
          className="rounded-l-lg object-cover"
        />
      </div>
      {/* main info part */}
      <div className="p-5 px-6 w-full">
        <div className="flex w-full justify-between">
          <div>
            <Link href={`/details/${_id}`}>
              <h1 className="text-xl font-bold text-TitleColor">{name}</h1>
            </Link>
            <div className="flex space-x-4 mb-4 text-sm mt-1">
              <p className="text-title ">{address}</p>
              <div className="flex  items-center px-2 space-x-1 bg-green-300 bg-opacity-40 text-green-800">
                <p>4.5</p>
                <AiFillStar />
              </div>
            </div>
          </div>
          <Link href={`/agent/mypostings/edit/${_id}`}>
            <div className="text-primaryBlue flex items-center space-x-1 self-start text-xs font-medium">
              <p>Edit</p>
              <TbEdit />
            </div>
          </Link>
        </div>
        <div className=" max-w-xl py-1 w-full flex">
          <div className="">
            <p className="flex text-TitleColor text-lg items-center">
              <span className="flex items-center space-x-1 ">
                <FaRupeeSign />
                <span className="text-lg font-bold">{cost}</span>
              </span>
              <span className="ml-1 text-xs">k</span>
            </p>
            <p className="text-black opacity-40 text-sm hidden md:block">
              Onwards
            </p>
          </div>
          <div className=" flex flex-col items-center grow ">
            <div>
              <p className="flex text-TitleColor text-lg items-center">
                <span className="flex items-center space-x-1 ">
                  <span className="text-lg font-bold">{size}</span>
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
                <span className="text-lg font-bold">{BHKconfig}BHK</span>
              </span>
              <span className="ml-1 text-xs"></span>
            </p>
            <p className="text-black opacity-40 text-sm hidden md:block">
              {BHKconfig} Baths
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyPosting = () => {
  const { data } = useFetch<response<Agent>>("/agent/property");
  console.log(data);
  return (
    <>
      <div className="flex justify-between w-full items-center">
        <div>
          <h2 className="text-black font-bold text-[22px]">My Property</h2>
          <p className="text-[#091E42] text-sm">
            {data?.result.properties.length} Listings
          </p>
        </div>
      </div>
      <div className="space-y-3 md:space-y-0  md:flex justify-between  my-4">
        <div className="space-x-5">
          <button className="text-primaryBlue p-2 border-b border-primaryBlue text-xs">
            All
          </button>
          <button className="text-[#616161] text-xs">Rent</button>
          <button className="text-[#616161] text-xs">Buy/Sell</button>
          <button className="text-[#616161] text-xs">pG</button>
        </div>
        <div className="flex justify-between md:space-x-[12px]">
          <Button name="Filter" Icon={VscListFilter} Color="" />
          <Button name="Search" Icon={AiOutlineSearch} Color="" />
        </div>
      </div>
      <h1 className="text-lg text-black">Leads</h1>
      <div className="flex space-x-[17px] mt-6 mb-8">
        <Card name="Properties" Value={18} />
        <Card name="On Discussion" Value={8} />
        <Card name="Views" Value={"130k"} />
      </div>

      <PostingByDeveloper />
      <div className="w-full space-y-5  overflow-scroll scrollbar-hide mb-8">
        {data?.result?.properties.map((property) => {
          return <PostingCard key={property._id} {...property} />;
        })}
      </div>
    </>
  );
};

MyPosting.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout Navbar={AgentNavbar}>{page}</DashBoardLayout>;
};

export default MyPosting;
