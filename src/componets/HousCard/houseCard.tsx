import Image from "next/image";
import { FaRupeeSign } from "react-icons/fa";
import { HomeChip } from "../Home/header";
import { BsFillDropletFill } from "react-icons/bs";
import type { Propery } from "src/@types";
import Link from "next/link";
import { HiLocationMarker } from "react-icons/hi";
import PropertyCost from "../costFormat/PropertyCost";
import generateSlug from "../slug/generateSlug";

const HouseCard = ({ name, propertyImages, cost, agentId, _id, location, size, areaValue, BHKconfig, availableFor, toggle, propertyType,slug }: Propery) => {

  // const slug = generateSlug(toggle, name, BHKconfig, propertyType, availableFor, location.name, _id);

  return (
    // <Link href={`/details/${_id}`}>
   <Link href={`/details/${slug}`}>
      <div className=" relative  grow  rounded-2xl p-4 shadow-md border font-manrope bg-white  ">
        <div className="relative h-64 w-[300px]">
          <Image
            src={propertyImages[0] ? propertyImages[0] : "/bighouse.png"}
            fill
            alt="home"
            className="object-fill rounded-lg"
          />
        </div>
        {/* <div style={{border:"2px solid red"}} className="space-y-1 mt-5">
          <h1 className="text-[22px] font-semibold text-TitleColor">
            {name.slice(0, 25)}....
          </h1>
          <p className="flex items-center text-primaryBlue text-lg font-light">
            <FaRupeeSign className="font-extralight" />
            <span>{cost}</span>
          </p>
        </div> */}

        <div className="space-y-1 px-3 mt-2 ">
          <h1 className="text-2xl font-semibold text-TitleColor">{name}</h1>
          <div className="flex justify-between items-end ">
            <div className="flex flex-col">
              <p className="flex items-center text-md "><HiLocationMarker style={{ marginRight: "5px" }} />{location.name}</p>
              <p className="flex items-center text-primaryBlue text-lg">
                <FaRupeeSign />
                <span className="font-normal "><PropertyCost cost={cost} /></span>
              </p>
            </div>

            <div className="flex flex-col mb-2">
              <p className="flex items-center justify-center   space-x-2 text-right">
                {/* <GrStar className="text-yellow-500 text-xl" /> */}
                <span className="text-md font-medium mb-1">₹{areaValue}/Sq.Yd</span>
              </p>
              <p className="text-xs font-medium ">Area:{size} Sq.Yd</p>
            </div>
          </div>
        </div>

        {/* <div className="flex space-x-2 items-center mt-0">
          <div className="relative h-10 w-10 rounded-full ">
            <Image
              src={"/agent.png"}
              fill
              alt="home"
              className="object-fill rounded-full "
            />
          </div>
          <div className="font-manrope">
            <p className="text-TitleColor">Danniel Russel</p>
            <p className="text-sm text-locColor font-manrope">
              Manchester kentecy
            </p>
          </div>
        </div> */}
        <div className="absolute top-6 right-4 md:right-6 ">
          <HomeChip
            bg="bg-white"
            textColor="text-green-500"
            Icon={BsFillDropletFill}
            text="popular"
          />
        </div>
      </div>
    </Link>
  );
};

export default HouseCard;
