import Image from "next/image";
import { FaRupeeSign } from "react-icons/fa";

const SuggestionCard = () => {
  return (
    <div className=" w-full  flex flex-col items-center space-y-3">
      <div className=" p-1 border-2 border-primaryBlue rounded-full w-max">
        <div className="h-[102px] w-[102px]  relative rounded-full">
          <Image
            src={"/home.png"}
            fill
            className="object-fill rounded-full"
            alt="villa4"
          />
        </div>
      </div>
      <div className="text-TitleColor ">
        <h1 className="text-xs font-normal">SLV Central Park</h1>
        <p className="text-[11px] opacity-60">Whitefield, Banglore</p>
        <div className=" text-xs flex opacity-70 text-[#42526E] items-center">
          <p>
            <FaRupeeSign />
          </p>
          <p>62-70.12 Lac</p>
        </div>
      </div>
    </div>
  );
};

const SearchHeaderSuggestions = () => {
  return (
    <div className="p-4 w-full border min-h-[200px] bg-white shadow-sm">
      <div className="">
        <h1 className="text-2xl text-TitleColor font-bold">
          Big Projects in Banglore
        </h1>
        <p className="text-sm text-TitleColor opacity-80">
          inspired by your serach perferences
        </p>
      </div>
      <div className="px-3 mt-5 flex space-x-5 overflow-scroll scrollbar-hide  ">
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
      </div>
    </div>
  );
};

export default SearchHeaderSuggestions;
