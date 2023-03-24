import { atom, useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineDollar,
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineUser,
} from "react-icons/ai";
import { BsBuilding } from "react-icons/bs";
import { FaRegAddressBook, FaRupeeSign } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import {
  MdOutlineHolidayVillage,
  MdPhotoSizeSelectSmall,
} from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { toast } from "react-toastify";
import { area, location, Propery, ProperyRes, response } from "src/@types";
import AgentNavbar from "src/componets/Agent/AgentNavbar";
import { Input } from "src/componets/shared/sharedInput";
import { useAppContext } from "src/Context/AppContext";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import { useFetch } from "src/lib/hooks/useFetch";
import { useAxios } from "src/utills/axios";
import { Select } from "../../addProperty";

export const PostingCard = ({
  name,
  _id,
  BHKconfig,
  size,
  address,
  agentId,
  availableFor,
  cost,
  description,
  location,
  area,
  propertyImages,
  purchaseRequests,
}: Propery) => {
  const instance = useAxios();
  const router = useRouter();
  return (
    <div className="mb-5 bg-white rounded-lg md:flex cursor-pointer">
      {/* image section */}
      <div className="h-[160px] relative md:w-[180px]">
        <Image
          src={"/smallb.png"}
          fill
          alt="home"
          className="rounded-l-lg object-cover"
        />
      </div>
      {/* main info part */}
      <div className="p-5 px-6 w-full">
        <div className="flex w-full justify-between">
          <div>
            <Link href={`/details/${_id}`}>
              <h1 className="text-xl font-bold text-TitleColor">{name}</h1>
            </Link>
            <div className="flex space-x-4 mb-4 text-sm mt-1">
              <p className="text-title ">{address}</p>
              <div className="flex  items-center px-2 space-x-1 bg-green-300 bg-opacity-40 text-green-800">
                <p>4.5</p>
                <AiFillStar />
              </div>
            </div>
          </div>
          <div className="text-red-400 flex items-center space-x-1 self-start text-xs font-medium">
            <p
              onClick={async () => {
                try {
                  const res = instance.delete(
                    "/agent/property/deleteProperty",
                    {
                      data: {
                        propertyId: _id,
                      },
                    }
                  );
                  toast("Property Deleted");
                  router.push("/agent/mypostings");
                } catch (e) {
                  toast("Some Error Accured Try Again");
                }
              }}
              className="text-sm"
            >
              Delete
            </p>
          </div>
        </div>
        <div className=" max-w-xl py-1 w-full flex">
          <div className="">
            <p className="flex text-TitleColor text-lg items-center">
              <span className="flex items-center space-x-1 ">
                <FaRupeeSign />
                <span className="text-lg font-bold">{cost}</span>
              </span>
              <span className="ml-1 text-xs">k</span>
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
const loadingAtom = atom(false);

const Edit = () => {
  const router = useRouter();
  const id = router.query["id"];
  const { data, error, status } = useFetch<ProperyRes>(
    `property/getPropertyById/${id}`
  );
  const [formData, setFormData] = useState<ProperyRes>({} as ProperyRes);
  const instance = useAxios();
  const [name, setName] = useState("");
  const [cost, setCost] = useState<number>(0);
  const [desccription, setDescription] = useState("");
  const [size, setSize] = useState<number>(0);
  const [location, setLocation] = useState<location | null>(null);
  const [adress, setAdress] = useState("");
  const [area, setArea] = useState<area | null>(null);
  const [BHKconfig, setBHKConfig] = useState<number>(0);
  const { showModal, setShowModal } = useAppContext();
  const [availableFor, setAvailableFor] = useState({ name: "Rent" });
  const [propertyType, setPropertyType] = useState({ name: "villa" });
  const [filesToupload, setFilesToUpload] = useState<any>([]);
  const [loading, setLoading] = useAtom(loadingAtom);

  useEffect(() => {
    if (!data?.result._id) {
      console.log("hi");
      return;
    }
    setName(data?.result?.name);
    setCost(data?.result?.cost);
    setDescription((prev) => data?.result?.description);
    setLocation(() => data?.result?.location);
    setAdress((prev) => data?.result?.address);
    setBHKConfig((prev) => data?.result?.BHKconfig);
    setSize((prev) => data?.result?.size);
    setArea((prev) => data?.result?.area);
  }, [data]);
  const { data: loc } = useFetch<response<location[]>>(
    "/property/location/getAllLocation"
  );
  const { data: areas } = useFetch<response<area[]>>(
    `/property/location/getAreaInLocation/${location?._id}`
  );

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await instance.patch("/agent/property/editProperty", {
        propertyId: data?.result?._id,
        name: name,
        cost: cost,
        description: desccription,
        size: size,
        availableFor: "Rent",
        BHKconfig: BHKconfig,
        amenities: [],
        location: location?.name,
        locationId: data?.result?.location?.locationId,
        area: area?.name,
        areaId: data?.result?.area?.areaId,
        address: adress,
        propertyType: "Villa",
      });
      console.log(res);
      toast("Property Edited Succesfully", {
        position: "bottom-center",
        type: "success",
      });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast("Error", {
        position: "bottom-center",
        type: "error",
      });
      console.log(e);
    }
  };
  return (
    <>
      <div className="flex justify-between mb-8 ">
        <h1 className="text-black font-bold text-[22px]">Edit Property</h1>
        <button
          onClick={handleSubmit}
          className=" max-w-[120px] text-white font-medium justify-center w-full bg-[#0066FF] rounded-full py-2 flex space-x-2 items-center transition transform active:scale-95 duration-200  "
        >
          Submit
        </button>
      </div>

      {data?.result?._id && <PostingCard {...data?.result} key={2} />}
      <div
        className={
          "mt-11 flex space-x-6 text-[#0066FF] font-semibold text-lg  "
        }
      >
        <p className="border-b py-3 border-[#0066FF]">Step 1: Genreral Info</p>
      </div>
      <div className="mt-9">
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
            <div className="flex items-center px-5  relative  w-full border bd rounded-lg">
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
            <div className="flex items-center px-5  relative  w-full border bd rounded-lg">
              <AiOutlineSetting className="text-lg text-[#2C5FC3] " />
              <Select
                options={[{ name: "Rent" }, { name: "Sell" }]}
                value={availableFor}
                setState={setAvailableFor}
              />
            </div>
            {loc?.result && (
              <div className="flex items-center px-5  relative  w-full border bd rounded-lg">
                <HiOutlineLocationMarker className="text-lg text-[#2C5FC3] " />
                <Select
                  options={loc?.result}
                  value={location}
                  setState={setLocation}
                />
              </div>
            )}

            {areas?.result && (
              <div className="flex items-center px-5  relative z-20 w-full border bd rounded-lg">
                <BsBuilding className="text-lg text-[#2C5FC3] " />
                <Select
                  options={areas?.result}
                  value={area}
                  setState={setArea}
                />
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
        <div className="flex justify-between mb-8 ">
          <h1 className="text-black font-bold text-[22px]">Edit Property</h1>
          <button
            onClick={handleSubmit}
            className=" max-w-[120px] text-white font-medium justify-center w-full bg-[#0066FF] rounded-full py-2 flex space-x-2 items-center transition transform active:scale-95 duration-200  "
          >
            {loading ? "updating" : "submit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Edit;

Edit.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout Navbar={AgentNavbar}>{page}</DashBoardLayout>;
};
