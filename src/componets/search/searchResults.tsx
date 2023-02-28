import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiFillStar } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";
import { ProperyResArr } from "src/@types";
import { useFetch } from "src/lib/hooks/useFetch";
import { Propery } from "src/@types/index";
import { useEffect } from "react";
import { useAppContext } from "src/Context/AppContext";

const HomeResult = ({
  name,
  cost,
  BHKconfig,
  description,
  propertyImages,
  size,
  _id,
}: Propery) => {
  return (
    <Link href={`/details/${_id}`}>
      <div className="mb-5 bg-white w-full  rounded-lg flex flex-col md:flex-row cursor-pointer">
        {/* image section */}
        <div className="min-h-[340px] relative md:w-[300px] p-3">
          <Image
            src={propertyImages[0]}
            fill
            alt="home"
            className="rounded-l-lg object-cover"
          />
        </div>
        {/* main info part */}
        <div className=" p-2 md:p-5 w-full">
          <div className="">
            <h1 className=" text-xl md:text-2xl font-bold text-TitleColor">
              {name}
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
                  <span className=" text-sm md:text-lg font-bold">{cost}</span>
                </span>
                <span className="ml-1 text-xs">K</span>
              </p>
              <p className="text-black md:block hidden opacity-40 text-xs md:text-sm">
                Onwards
              </p>
            </div>
            <div className=" flex flex-col items-center grow ">
              <div>
                <p className="flex text-TitleColor  items-center">
                  <span className="flex items-center space-x-1 ">
                    <span className=" text-sm md:text-lg font-bold">
                      {size}
                    </span>
                  </span>
                  <span className="ml-1 text-xs">sq ft</span>
                </p>
                <p className="text-black opacity-40 md:block hidden text-xs  md:text-sm">
                  ({size}) Super built-up Area
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p className="flex text-TitleColor text-lg items-center">
                <span className="flex items-center space-x-1 ">
                  <span className="text-sm md:text-lg font-bold">
                    {BHKconfig}BHK
                  </span>
                </span>
                <span className="ml-1 text-xs"></span>
              </p>
              <p className="text-black opacity-40 text-sm hidden md:block">
                {BHKconfig} Baths
              </p>
            </div>
          </div>
          <div className="py-4 border-b border-[#EBECF0] max-w-2xl">
            <p className="text-xs leading-relaxed">
              {description}...
              <span className="text-primaryBlue ml-9">learn more</span>
            </p>
          </div>
          <div className="w-full items-center md:flex justify-between mt-4">
            <div>
              <div className="flex space-x-4 text-sm  ">
                <button className="bg-green-400 bg-opacity-50 px-2 p-1 text-xs md:text-sm ">
                  NO BROKERAGE
                </button>
                <button className="bg-[#EBECF0] px-2 p-1">READY MOVE</button>
                <button className="bg-[#EBECF0] px-2 p-1">NEW BOOKING</button>
              </div>
            </div>
            <div className="md:mt-0 mt-4">
              <button className="  bg-primaryBlue px-7  text-white   py-2 rounded-sm shadow-sm  hover:opacity-95 active:scale-95 transition transform duration-200 ease-out w-full  ">
                Contact Builder
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
interface Props {
  data: Propery[] | undefined | null;
}

const SearchResult = ({ data }: Props) => {
  const { setResCount } = useAppContext();

  useEffect(() => {
    if (data) {
      setResCount(data?.length);
    }
  }, [data]);
  return (
    <div className="  w-full overflow-hidden p-2">
      {data?.map((prop) => {
        return <HomeResult key={prop._id} {...prop} />;
      })}
    </div>
  );
};

export default SearchResult;
