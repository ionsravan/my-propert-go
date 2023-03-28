import { AxiosInstance } from "axios";
import Image from "next/image";
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
} from "react";
import { toast } from "react-toastify";
import { Agent, location, response, area, AvailableFor } from "src/@types";
import AgentNavbar from "src/componets/Agent/AgentNavbar";
import { useAppContext } from "src/Context/AppContext";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import { useFetch } from "src/lib/hooks/useFetch";
import { useAxios } from "src/utills/axios";

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

const SuggestionCard = () => {
  return (
    <div className="flex flex-col items-center space-y-3  p-5   relative">
      <div className=" p-1 border-2 border-primaryBlue rounded-full w-max  flex justify-center  ">
        <div className="h-[86px] w-[86px]  relative rounded-full">
          <Image
            src={"/home.png"}
            fill
            className="object-fill rounded-full"
            alt="villa4"
          />
        </div>
        <div className="bg-[#2E5CA0] flex justify-center items-center absolute p-1 px-2  z-20 top-2  ">
          <p className="text-white text-xs">9</p>
        </div>
      </div>
      <div className="text-TitleColor ">
        <h1 className="text-sm  font-normal">SLV Central Park</h1>
        <p className="text-[11px] opacity-60 text-[#8993A4]">
          Whitefield, Banglore
        </p>
      </div>
    </div>
  );
};

export const PostingByDeveloper = () => {
  return (
    <>
      {" "}
      <div className="">
        <div className="bg-white rounded-sm mb-9 p-6 relative ">
          <div className="flex justify-between">
            <div>
              <h1 className="text-sm md:text-[19px] font-bold text-TitleColor ">
                My Postings by Developers
              </h1>
              <p className="text-xs md:text-sm text-[#888888] font-normal ">
                Inspired by your search preferences
              </p>
            </div>
            <button className="text-primaryBlue text-xs md:text-lg font-normal">
              view All
            </button>
          </div>
          <div className="flex mt-8 space-x-5 overflow-scroll">
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
          </div>
        </div>
      </div>
    </>
  );
};

export const addProperty = async (
  instance: AxiosInstance,
  name: string,
  cost: string,
  desccription: string,
  size: string,
  availableFor: AvailableFor,
  BHKconfig: string,
  amenities: string[],
  location: location | null,
  area: area | null,
  adress: string,
  propertyType: AvailableFor,
  files: any,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  const data = new FormData();
  if (location?.name && location._id && area?.name && area?._id) {
    data.append("name", name);
    data.append("cost", cost);
    data.append("description", desccription);
    data.append("size", size);
    data.append("availableFor", availableFor.name);
    data.append("BHKconfig", BHKconfig);
    data.append("amenities", JSON.stringify(amenities));
    data.append("location", location?.name);
    data.append("locationId", location?._id);
    data.append("area", area?.name);
    data.append("areaId", area?._id);
    data.append("address", adress);
    data.append("propertyType", propertyType?.name);
    Array.from(files).forEach((file: any) => {
      data.append("photos", file);
    });
  }
  try {
    setLoading(true);
    const res = await instance.post("/agent/property/addProperty", data);
    setLoading(false);
    return res;
  } catch (e) {
    toast("Error while adding property", {
      position: "bottom-center",
      type: "error",
    });
    console.log(e);
    setLoading(false);
    return null;
  }
};

const AgentDashBoard = () => {
  const { data, error } = useFetch<response<Agent>>("/agent/property");

  const { setAgentId } = useAppContext();
  useEffect(() => {
    if (data) {
      setAgentId(data?.result?._id);
    }
  }, [data]);
  return (
    <>
      <div className="flex justify-between w-full items-center font-manrope">
        <div>
          <h1 className="text-[#707EAE] text-[10.94px]">broker</h1>
          <h2 className="text-TitleColor font-bold text-[26px]">
            Hello {data?.result?.name}
          </h2>
        </div>
      </div>
      <div className="flex space-x-[17px] mt-6 mb-8">
        <Card name="Properties" Value={18} />
        <Card name="On Discussion" Value={8} />
        <Card name="Views" Value={"130k"} />
      </div>
      <div className="mb-8">
        <h1 className="text-black text-lg">Leads</h1>
        <div className="flex space-x-[17px] mt-5">
          <Card name="Properties" Value={18} />
          <Card name="On Discussion" Value={8} />
          <Card name="Views" Value={"130k"} />
        </div>
      </div>
      <PostingByDeveloper />
    </>
  );
};

AgentDashBoard.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout Navbar={AgentNavbar}>{page}</DashBoardLayout>;
};

export default AgentDashBoard;
