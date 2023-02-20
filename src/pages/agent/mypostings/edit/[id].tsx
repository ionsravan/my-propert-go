import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { ProperyRes } from "src/@types";
import AgentNavbar from "src/componets/Agent/AgentNavbar";
import { useAppContext } from "src/Context/AppContext";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import { useFetch } from "src/lib/hooks/useFetch";
import { Input } from "src/pages/signup";
import { useAxios } from "src/utills/axios";
import { PostingCard } from "..";

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
  console.log(id);
  const instance = useAxios();

  useEffect(() => {
    if (!data?.result._id) {
      return;
    }
    setName((prev) => data?.result?.name);
    setCost((prev) => data?.result?.cost);
    setDescription((prev) => data?.result?.description);
    setLocation((prev) => data?.result?.location.name);
    setAdress((prev) => data?.result?.address);
    setBHKConfig((prev) => data?.result?.BHKconfig);
    setSize((prev) => data?.result?.size);
    setArea((prev) => data?.result?.area.name);
  }, [data]);

  console.log(data);
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
          <div className="space-y-4">
            <Input placeholder="name" value={name} setValue={setName} />
            <Input placeholder="price" value={cost} setValue={setCost} />
            <Input
              placeholder="BHK Config ie. 4"
              value={BHKconfig}
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
      </div>
    </>
  );
};

export default Edit;

Edit.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout Navbar={AgentNavbar}>{page}</DashBoardLayout>;
};
