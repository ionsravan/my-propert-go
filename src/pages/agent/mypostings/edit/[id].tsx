import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { toast } from "react-toastify";
import { Propery, ProperyRes } from "src/@types";
import AgentNavbar from "src/componets/Agent/AgentNavbar";
import { Input } from "src/componets/shared/sharedInput";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import { useFetch } from "src/lib/hooks/useFetch";
import { useAxios } from "src/utills/axios";

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

const Edit = () => {
  const router = useRouter();
  const id = router.query["id"];
  const { data, error, status } = useFetch<ProperyRes>(
    `property/getPropertyById/${id}`
  );
  const [name, setName] = useState("");
  const [cost, setCost] = useState<number | null>();
  const [desccription, setDescription] = useState<string>();
  const [size, setSize] = useState<number>();
  const [location, setLocation] = useState<string>("");
  const [adress, setAdress] = useState("");
  const [area, setArea] = useState("");
  const [BHKconfig, setBHKConfig] = useState<number>();
  const [formData, setFormData] = useState<ProperyRes>({} as ProperyRes);
  const instance = useAxios();

  useEffect(() => {
    if (!data?.result._id) {
      console.log("hi");
      return;
    }
    setName(data?.result?.name);
    setCost(data?.result?.cost);
    setDescription((prev) => data?.result?.description);
    setLocation((prev) => data?.result?.location.name);
    setAdress((prev) => data?.result?.address);
    setBHKConfig((prev) => data?.result?.BHKconfig);
    setSize((prev) => data?.result?.size);
    setArea((prev) => data?.result?.area.name);
  }, [data]);

  const handleSubmit = async () => {
    try {
      const res = await instance.patch("/agent/property/editProperty", {
        propertyId: data?.result?._id,
        name: name,
        cost: cost,
        description: desccription,
        size: size,
        availableFor: "Rent",
        BHKconfig: BHKconfig,
        amenities: [],
        location: location,
        locationId: data?.result?.location?.locationId,
        area: area,
        areaId: data?.result?.area?.areaId,
        address: adress,
        propertyType: "Villa",
      });
      console.log(res);
      toast("Property Edited Succesfully");
    } catch (e) {
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
        <form className=" w-[90%] mx-auto space-y-3' ">
          <div className="space-y-10">
            <Input
              showError
              placeholder="name"
              value={name}
              setValue={setName}
            />
            <Input placeholder="price" value={cost} setValue={setCost} />
            <Input
              placeholder="BHK Config ie. 4"
              value={data?.result?.BHKconfig}
              setValue={setBHKConfig}
            />
            <Input
              placeholder="location"
              value={location}
              setValue={setLocation}
            />
            <Input placeholder="area" value={area} setValue={setArea} />
            <Input placeholder="address" value={adress} setValue={setAdress} />
            <Input placeholder="size in Sqft" value={size} setValue={setSize} />
          </div>
          <textarea
            id="description"
            name="desccription"
            value={desccription}
            onChange={(e) => setDescription(e.target.value)}
            required={true}
            placeholder="Description"
            className="h-[300px] px-7 py-4 mb-10  placeholder:text-[#657795] text-sm mt-5 outline-none focus:outline-none w-full"
          ></textarea>
        </form>
        <div className="flex justify-between mb-8 ">
          <h1 className="text-black font-bold text-[22px]">Edit Property</h1>
          <button
            onClick={handleSubmit}
            className=" max-w-[120px] text-white font-medium justify-center w-full bg-[#0066FF] rounded-full py-2 flex space-x-2 items-center transition transform active:scale-95 duration-200  "
          >
            Submit
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
