import { ReactElement, useState } from "react";
import {
  AiOutlineDollar,
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineUser,
} from "react-icons/ai";
import { BsBuilding } from "react-icons/bs";
import { FaRegAddressBook } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import {
  MdOutlineHolidayVillage,
  MdPhotoSizeSelectSmall,
} from "react-icons/md";
import { area, location, response } from "src/@types";
import SideNav from "src/componets/company/companyNavbar";
import { Input } from "src/componets/shared/sharedInput";
import { useAppContext } from "src/Context/AppContext";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import { useFetch } from "src/lib/hooks/useFetch";
import { Select } from "src/pages/agent/addProperty";
import { useAxios } from "src/utills/axios";
import { PostingCard } from ".";
interface InputProps {
  name?: string;
  placholder?: string;
  value?: string;
}

const Edit = () => {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [desccription, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [location, setLocation] = useState<location | null>(null);
  const [adress, setAdress] = useState("");
  const [area, setArea] = useState<area | null>(null);
  const [BHKconfig, setBHKConfig] = useState<string>("1");
  const instance = useAxios();
  const { showModal, setShowModal } = useAppContext();
  const [availableFor, setAvailableFor] = useState({ name: "Rent" });
  const [propertyType, setPropertyType] = useState({ name: "villa" });
  const [filesToupload, setFilesToUpload] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const { data: loc } = useFetch<response<location[]>>(
    "/property/location/getAllLocation"
  );
  const { data, error } = useFetch<response<area[]>>(
    `/property/location/getAreaInLocation/${location?._id}`
  );
  return (
    <>
      <div className="flex justify-between mb-8 ">
        <h1 className="text-black font-bold text-[22px]">Edit Property</h1>
        <button className=" max-w-[120px] text-white font-medium justify-center w-full bg-[#0066FF] rounded-full py-2 flex space-x-2 items-center transition transform active:scale-95 duration-200  ">
          Submit
        </button>
      </div>
      <PostingCard />
      <div
        className={
          "mt-11 flex space-x-6 text-[#0066FF] font-semibold text-lg  "
        }
      >
        <p className="border-b py-3 border-[#0066FF]">Step 1: Genreral Info</p>
      </div>
      <form className=" w-[90%] mx-auto space-y-6' ">
        <div className="space-y-10">
          <Input
            Icon={AiOutlineUser}
            placeholder="name"
            value={name}
            setValue={setName}
          />
          <Input
            Icon={AiOutlineDollar}
            placeholder="price"
            value={cost}
            setValue={setCost}
          />
          <Input
            Icon={AiOutlineHome}
            placeholder="BHK Config ie. 4"
            value={BHKconfig}
            setValue={setBHKConfig}
          />
          <div className="flex items-center px-5  relative z-50 w-full border bd rounded-lg">
            <MdOutlineHolidayVillage className="text-lg text-[#2C5FC3] " />
            <Select
              options={[
                { name: "villa" },
                { name: "pg" },
                { name: "appartment" },
              ]}
              value={propertyType}
              setState={setPropertyType}
            />
          </div>
          <div className="flex items-center px-5  relative z-40 w-full border bd rounded-lg">
            <AiOutlineSetting className="text-lg text-[#2C5FC3] " />
            <Select
              options={[{ name: "Rent" }, { name: "Sell" }]}
              value={availableFor}
              setState={setAvailableFor}
            />
          </div>
          {loc?.result && (
            <div className="flex items-center px-5  relative z-30 w-full border bd rounded-lg">
              <HiOutlineLocationMarker className="text-lg text-[#2C5FC3] " />
              <Select
                options={loc?.result}
                value={location}
                setState={setLocation}
              />
            </div>
          )}

          {data?.result && (
            <div className="flex items-center px-5  relative z-20 w-full border bd rounded-lg">
              <BsBuilding className="text-lg text-[#2C5FC3] " />
              <Select options={data?.result} value={area} setState={setArea} />
            </div>
          )}
          <Input
            Icon={FaRegAddressBook}
            placeholder="address"
            value={adress}
            setValue={setAdress}
          />
          <Input
            Icon={MdPhotoSizeSelectSmall}
            placeholder="size in Sqft"
            value={size}
            setValue={setSize}
          />
        </div>
        <textarea
          id="description"
          name="desccription"
          value={desccription}
          onChange={(e) => setDescription(e.target.value)}
          required={true}
          placeholder="Add  description"
          className="focus:outline-none  w-full h-52 px-3 mt-5 py-2 border  my-4"
        />
      </form>
    </>
  );
};

export default Edit;

Edit.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout Navbar={SideNav}>{page}</DashBoardLayout>;
};
