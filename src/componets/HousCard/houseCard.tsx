import Image from "next/image";
import { FaRupeeSign } from "react-icons/fa";
import { HomeChip } from "../Home/header";
import { BsFillDropletFill } from "react-icons/bs";
import type { Propery } from "src/@types";
import Link from "next/link";

const HouseCard = ({ name, propertyImages, cost, agentId, _id }: Propery) => {
  return (
    <Link href={`/details/${_id}`}>
      <div className=" relative  grow  rounded-2xl p-4 shadow-md border font-manrope bg-white  ">
        <div className="relative h-64 w-[300px]">
          <Image
            src={propertyImages[0] ? propertyImages[0] : "/bighouse.png"}
            fill
            alt="home"
            className="object-fill rounded-lg"
          />
        </div>
        <div className="space-y-1 mt-5">
          <h1 className="text-[22px] font-semibold text-TitleColor">
            {name.slice(0, 25)}....
          </h1>
          <p className="flex items-center text-primaryBlue text-lg font-light">
            <FaRupeeSign className="font-extralight" />
            <span>{cost}</span>
          </p>
        </div>
        <div className="flex space-x-2 items-center mt-4">
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
        </div>
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
