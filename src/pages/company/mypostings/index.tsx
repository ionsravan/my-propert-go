import Image from "next/image";
import Link from "next/link";
import React, { ReactElement } from "react";
import { AiFillStar, AiOutlineSearch } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { VscListFilter, VscTrash } from "react-icons/vsc";
import SideNav from "src/componets/company/companyNavbar";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import { Button } from "src/pages/admin/customers";

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

export const PostingCard = () => {
  return (
    <div className="mb-5 bg-white rounded-lg flex cursor-pointer">
      {/* image section */}
      <div className="h-[160px] relative w-[180px]">
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
          <Link href={"/company/mypostings/edit"}>
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
                <span className="text-lg font-bold">2.9</span>
              </span>
              <span className="ml-1 text-xs">Cr</span>
            </p>
            <p className="text-black opacity-40 text-sm">Onwards</p>
          </div>
          <div className=" flex flex-col items-center grow ">
            <div>
              <p className="flex text-TitleColor text-lg items-center">
                <span className="flex items-center space-x-1 ">
                  <span className="text-lg font-bold">2,800-2,870</span>
                </span>
                <span className="ml-1 text-xs">sq ft</span>
              </p>
              <p className="text-black opacity-40 text-sm">
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
            <p className="text-black opacity-40 text-sm">4 Baths</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyPosting = () => {
  return (
    <>
      <div className="flex justify-between w-full items-center">
        <div>
          <h2 className="text-black font-bold text-[22px]">My Property</h2>
          <p className="text-[#091E42] text-sm">21 Listings</p>
        </div>
      </div>
      <div className="flex justify-between  my-4">
        <div className="space-x-5">
          <button className="text-primaryBlue p-2 border-b border-primaryBlue text-xs">
            All
          </button>
          <button className="text-[#616161] text-xs">Ready to Move</button>
          <button className="text-[#616161] text-xs">Under Construction</button>
          <button className="text-[#616161] text-xs">
            Possession by 2 -3 Years
          </button>
        </div>
        <div className="flex space-x-[12px]">
          <Button name="Filter" Icon={VscListFilter} Color="" />
          <Button name="Search" Icon={AiOutlineSearch} Color="" />
          <Button name="Edit" Icon={TbEdit} Color="text-primaryBlue" />
          <Button name="delete" Icon={VscTrash} Color="text-red-400" />
        </div>
      </div>
      <div className="flex space-x-[17px] mt-6 mb-8">
        <Card name="Properties" Value={18} />
        <Card name="On Discussion" Value={8} />
        <Card name="Views" Value={"130k"} />
      </div>

      <div className="w-full space-y-5  overflow-scroll scrollbar-hide mb-8">
        <PostingCard />
        <PostingCard />
        <PostingCard />
        <PostingCard />
      </div>
    </>
  );
};

MyPosting.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout Navbar={SideNav}>{page}</DashBoardLayout>;
};

export default MyPosting;
