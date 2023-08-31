import { atom, useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineDollar,
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineUser,
} from "react-icons/ai";
import { BsBuilding } from "react-icons/bs";
import { FaRegAddressBook, FaRupeeSign } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import {
  MdOutlineHolidayVillage,
  MdPhotoSizeSelectSmall,
} from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { toast } from "react-toastify";
import { area, location, Propery, ProperyRes, response } from "src/@types";
import AgentNavbar from "src/componets/Agent/AgentNavbar";
import { Input } from "src/componets/shared/sharedInput";
import { useAppContext } from "src/Context/AppContext";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import { useFetch } from "src/lib/hooks/useFetch";
import { useAxios } from "src/utills/axios";
import { Select } from "../../addProperty";
import { BsFillHouseFill, BsShop } from "react-icons/bs";
import { RiHome4Fill, RiBuilding4Fill } from "react-icons/ri";
import {
  MdApartment,
  MdOutlineVilla,
  MdHome,
} from "react-icons/md";
// import { HiBuildingStorefront } from "react-icons/hi";
import { GiIsland } from "react-icons/gi";
// import {
//   AiOutlineClose,
//   AiOutlineDollar,
//   AiOutlineHome,
//   AiOutlineSetting,
//   AiOutlineUser,
// } from "react-icons/ai";
import {
  // FaRegAddressBook,
  FaHome,
  FaBuilding,
  FaLandmark,
  FaWarehouse,
} from "react-icons/fa";
import {
  // MdOutlineHolidayVillage,
  // MdPhotoSizeSelectSmall,
} from "react-icons/md";
// import { area, location, response } from "src/@types";
// import { useFetch } from "src/lib/hooks/useFetch";
import styles from "../styles/addProperty.module.css";

// import { cx } from "../utills/all";
// import Image from "next/image";
import { useCookies } from "react-cookie";
import { availableAmenities } from "src/@global/Data";
import AddProperty from "src/pages/addProperty";
import generateSlug from "src/componets/slug/generateSlug";

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
  propertyType,
  toggle,
  slug
}: Propery) => {
  const instance = useAxios();
  const router = useRouter();

  // const slug = generateSlug(toggle, name, BHKconfig, propertyType, availableFor, location.name, _id);
  return (
    <div className="mb-5 bg-white rounded-lg md:flex cursor-pointer">
      {/* image section */}
      <div className="h-[160px] relative md:w-[180px]">
        <Image
          src={propertyImages[0] || "/smallb.png"}
          fill
          alt="home"
          className="rounded-l-lg object-cover"
        />
      </div>
      {/* main info part */}
      <div className="p-5 px-6 w-full">
        <div className="flex w-full justify-between">
          <div>
            <Link href={`/details/${slug}`}>
            {/* <Link href={`/details/${_id}`}> */}
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
          {/* <div className="text-red-400 flex items-center space-x-1 self-start text-xs font-medium">
            <p
              onClick={async () => {
                try {
                  const res = instance.delete(
                    "/agent/property/deleteProperty",
                    {
                      data: {
                        propertyId: _id,
                      },
                    }
                  );
                  toast("Property Deleted");
                  router.push("/agent/mypostings");
                } catch (e) {
                  toast("Some Error Accured Try Again");
                }
              }}
              className="text-sm"
            >
              Delete
            </p>
          </div> */}
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
const loadingAtom = atom(false);

const Edit = () => {
  const router = useRouter();
  const id = router.query["id"];

  
  const { data, error, status } = useFetch<ProperyRes>(
    `property/getPropertyById/${id}`
  );



  return (
    <>
      <div className="flex justify-between mb-8 ">
        <h1 className="text-black font-bold text-[22px]">Edit Property</h1>
        <button
          // onClick={handleSubmit}
          className=" max-w-[120px] text-white font-medium justify-center w-full bg-[#0066FF] rounded-full py-2 flex space-x-2 items-center transition transform active:scale-95 duration-200  "
        >
          Submit
        </button>
      </div>

      {data?.result?._id && <PostingCard {...data?.result} key={2} />}
      <div
        className={
          "mt-11 flex space-x-6 text-[#0066FF] font-semibold text-lg  "
        }
      >
        <p className="border-b py-3 border-[#0066FF]">Step 1: Genreral Info</p>
      </div>

      <AddProperty navbarFooter={false} propertyData={data?.result} isEdit={true} />

    </>
  );
};

export default Edit;

Edit.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout Navbar={AgentNavbar}>{page}</DashBoardLayout>;
};
