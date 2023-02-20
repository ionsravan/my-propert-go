import Image from "next/image";
import { FaRupeeSign } from "react-icons/fa";
import imgs from "public.json";
import { GrStar } from "react-icons/gr";
import { Propery } from "src/@types";
import Link from "next/link";

const MediumHouseCard = ({
  propertyImages,
  name,
  BHKconfig,
  _id,
  address,
  agentId,
  cost,
}: Propery) => {
  return (
    <Link href={`/details/${_id}`}>
      <div className="min-w-[300px] md:min-w-[400px] relative max-w-sm grow  rounded-lg   font-manrope">
        <div className="relative h-64 mb-4">
          <Image
            src={propertyImages[0]}
            fill
            alt="home"
            className="object-fill rounded-lg"
          />
        </div>
        <div className="space-y-1 px-3 ">
          <h1 className="text-2xl font-semibold text-TitleColor">{name}</h1>
          <div className="flex justify-between items-end ">
            <p className="flex items-center text-primaryBlue text-lg">
              <FaRupeeSign />
              <span className="font-normal">{cost}</span>
            </p>
            <div className="flex flex-col">
              <p className="flex items-center justify-end  space-x-2 text-right">
                <GrStar className="text-yellow-500 text-xl" />
                <span className="text-xl font-medium">4.0</span>
              </p>
              <p className="text-[16px] font-medium">23 Reviews</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MediumHouseCard;
