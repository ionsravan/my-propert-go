import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiFillStar } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";
import { ProperyResArr } from "src/@types";
import { useFetch } from "src/lib/hooks/useFetch";
import { Propery } from "src/@types/index";
import { useEffect, useState } from "react";
import { useAppContext } from "src/Context/AppContext";
import { useFilterContext } from "src/pages/search/[query]/[name]";
import PropertyCost from "../costFormat/PropertyCost";
import generateSlug from "../slug/generateSlug";

const HomeResult = ({
  name,
  cost,
  BHKconfig,
  description,
  propertyImages,
  size,
  toggle,
  _id,
  availableFor,
  location,
  propertyType,
  propertyTags,
  status,
  agentId
}: Propery) => {

  const slug = generateSlug(toggle, name, BHKconfig, propertyType, availableFor, location.name, _id);
  return <>

    {(toggle === "Project" && status === "active") ? (
      <Link href={`/details/${slug}`}>
        <div
          style={{ height: "500px", position: "relative" }}
          className={`mb-5 w-full   rounded-lg flex flex-col md:flex-row cursor-pointer bg-gray-50 `}
        >

          <div className="min-h-[340px] relative md:w-[400px] p-3">
            <Image
              src={propertyImages[0] || "/bighouse.png"}
              fill
              alt="home"
              className="rounded-l-lg object-cover"
            />
          </div>

          <div className=" p-2 md:p-5 w-full">
            <div className="">
              <h1 className=" text-xl md:text-4xl font-bold text-TitleColor">
                {name}
              </h1>
              <div className="flex flex-col  mb-4 text-sm mt-1">
                <p className="text-title text-lg mt-4 ">          {`${BHKconfig}Bhk ${propertyType} for ${availableFor}  `}</p>
                {/* <p className="text-title ">Nearby : Kenedy High The Global Schoold</p> */}
                <p className="text-title text-3xl font-bold mt-4 "> ₹<PropertyCost cost={cost} /></p>

              </div>
            </div>
            <div className=" border-b border-[#EBECF0] max-w-2xl">
              <p className="text-lg leading-relaxed">
                {description.slice(0, 400)}...
                <span className="text-primaryBlue ml-9">learn more</span>
              </p>
            </div>
            {agentId ? (
              <div className="absolute left-2 top-2">
                <p className="bg-primaryBlue text-white px-3 py-2 rounded-3xl">{agentId.plan.planId.tags[0]}</p>
              </div>
            ) : null}

            <div className="w-full mt-8 items-center md:flex justify-center ">
              <div>


                <div className="flex space-x-4 text-sm">
                  {(propertyTags && propertyTags.length > 0) ? (
                    (propertyTags).map((tag, index) => (
                      <button
                        key={index}
                        className={`${index === 0 ? "bg-green-400 bg-opacity-50" : "bg-[#EBECF0]"
                          } px-4 p-2 ${index === 0 ? "text-xs" : "md:text-sm"} rounded-lg`}
                      >
                        {tag}
                      </button>
                    ))
                  ) : (
                    <>
                      <button className="bg-green-400 bg-opacity-50 px-4 p-2 text-xs md:text-sm rounded-lg">
                        NO BROKERAGE
                      </button>
                      <button className="bg-[#EBECF0] px-4 p-2 rounded-lg">
                        READY MOVE
                      </button>
                      <button className="bg-[#EBECF0] px-4 p-2 rounded-lg">
                        NEW BOOKING
                      </button>
                    </>
                  )}
                </div>

              </div>
            </div>
            <div className="my-8 flex justify-end">
              <button className="bg-primaryBlue px-7 text-white py-2 rounded-xl shadow-sm hover:opacity-95 active:scale-95 transition transform duration-200 ease-out">
                Contact Builder
              </button>
            </div>

          </div>
        </div>
      </Link>
    ) : (toggle === "Property" && status === "active") ? (
      <Link href={`/details/${slug}`}>
        <div
          style={{ position: "relative" }}
          className={`mb-5 w-full  rounded-lg flex flex-col md:flex-row cursor-pointer bg-gray-50
           `}
        >

          <div className="min-h-[340px] relative md:w-[300px] p-3">
            <Image
              src={propertyImages[0] || "/bighouse.png"}
              fill
              alt="home"
              className="rounded-l-lg object-cover"
            />
          </div>

          <div className=" p-2 md:p-5 w-full">
            <div className="">
              <h1 className=" text-xl md:text-2xl font-bold text-TitleColor">
                {/* {name} */}
                {`${BHKconfig}Bhk ${propertyType} for ${availableFor}  `}
              </h1>
              <div className="flex space-x-4 mb-4 text-sm mt-1">
                <p className="text-title ">{name}</p>
                <div className="flex  items-center px-2 space-x-1 bg-green-300 bg-opacity-40 text-green-800">
                  <p>4.5</p>
                  <AiFillStar />
                </div>
              </div>
            </div>
            <div className=" max-w-xl py-1 w-full flex justify-between">
              <div className="">
                <p className="flex text-TitleColor text-lg items-center">
                  <span className="flex items-center space-x-1 ">
                    <FaRupeeSign />
                    <span className=" text-sm md:text-lg font-bold"><PropertyCost cost={cost} /></span>
                  </span>
                  <span className="ml-1 text-xs">K</span>
                </p>
                <p className="text-black md:block hidden opacity-40 text-xs md:text-sm">
                  Onwards
                </p>
              </div>
              <div className=" flex flex-col items-center border-r border-r-gray-400  px-8 border-l border-l-gray-400">
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
                {description.slice(0, 400)}...
                <span className="text-primaryBlue ml-9">learn more</span>
              </p>
            </div>
            {agentId ? (
              <div className="absolute left-2 top-2">
                <p className="bg-primaryBlue text-white px-3 py-2 rounded-3xl">{agentId.plan.planId.tags[0]}</p>
              </div>
            ) : null}

            <div className="w-full items-center md:flex justify-between mt-4">
              <div>
                <div className="flex space-x-4 text-sm">
                  {(propertyTags && propertyTags.length > 0) ? (
                    propertyTags.map((tag, index) => (
                      <button
                        key={index}
                        className={`${index === 0 ? "bg-green-400 bg-opacity-50" : "bg-[#EBECF0]"
                          } px-4 p-2 ${index === 0 ? "text-xs" : "md:text-sm"} rounded-lg`}
                      >
                        {tag}
                      </button>
                    ))
                  ) : (
                    <>
                      <button className="bg-green-400 bg-opacity-50 px-4 p-2 text-xs md:text-sm rounded-lg">
                        NO BROKERAGE
                      </button>
                      <button className="bg-[#EBECF0] px-4 p-2 rounded-lg">
                        READY MOVE
                      </button>
                      <button className="bg-[#EBECF0] px-4 p-2 rounded-lg">
                        NEW BOOKING
                      </button>
                    </>
                  )}
                </div>

              </div>
              <div className="md:mt-0 mt-4">
                <button className="  bg-primaryBlue px-7  text-white   py-2 rounded-xl shadow-sm  hover:opacity-95 active:scale-95 transition transform duration-200 ease-out w-full  ">
                  Contact Builder
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    ) : (

      // <Link href={`/details/${slug}`}>
      //   <div

      //     className={`mb-5 w-full  rounded-lg flex flex-col md:flex-row cursor-pointer bg-gray-50
      //      `}
      //   >

      //     <div className="min-h-[340px] relative md:w-[300px] p-3">
      //       <Image
      //         src={propertyImages[0] || "/bighouse.png"}
      //         fill
      //         alt="home"
      //         className="rounded-l-lg object-cover"
      //       />
      //     </div>

      //     <div className=" p-2 md:p-5 w-full">
      //       <div className="">
      //         <h1 className=" text-xl md:text-2xl font-bold text-TitleColor">

      //           {`${BHKconfig}Bhk ${propertyType} for ${availableFor}  `}
      //         </h1>
      //         <div className="flex space-x-4 mb-4 text-sm mt-1">
      //           <p className="text-title ">{name}</p>
      //           <div className="flex  items-center px-2 space-x-1 bg-green-300 bg-opacity-40 text-green-800">
      //             <p>4.5</p>
      //             <AiFillStar />
      //           </div>
      //         </div>
      //       </div>
      //       <div className=" max-w-xl py-1 w-full flex justify-between">
      //         <div className="">
      //           <p className="flex text-TitleColor text-lg items-center">
      //             <span className="flex items-center space-x-1 ">
      //               <FaRupeeSign />
      //               <span className=" text-sm md:text-lg font-bold"><PropertyCost cost={cost} /></span>
      //             </span>
      //             <span className="ml-1 text-xs">K</span>
      //           </p>
      //           <p className="text-black md:block hidden opacity-40 text-xs md:text-sm">
      //             Onwards
      //           </p>
      //         </div>
      //         <div className=" flex flex-col items-center border-r border-r-gray-400  px-8 border-l border-l-gray-400">
      //           <div>
      //             <p className="flex text-TitleColor  items-center">
      //               <span className="flex items-center space-x-1 ">
      //                 <span className=" text-sm md:text-lg font-bold">
      //                   {size}
      //                 </span>
      //               </span>
      //               <span className="ml-1 text-xs">sq ft</span>
      //             </p>
      //             <p className="text-black opacity-40 md:block hidden text-xs  md:text-sm">
      //               ({size}) Super built-up Area
      //             </p>
      //           </div>
      //         </div>
      //         <div className="flex flex-col items-center">
      //           <p className="flex text-TitleColor text-lg items-center">
      //             <span className="flex items-center space-x-1 ">
      //               <span className="text-sm md:text-lg font-bold">
      //                 {BHKconfig}BHK
      //               </span>
      //             </span>
      //             <span className="ml-1 text-xs"></span>
      //           </p>
      //           <p className="text-black opacity-40 text-sm hidden md:block">
      //             {BHKconfig} Baths
      //           </p>
      //         </div>
      //       </div>
      //       <div className="py-4 border-b border-[#EBECF0] max-w-2xl">
      //         <p className="text-xs leading-relaxed">
      //           {description.slice(0, 400)}...
      //           <span className="text-primaryBlue ml-9">learn more</span>
      //         </p>
      //       </div>
      //       <div className="w-full items-center md:flex justify-between mt-4">
      //         <div>
      //           <div className="flex space-x-4 text-sm">
      //             {(propertyTags && propertyTags.length > 0) ? (
      //               propertyTags.map((tag, index) => (
      //                 <button
      //                   key={index}
      //                   className={`${index === 0 ? "bg-green-400 bg-opacity-50" : "bg-[#EBECF0]"
      //                     } px-4 p-2 ${index === 0 ? "text-xs" : "md:text-sm"} rounded-lg`}
      //                 >
      //                   {tag}
      //                 </button>
      //               ))
      //             ) : (
      //               <>
      //                 <button className="bg-green-400 bg-opacity-50 px-4 p-2 text-xs md:text-sm rounded-lg">
      //                   NO BROKERAGE
      //                 </button>
      //                 <button className="bg-[#EBECF0] px-4 p-2 rounded-lg">
      //                   READY MOVE
      //                 </button>
      //                 <button className="bg-[#EBECF0] px-4 p-2 rounded-lg">
      //                   NEW BOOKING
      //                 </button>
      //               </>
      //             )}
      //           </div>

      //         </div>
      //         <div className="md:mt-0 mt-4">
      //           <button className="  bg-primaryBlue px-7  text-white   py-2 rounded-xl shadow-sm  hover:opacity-95 active:scale-95 transition transform duration-200 ease-out w-full  ">
      //             Contact Builder
      //           </button>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </Link>

      null)}








  </>
};
interface Props {
  data: Propery[] | undefined | null;
}

const SearchResult = ({ data }: Props) => {
  const { setResCount } = useAppContext();
  const [filteredSeach, setFilterdSearch] = useState(data);
  const { searchFilter, setsearcheFilter } = useAppContext();
  const { selected } = useFilterContext();

  useEffect(() => {
    if (filteredSeach) {
      setResCount(filteredSeach?.length);
    }
  }, [filteredSeach]);

  useEffect(() => {
    if (searchFilter == "all") {
      if (data) {
        setFilterdSearch(data);
      }
    } else {
      setFilterdSearch((prev) => {
        const arr = data?.filter((p) => {
          console.log(searchFilter == p.propertyType);
          return p.propertyType == searchFilter;
        });
        return arr as Propery[];
      });
    }
  }, [searchFilter, data]);


  return (
    <div className=" w-full overflow-hidden p-2">
      {filteredSeach?.map((prop) => {
        return <HomeResult key={prop._id} {...prop} />;
      })}
    </div>
  );
};

export default SearchResult;
