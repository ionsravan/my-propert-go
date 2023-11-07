import Image from "next/image";
import Link from "next/link";
import React, { ReactElement, useEffect, useState } from "react";
import { AiFillStar, AiOutlineSearch } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { VscListFilter, VscTrash } from "react-icons/vsc";
import { Agent, Propery, response } from "src/@types";
import AgentNavbar from "src/componets/Agent/AgentNavbar";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import { FetchState, useFetch } from "src/lib/hooks/useFetch";
import { Button } from "src/pages/admin/customers";
import { PostingByDeveloper } from "..";
import CircularSpinner from "src/componets/circularLoader";
import PropertyCost from "src/componets/costFormat/PropertyCost";
import { useAxios } from "src/utills/axios";
import { toast } from "react-toastify";
import generateSlug from "src/componets/slug/generateSlug";

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
  cost,
  propertyImages,
  toggle,
  propertyType,
  availableFor,
  location,
  slug
}: Propery) => {
  const instance = useAxios();
  const [isPending, setIsPending] = useState(false);
  const adminValue = localStorage.getItem("isAdmin");

  // const slug = generateSlug(toggle, name, BHKconfig, propertyType, availableFor, location.name, _id);


  const handlePropertyCare = async (id: any) => {
    try {
      const requestData = { propertyId: id };
      const res = await instance.post("/user/requestCareService", requestData);

      if (res.data) {
        console.log(res.data, "reeeeee");
        setIsPending(true);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setIsPending(false);
    }
  };
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
              {/* <div className="flex  items-center px-2 space-x-1 bg-green-300 bg-opacity-40 text-green-800">
                <p>4.5</p>
                <AiFillStar />
              </div> */}
            </div>
          </div>
          <div className="flex  space-x-4">
            <Link href={adminValue == 'true' ? `/admin/property/edit/${_id}` : `/agent/mypostings/edit/${_id}`}>
              <div className="text-primaryBlue flex items-center space-x-1 self-start text-xs font-medium">
                <p>Edit</p>
                <TbEdit />
              </div>
            </Link>
            <button
              onClick={() => handlePropertyCare(_id)}
              className={`text-white flex bg-[#0066FF] rounded-full space-x-2 items-center transition transform active:scale-95 duration-200
    ${isPending ? 'opacity-70 pointer-events-none' : ''}
    h-[50px] md:h-[40px] px-[30px] md:px-[20px]`}
            >
              {isPending ? 'Pending' : 'Property Care'}
            </button>
          </div>

        </div>
        <div className=" max-w-xl py-1 w-full flex">
          <div className="">
            <p className="flex text-TitleColor text-lg items-center">
              <span className="flex items-center space-x-1 ">
                <FaRupeeSign />
                <span className="text-lg font-bold"><PropertyCost cost={cost} /></span>
              </span>
              {/* <span className="ml-1 text-xs">k</span> */}
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
const PropertyTypes = ["All", "Rent", "Sell", "PG"];

const MyPosting = () => {
  const { data, status, error } = useFetch<response<Agent>>("/user/property");
  const [selected, setSelected] = useState(PropertyTypes[0]);
  const [filtredResult, setFiltredResult] = useState<Propery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(data);
  useEffect(() => {
    if (data) {
      setFiltredResult(data?.result);
      setIsLoading(false);
    }
  }, [data]);

  if (filtredResult) {
    console.log(filtredResult, "filter")
  }

  return (
    <>
      <div className="flex justify-between w-full items-center">
        <div>
          <h2 className="text-black font-bold text-[22px]">My Property</h2>
          <p className="text-[#091E42] text-sm">
            {/* { data ? data?.result.properties.length : 0} Listings */}
            Listings
          </p>
        </div>
      </div>
      {/* <div className="space-y-3 md:space-y-0  md:flex justify-between  my-4">
        <div className="space-x-5">
          {PropertyTypes.map((t) => {
            return (
              <button
                key={t}
                onClick={() => {
                  setSelected(t);
                  if (t == "All") {
                    console.log(t);
                    data?.result.properties &&
                      setFiltredResult(() => data?.result?.properties);
                  } else if (t == "PG") {
                    data?.result?.properties &&
                      setFiltredResult(() => {
                        return data?.result?.properties.filter((item) => {
                          return item.propertyType == "pg";
                        });
                      });
                  } else if (t == "Rent") {
                    data?.result?.properties &&
                      setFiltredResult(() => {
                        return data?.result?.properties.filter((item) => {
                          return item.availableFor == "Rent";
                        });
                      });
                  } else if (t === "Sell") {
                    data?.result?.properties &&
                      setFiltredResult(() => {
                        return data?.result?.properties.filter((item) => {
                          return item.availableFor == "Sell";
                        });
                      });
                  }
                }}
                className={`${
                  selected == t
                    ? "text-primaryBlue border-primaryBlue border-b"
                    : "text-[#616161]"
                } p-2   text-xs`}
              >
                {t}
              </button>
            );
          })}
        </div>
        <div className="flex justify-between md:space-x-[12px]">
          <Button name="Filter" Icon={VscListFilter} Color="" />
          <Button name="Search" Icon={AiOutlineSearch} Color="" />
        </div>
      </div> */}

      {/* <h1 className="text-lg text-black">Leads</h1> */}
      <div className="flex space-x-[17px] mt-6 mb-8">
        <Card name="Properties" Value={filtredResult.length} />
        {/* <Card name="On Discussion" Value={8} /> */}
        {/* <Card name="Views" Value={"130k"} /> */}
      </div>

      {/* <PostingByDeveloper /> */}
      {/* <div className="w-full space-y-5   scrollbar-hide mb-8">
        {selected !== "All" && filtredResult.length == 0 ? (
          <>0 Results found for {selected}</>
        ) : (
          <></>
        )}
        {data?.result.properties.length == 0 &&
          status == FetchState.FETCHED && (
            <p className="text-xl text-black">No Properties Posted</p>
          )}
        {status === FetchState.FETCHING && <p>loading....</p>}
        {filtredResult?.map((property) => {
          return (
            <>
              <PostingCard key={property._id} {...property} />
            </>
          );
        })}
      </div> */}
      <div>
        {isLoading ? (
          <CircularSpinner />
        ) : (
          <div className="w-full space-y-5 scrollbar-hide mb-8">
            {filtredResult?.length > 0 ? (
              filtredResult.map((curElem) => {
                return <PostingCard key={curElem._id} {...curElem} />;
              })
            ) : (
              <p> No Data Available</p>
            )}
          </div>
        )}
      </div>

    </>
  );
};

MyPosting.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout Navbar={AgentNavbar}>{page}</DashBoardLayout>;
};

export default MyPosting;
