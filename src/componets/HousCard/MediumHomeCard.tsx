import Image from "next/image";
import { FaRupeeSign } from "react-icons/fa";
import imgs from "public.json";
import { GrStar } from "react-icons/gr";
import { Propery } from "src/@types";
import Link from "next/link";
import { HiLocationMarker } from "react-icons/hi";

const MediumHouseCard = ({
  propertyImages,
  name,
  BHKconfig,
  _id,
  address,
  agentId,
  cost,
  primaryImage,
  areaValue,
  size,
  location

}: Propery) => {
  const imageSource = primaryImage || (propertyImages && propertyImages[0]) || "/bighouse.png";
  return (
    <Link href={`/details/${_id}`}>
      <div className="min-w-[280px] md:min-w-[280px] relative max-w-sm grow  rounded-lg font-manrope">
        <div className="relative h-64 mb-2">
          <Image
            src={imageSource}
            fill
            alt="home"
            className="object-fill rounded-lg"
          />
        </div>
        <div className="space-y-1 px-3 ">
          <h1 className="text-2xl font-semibold text-TitleColor">{name}</h1>
          <div  className="flex justify-between items-end ">
            <div  className="flex flex-col">
              <p className="flex items-center text-md "><HiLocationMarker style={{marginRight:"5px"}} />{location.name}</p>
            <p  className="flex items-center text-primaryBlue text-lg">
              <FaRupeeSign />
              <span className="font-normal ">{cost}</span>
            </p>
            </div>
       
            <div   className="flex flex-col mb-2">
              <p  className="flex items-center justify-center   space-x-2 text-right">
                {/* <GrStar className="text-yellow-500 text-xl" /> */}
                <span className="text-md font-medium mb-1">₹{areaValue}/Sq.Yd</span>
              </p>
              <p className="text-xs font-medium ">Area:{size} Sq.Yd</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MediumHouseCard;



